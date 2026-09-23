# Wilsy — Digital studio

A custom Next.js website for Wilsy: editorial layouts, the original cobalt sculpture, responsive typography, studio concept case studies and interactive previews, services, a six-step process, configurable project estimates, and a four-step inquiry form.

## Current contact mode

**Email, as requested.** Contact links use `contact@wilsy.in`. Visitors complete a brief, review it, consent to sharing it, and open their email client with the brief prefilled. A copy-brief fallback is available. Opening the email client does not send an email, and the website does not claim delivery or store a copy. Long mailto drafts may be limited by the visitor's email application; use Copy project brief in that case.

No external account or API key is required to run in email mode. The optional Supabase implementation is included and tested locally, but is **not connected to a live Supabase project**.

## Run locally

Use Node.js 22 LTS or newer supported by Next.js, with npm. This build was checked on Node 26.7.0.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The font and all site images are hosted locally. No Google Fonts request is required during the build.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

The SQL integration test runs real PostgreSQL through an isolated in-memory PGlite instance. It does not access a cloud database or need Docker. Browser checks are performed separately against the local preview.

## Content and design

- `src/lib/content.ts`: studio email, optional founder/team/location, verified social links, services, concept projects, process, packages, pricing, and timeline copy.
- `src/lib/inquiry-schema.ts`: inquiry fields, selectable features, budget ranges (INR), and timeline preferences. Budget ranges describe the visitor's budget, not Wilsy prices.
- `src/app/globals.css`: shared design tokens, desktop/mobile layouts, typography, project previews, and reduced-motion rules.
- `src/app/studio-refinement.css`: pure-black services styling, three silver light trails, rounded capability cards, and editorial refinements.
- `src/components/capability-ribbon.tsx`: one continuous wave of capabilities, with reversible direction, pause controls, and offscreen/tab-visibility suspension. Reduced-motion users receive a static, horizontally scrollable row.
- `src/components/motion.tsx`: scroll-triggered section and word reveals, with accessible text and reduced-motion support.
- `src/components/`: reusable navigation, footer, motion wrapper, service list, process tabs, inquiry form, and concept previews.
- `docs/assets.md`: image provenance, generation prompt, and design references.

The case studies **Forma** and **Orbit** are clearly labeled self-initiated concepts. Their names and interface data are illustrative. They contain no fabricated testimonials, clients, launch results, or performance metrics. Replace or remove concept entries with approved projects before using the portfolio as evidence of client experience. Concept routes have `noindex` metadata and are excluded from the sitemap. When converting them into approved real projects, also update the metadata and robots rules.

Founder, team, location, WhatsApp, and social links stay empty until real details are supplied. No testimonials are displayed without verified content. Pricing is “Custom quote”; no delivery guarantees have been invented.

## Optional saved inquiries in Supabase

Keep `INQUIRY_MODE=email` for the currently selected behavior. To switch later:

1. Create or select the correct Supabase project.
2. Apply `supabase/migrations/20260922042702_create_inquiries.sql` through that project's SQL Editor or your reviewed migration workflow.
3. Copy `.env.example` to `.env.local`. Set `SITE_URL` to the exact local or deployment origin, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and a random `RATE_LIMIT_SALT` of at least 32 characters. Store these only on the server, never under `NEXT_PUBLIC_`.
4. Set `INQUIRY_MODE=supabase`. Restart the local server or redeploy.
5. Submit a test inquiry and verify the returned reference exists in the correct database. Run Supabase Security Advisor and review permissions in the actual hosted project before enabling production submissions.

Generate a salt locally:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The server validates fields and consent, restricts request origins, bounds JSON request size, checks a honeypot and completion time, and stores submissions with a unique reference only after PostgreSQL confirms success. Network retries use an idempotency key. A transaction applies persistent hourly limits (five per connection identifier, three per email identifier), shared across instances. Identifiers are HMAC-hashed; raw IP addresses are not stored. Expired rate-limit windows are cleaned during later submissions.

Database tables have RLS enabled and all privileges revoked from browser roles. Only the server role can invoke the submission function. No administrative dashboard or public record-reading API is implemented. Manage inquiries through authorized Supabase tooling. The application service role only receives the privileges required by its submission path. Updates through administrative tooling refresh `updated_at` via a trigger.

The trusted IP path uses Vercel's `x-vercel-forwarded-for` only when `VERCEL=1`. Other hosts use a conservative shared connection bucket plus per-email limits. Adapt to your host's trusted proxy model before enabling saved submissions elsewhere. These application checks are not a substitute for host-level traffic protection against volumetric attacks.

## Vercel deployment

1. Put this directory in your Git repository and import it into Vercel as a Next.js project.
2. Select a supported Node.js runtime (Node 22 LTS or newer supported by Vercel).
3. Build command: `npm run build`. Install command: `npm ci`. Leave output directory at the Next.js default.
4. Set `SITE_URL` to the verified canonical production origin and `INQUIRY_MODE=email`. Supabase secrets are unnecessary for email mode.
5. If saved inquiries are enabled later, add the private environment variables above. Use the exact preview origin for preview submissions, or leave previews in email mode.
6. Deploy, check mobile and desktop navigation, review the brief flow, and verify the mailto recipient. No email is sent automatically.

The site has not been deployed by this task. No external database has been created or modified.

## Before public launch

Confirm approved portfolio materials; legal business identity; actual hosting/database regions; a concrete inquiry retention policy if storage is enabled; and final privacy/terms text for the applicable jurisdiction. The current policy pages describe the implementation and explicitly flag the remaining operator review. Set the real canonical URL so sitemap and social metadata use the deployed domain. Open Graph title and description metadata are included; no social-preview image was requested or generated.

## Verification

`tests/inquiry.test.ts` covers server validation, origin restrictions, spam inputs, payload bounds, honest failures, confirmation-only success, and pseudonymous limiter inputs. `tests/database.test.ts` applies the actual migration to PostgreSQL, verifies insert and retry behavior, tests both rate limits, checks time-window reset, and asserts denied read/insert/update/delete/function access for anonymous and authenticated browser roles.

Live Supabase connectivity and actual mail delivery cannot be verified in email mode. The email client remains responsible for sending the visitor's reviewed message.
