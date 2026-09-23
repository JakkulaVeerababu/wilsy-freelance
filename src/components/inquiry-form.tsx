"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
} from "lucide-react";
import { services, studio } from "@/lib/content";
import {
  budgetOptions,
  timelineOptions,
  featureOptions,
  stepSchemas,
  inquirySchema,
} from "@/lib/inquiry-schema";

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  description: string;
  features: string[];
  website: string;
  references: string;
  budget: string;
  timeline: string;
  consent: boolean;
  websiteConfirm: string;
};
const steps = ["You", "Your project", "The details", "Review"];

export function InquiryForm({
  initialService,
  submissionsAvailable,
}: {
  initialService: string;
  submissionsAvailable: boolean;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: initialService,
    description: "",
    features: [],
    website: "",
    references: "",
    budget: budgetOptions[0],
    timeline: "Flexible",
    consent: false,
    websiteConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);
  const requestId = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    else mounted.current = true;
  }, [step]);
  const update = (
    key: keyof FormValues,
    value: string | boolean | string[],
  ) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: "" }));
    setServerError("");
    if (!startedAt.current) startedAt.current = Date.now();
  };
  const showErrors = (issues: { path: PropertyKey[]; message: string }[]) => {
    const next: Record<string, string> = {};
    issues.forEach((issue) => {
      const key = String(issue.path[0]);
      if (!next[key]) next[key] = issue.message;
    });
    setErrors(next);
    document.getElementById(String(issues[0]?.path[0]))?.focus();
  };
  const nextStep = (event: FormEvent) => {
    event.preventDefault();
    const result = stepSchemas[step].safeParse(values);
    if (!result.success) {
      showErrors(result.error.issues);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      showErrors(parsed.error.issues);
      return;
    }
    if (!submissionsAvailable) {
      const body = reviewItems
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n\n");
      window.location.assign(
        `mailto:${studio.email}?subject=${encodeURIComponent(`Project inquiry — ${values.name}`)}&body=${encodeURIComponent(body)}`,
      );
      return;
    }
    setStatus("sending");
    setServerError("");
    if (!requestId.current) requestId.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          requestId: requestId.current,
          startedAt: startedAt.current,
          websiteConfirm: values.websiteConfirm,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || typeof result.reference !== "string")
        throw new Error(
          result.error ||
            "We couldn’t save your inquiry. Please try again or email us.",
        );
      setReference(result.reference);
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setServerError(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The connection timed out. Please retry; your request won’t be duplicated.",
      );
    }
  };
  const field = (
    key: keyof FormValues,
    label: string,
    options: {
      type?: string;
      placeholder?: string;
      optional?: boolean;
      autoComplete?: string;
    } = {},
  ) => (
    <div className="field">
      <label htmlFor={key}>
        {label}
        {options.optional && <small> (optional)</small>}
      </label>
      <input
        id={key}
        name={key}
        type={options.type || "text"}
        autoComplete={options.autoComplete}
        value={String(values[key])}
        placeholder={options.placeholder}
        maxLength={
          key === "email"
            ? 254
            : key === "website"
              ? 500
              : key === "phone"
                ? 40
                : 150
        }
        required={!options.optional}
        onChange={(e) => update(key, e.target.value)}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && (
        <span id={`${key}-error`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  );
  const reviewItems = [
    ["Name", values.name],
    ["Email", values.email],
    ["Company", values.company || "Not specified"],
    ["Phone / WhatsApp", values.phone || "Not specified"],
    [
      "Project type",
      services.find((s) => s.id === values.service)?.fullName || "",
    ],
    ["Your project", values.description],
    ["Features", values.features.join(", ") || "To be discussed"],
    ["Existing website", values.website || "Not specified"],
    ["References", values.references || "Not specified"],
    ["Budget (INR)", values.budget],
    ["Timeframe", values.timeline],
  ];

  if (status === "success")
    return (
      <div className="inquiry-form success-state" role="status">
        <span className="success-icon">
          <Check size={29} />
        </span>
        <h2>A great start.</h2>
        <p>
          Your project inquiry has been saved. We’ll review your brief and
          continue the conversation at <strong>{values.email}</strong>.
        </p>
        <div className="success-reference">Reference: {reference}</div>
        <Link className="button button-blue" href="/">
          Back to Wilsy <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  return (
    <form
      className="inquiry-form"
      onSubmit={step < 3 ? nextStep : submit}
      noValidate
      aria-label="Project inquiry"
      aria-busy={status === "sending"}
    >
      <div
        className="form-progress"
        aria-label={`Step ${step + 1} of 4: ${steps[step]}`}
      >
        {steps.map((name, i) => (
          <div
            key={name}
            className={i === step ? "active" : i < step ? "complete" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <span>
              0{i + 1} / {name}
            </span>
          </div>
        ))}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="websiteConfirm">Leave this field empty</label>
        <input
          id="websiteConfirm"
          name="websiteConfirm"
          tabIndex={-1}
          autoComplete="off"
          value={values.websiteConfirm}
          onChange={(e) => update("websiteConfirm", e.target.value)}
        />
      </div>
      <h2 ref={heading} tabIndex={-1} className="form-step-title">
        {
          [
            "First, a little about you.",
            "What are you imagining?",
            "Let’s set the scene.",
            "Looking good. One last check.",
          ][step]
        }
      </h2>
      <p className="form-step-description">
        {
          [
            "Every great project starts with a conversation.",
            "A rough idea is a perfectly good starting point.",
            "No commitments here. Just a starting point for our conversation.",
            "Review your brief before you send it our way.",
          ][step]
        }
      </p>
      {step === 0 && (
        <>
          <div className="field-grid">
            {field("name", "Your name", {
              placeholder: "Alex Taylor",
              autoComplete: "name",
            })}
            {field("email", "Email address", {
              type: "email",
              placeholder: "you@company.com",
              autoComplete: "email",
            })}
          </div>
          <div className="field-grid" style={{ marginTop: 20 }}>
            {field("company", "Company", {
              optional: true,
              placeholder: "Your company",
              autoComplete: "organization",
            })}
            {field("phone", "Phone / WhatsApp", {
              optional: true,
              type: "tel",
              placeholder: "+91 …",
              autoComplete: "tel",
            })}
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <div className="field">
            <label htmlFor="service">What can we help you build?</label>
            <select
              id="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="">Choose a project type</option>
              {services.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.fullName}
                </option>
              ))}
            </select>
            {errors.service && (
              <span id="service-error" className="field-error">
                {errors.service}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor="description">Tell us about your project</label>
            <textarea
              id="description"
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="The idea, the audience, the problem you want to solve…"
              maxLength={5000}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />
            {errors.description && (
              <span id="description-error" className="field-error">
                {errors.description}
              </span>
            )}
          </div>
          <fieldset className="choice-grid">
            <legend>
              Anything you’ll need?{" "}
              <span className="muted-text">(optional)</span>
            </legend>
            {featureOptions.map((feature) => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={values.features.includes(feature)}
                  onChange={(e) =>
                    update(
                      "features",
                      e.target.checked
                        ? [...values.features, feature]
                        : values.features.filter((f) => f !== feature),
                    )
                  }
                />
                {feature}
              </label>
            ))}
          </fieldset>
          {field("website", "Your current website", {
            optional: true,
            type: "url",
            placeholder: "https://yourwebsite.com",
            autoComplete: "url",
          })}
          <div className="field">
            <label htmlFor="references">
              Websites you love <small>(optional)</small>
            </label>
            <textarea
              id="references"
              style={{ minHeight: 80 }}
              value={values.references}
              onChange={(e) => update("references", e.target.value)}
              placeholder="https://example.com"
              maxLength={2000}
              aria-invalid={!!errors.references}
              aria-describedby={
                errors.references ? "references-error" : undefined
              }
            />
            <span className="form-hint">
              One complete website URL per line.
            </span>
            {errors.references && (
              <span id="references-error" className="field-error">
                {errors.references}
              </span>
            )}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="field">
            <label htmlFor="budget">Your budget range (INR)</label>
            <select
              id="budget"
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
            >
              {budgetOptions.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <span className="form-hint">
              This helps us shape an appropriate proposal. It isn’t a price or
              commitment.
            </span>
          </div>
          <div className="field">
            <label htmlFor="timeline">Preferred completion timeframe</label>
            <select
              id="timeline"
              value={values.timeline}
              onChange={(e) => update("timeline", e.target.value)}
            >
              {timelineOptions.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <span className="form-hint">
              We’ll agree on a realistic schedule once we understand the scope.
            </span>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <dl className="review-list">
            {reviewItems.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <label className="consent">
            <input
              id="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree that Wilsy may use these details to respond to my inquiry,
              as explained in the{" "}
              <Link href="/privacy" target="_blank">
                privacy notice
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="field-error" id="consent-error">
              {errors.consent}
            </p>
          )}
          {!submissionsAvailable && (
            <>
              <p className="form-hint" style={{ marginTop: 20 }}>
                Your reviewed brief will open in your email app, addressed to{" "}
                {studio.email}. You’ll send it from there.
              </p>
              <button
                type="button"
                className="text-link copy-brief"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      reviewItems
                        .map(([label, value]) => `${label}: ${value}`)
                        .join("\n\n"),
                    );
                    setCopied(true);
                  } catch {
                    setServerError(
                      "Clipboard access is unavailable. You can select and copy the review text above.",
                    );
                  }
                }}
              >
                {copied ? "Brief copied" : "Copy project brief"}
                <Check size={14} />
              </button>
              {copied && (
                <span role="status" className="sr-only">
                  Project brief copied to clipboard
                </span>
              )}
            </>
          )}
        </>
      )}
      {serverError && (
        <div className="form-error" role="alert">
          {serverError}{" "}
          <a
            href={`mailto:${studio.email}`}
            style={{ textDecoration: "underline" }}
          >
            Email Wilsy
          </a>
        </div>
      )}
      <div className="form-nav">
        {step > 0 ? (
          <button
            className="form-back"
            type="button"
            disabled={status === "sending"}
            onClick={() => {
              setStep((s) => s - 1);
              setErrors({});
              setServerError("");
              requestId.current = "";
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>
        ) : (
          <span>01 of 04</span>
        )}
        <button
          className="button button-blue"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              Sending <Loader2 size={16} className="animate-spin" />
            </>
          ) : step < 3 ? (
            <>
              {step === 2 ? "Review your brief" : "Continue"}
              <ArrowRight size={16} />
            </>
          ) : submissionsAvailable ? (
            <>
              Send your inquiry <ArrowUpRight size={16} />
            </>
          ) : (
            <>
              Email your project brief <Mail size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
