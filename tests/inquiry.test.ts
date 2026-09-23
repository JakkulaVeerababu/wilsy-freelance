import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import {
  createInquiryHandler,
  type InquiryDependencies,
} from "../src/lib/inquiry-handler";
import { inquirySchema, budgetOptions } from "../src/lib/inquiry-schema";

const valid = {
  name: "Alex Test",
  email: "alex@example.com",
  company: "Example",
  phone: "",
  service: "custom-website",
  description: "A responsive website for our independent design studio.",
  features: ["Content management"],
  website: "",
  references: "",
  budget: budgetOptions[0],
  timeline: "Flexible",
  consent: true,
  requestId: randomUUID(),
  startedAt: Date.now() - 10000,
  websiteConfirm: "",
};
const defaults: InquiryDependencies = {
  origin: "https://wilsy.example",
  salt: "test-salt-with-at-least-thirty-two-characters",
  ready: true,
  production: true,
  vercel: true,
  persist: async () => ({ reference: "WLS-test" }),
};
const req = (payload: unknown, origin = "https://wilsy.example") =>
  new Request("https://wilsy.example/api/inquiries", {
    method: "POST",
    headers: {
      origin,
      "Content-Type": "application/json",
      "x-vercel-forwarded-for": "192.0.2.1",
    },
    body: JSON.stringify(payload),
  });

test("rejects cross-origin requests before persistence", async () => {
  let called = false;
  const handler = createInquiryHandler({
    ...defaults,
    persist: async () => {
      called = true;
      return {};
    },
  });
  assert.equal(
    (await handler(req(valid, "https://other.example"))).status,
    403,
  );
  assert.equal(called, false);
});
test("validates consent, email, service and safe reference URLs", () => {
  assert.equal(inquirySchema.safeParse(valid).success, true);
  for (const data of [
    { consent: false },
    { email: "not-email" },
    { service: "fake-service" },
    { references: "javascript:alert(1)" },
    { website: "ftp://example.com" },
    { description: "Too short" },
  ])
    assert.equal(inquirySchema.safeParse({ ...valid, ...data }).success, false);
});
test("blocks honeypots and too-fast submissions", async () => {
  const handler = createInquiryHandler(defaults);
  assert.equal(
    (await handler(req({ ...valid, websiteConfirm: "spam" }))).status,
    400,
  );
  assert.equal(
    (await handler(req({ ...valid, startedAt: Date.now() }))).status,
    400,
  );
});
test("does not claim success without configured storage or confirmation", async () => {
  assert.equal(
    (await createInquiryHandler({ ...defaults, ready: false })(req(valid)))
      .status,
    503,
  );
  assert.equal(
    (
      await createInquiryHandler({ ...defaults, persist: async () => ({}) })(
        req(valid),
      )
    ).status,
    503,
  );
});
test("returns a reference only after persistence and never sends raw IP to storage", async () => {
  let saved = false;
  const handler = createInquiryHandler({
    ...defaults,
    persist: async (input) => {
      assert.match(input.ipKey, /^ip:[a-f0-9]{64}$/);
      assert.match(input.emailKey, /^email:[a-f0-9]{64}$/);
      assert.ok(!JSON.stringify(input).includes("192.0.2.1"));
      assert.equal(input.payload.email, valid.email);
      saved = true;
      return { reference: "WLS-confirmed" };
    },
  });
  const result = await handler(req(valid));
  assert.equal(saved, true);
  assert.equal(result.status, 201);
  assert.deepEqual(await result.json(), { reference: "WLS-confirmed" });
});
test("translates persistent rate limits and failures into honest error states", async () => {
  const limited = await createInquiryHandler({
    ...defaults,
    persist: async () => ({ error: "rate_limit" }),
  })(req(valid));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "3600");
  const broken = await createInquiryHandler({
    ...defaults,
    persist: async () => {
      throw Error("network");
    },
  })(req(valid));
  assert.equal(broken.status, 503);
});
test("rejects oversized bodies even without Content-Length", async () => {
  const result = await createInquiryHandler(defaults)(
    req({ ...valid, description: "x".repeat(17000) }),
  );
  assert.equal(result.status, 413);
});
