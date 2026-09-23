import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";

test("Postgres migration protects records, persists submissions, deduplicates retries, and rate limits", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      "create role anon; create role authenticated; create role service_role bypassrls;",
    );
    await db.exec(
      readFileSync(
        "supabase/migrations/20260922042702_create_inquiries.sql",
        "utf8",
      ),
    );
    const payload = {
      name: "Database Test",
      email: "db@example.com",
      company: "",
      phone: "",
      service: "custom-website",
      description: "This is a local disposable database integration test.",
      features: ["Content management"],
      website: "",
      references: "",
      budget: "Unsure",
      timeline: "Flexible",
      consent: true,
    };
    const submit = async (
      id: string,
      hash = "a".repeat(64),
      ip = "b".repeat(64),
      email = "c".repeat(64),
    ) =>
      db.query<{ id: string }>(
        "select public.submit_inquiry($1::jsonb,$2::uuid,$3,$4,$5) as id",
        [JSON.stringify(payload), id, hash, `ip:${ip}`, `email:${email}`],
      );
    await db.exec("set role service_role");
    const id = randomUUID();
    const first = await submit(id);
    assert.match(first.rows[0].id, /^[0-9a-f-]{36}$/);
    assert.deepEqual((await submit(id)).rows, first.rows);
    assert.equal(
      (
        await db.query<{ count: number }>(
          "select count(*)::int as count from public.inquiries",
        )
      ).rows[0].count,
      1,
    );
    await assert.rejects(submit(id, "d".repeat(64)), /idempotency_conflict/);
    await submit(randomUUID());
    await submit(randomUUID());
    await assert.rejects(submit(randomUUID()), /rate_limit_exceeded/);
    assert.equal(
      (
        await db.query<{ count: number }>(
          "select count(*)::int as count from public.inquiries",
        )
      ).rows[0].count,
      3,
    );
    // Separate identities can still submit, and the per-IP ceiling also applies.
    for (let i = 1; i <= 5; i++)
      await submit(
        randomUUID(),
        "a".repeat(64),
        "e".repeat(64),
        i.toString(16).repeat(64),
      );
    await assert.rejects(
      submit(randomUUID(), "a".repeat(64), "e".repeat(64), "f".repeat(64)),
      /rate_limit_exceeded/,
    );
    await db.exec(
      "update public.inquiry_rate_limits set window_start = now() - interval '2 hours'",
    );
    await submit(randomUUID());
    await db.exec("reset role");
    for (const role of ["anon", "authenticated"]) {
      await db.exec(`set role ${role}`);
      await assert.rejects(
        db.query("select * from public.inquiries"),
        /permission denied/,
      );
      await assert.rejects(
        db.query("update public.inquiries set name = 'changed'"),
        /permission denied/,
      );
      await assert.rejects(
        db.query("delete from public.inquiries"),
        /permission denied/,
      );
      await assert.rejects(
        db.query("insert into public.inquiries(name) values ('test')"),
        /permission denied/,
      );
      await assert.rejects(submit(randomUUID()), /permission denied/);
      await assert.rejects(
        db.query("select * from public.inquiry_rate_limits"),
        /permission denied/,
      );
      await db.exec("reset role");
    }
    const rls = await db.query<{ relrowsecurity: boolean }>(
      "select relrowsecurity from pg_class where relname in ('inquiries','inquiry_rate_limits')",
    );
    assert.ok(rls.rows.every((row) => row.relrowsecurity));
  } finally {
    await db.close();
  }
});
