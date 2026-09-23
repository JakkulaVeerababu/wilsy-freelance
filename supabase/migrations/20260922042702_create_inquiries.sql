-- All submissions go through the server. Browser roles have no access.
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  payload_hash text not null check (length(payload_hash) = 64),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  company text not null default '' check (char_length(company) <= 150),
  phone text not null default '' check (char_length(phone) <= 40),
  service text not null check (service in ('custom-website','business','ecommerce','web-app','ai','redesign','support')),
  description text not null check (char_length(description) between 20 and 5000),
  features text[] not null default '{}' check (cardinality(features) <= 8),
  website text not null default '' check (char_length(website) <= 500),
  reference_urls text not null default '' check (char_length(reference_urls) <= 2000),
  budget text not null check (char_length(budget) <= 100),
  timeline text not null check (char_length(timeline) <= 100),
  consent boolean not null check (consent = true),
  consent_version text not null default '2026-09-22',
  status text not null default 'new' check (status in ('new','reviewing','contacted','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index inquiries_status_created_at_idx on public.inquiries(status, created_at desc);
alter table public.inquiries enable row level security;
revoke all on public.inquiries from public, anon, authenticated;
grant select, insert on public.inquiries to service_role;

create table public.inquiry_rate_limits (
  key text primary key check (char_length(key) <= 80),
  window_start timestamptz not null default now(),
  hits integer not null default 1 check (hits > 0)
);
create index inquiry_rate_limits_window_idx on public.inquiry_rate_limits(window_start);
alter table public.inquiry_rate_limits enable row level security;
revoke all on public.inquiry_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on public.inquiry_rate_limits to service_role;

create function public.set_inquiry_updated_at() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.set_inquiry_updated_at() from public, anon, authenticated;
create trigger inquiries_updated_at before update on public.inquiries
for each row execute function public.set_inquiry_updated_at();

-- Atomic, persistent rate limiting and idempotency across serverless instances.
-- SECURITY INVOKER preserves caller permissions. Only service_role can execute.
create function public.submit_inquiry(
  p_payload jsonb,
  p_request_id uuid,
  p_payload_hash text,
  p_ip_key text,
  p_email_key text
) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  v_existing public.inquiries%rowtype;
  v_id uuid;
  v_key text;
  v_hits integer;
  v_limit integer;
begin
  if char_length(p_payload_hash) <> 64 or p_ip_key !~ '^ip:[a-f0-9]{64}$' or p_email_key !~ '^email:[a-f0-9]{64}$' then
    raise exception 'invalid_submission';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_request_id::text, 0));
  select * into v_existing from public.inquiries where request_id = p_request_id;
  if found then
    if v_existing.payload_hash <> p_payload_hash then raise exception 'idempotency_conflict'; end if;
    return v_existing.id;
  end if;

  delete from public.inquiry_rate_limits where window_start < now() - interval '48 hours';
  foreach v_key in array array[p_ip_key, p_email_key] loop
    v_limit := case when v_key = p_ip_key then 5 else 3 end;
    insert into public.inquiry_rate_limits as limits(key, window_start, hits)
    values (v_key, now(), 1)
    on conflict(key) do update set
      hits = case when limits.window_start < now() - interval '1 hour' then 1 else limits.hits + 1 end,
      window_start = case when limits.window_start < now() - interval '1 hour' then now() else limits.window_start end
    returning hits into v_hits;
    if v_hits > v_limit then raise exception 'rate_limit_exceeded'; end if;
  end loop;

  insert into public.inquiries(request_id, payload_hash, name, email, company, phone, service, description, features, website, reference_urls, budget, timeline, consent)
  values (p_request_id, p_payload_hash, p_payload->>'name', p_payload->>'email', coalesce(p_payload->>'company',''), coalesce(p_payload->>'phone',''), p_payload->>'service', p_payload->>'description', array(select jsonb_array_elements_text(coalesce(p_payload->'features','[]'::jsonb))), coalesce(p_payload->>'website',''), coalesce(p_payload->>'references',''), p_payload->>'budget', p_payload->>'timeline', (p_payload->>'consent')::boolean)
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.submit_inquiry(jsonb,uuid,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_inquiry(jsonb,uuid,text,text,text) to service_role;
