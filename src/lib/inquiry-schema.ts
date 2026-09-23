import { z } from "zod";
import { services } from "./content";

export const budgetOptions = [
  "Unsure — let’s discuss",
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000+",
] as const;
export const timelineOptions = [
  "Flexible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "More than 6 months",
] as const;
export const featureOptions = [
  "Content management",
  "Online payments",
  "User accounts",
  "Booking & scheduling",
  "Third-party integrations",
  "AI & automation",
  "Analytics",
  "Not sure yet",
] as const;
const optionalText = (max: number) => z.string().trim().max(max);
const webUrl = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => !value || (/^https?:\/\//i.test(value) && URL.canParse(value)),
    "Enter a complete URL starting with https://",
  );

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase()
    .max(254),
  company: optionalText(150),
  phone: optionalText(40),
  service: z
    .string()
    .refine(
      (value) => services.some((s) => s.id === value),
      "Choose a project type.",
    ),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000),
  features: z.array(z.enum(featureOptions)).max(8),
  website: webUrl,
  references: z
    .string()
    .trim()
    .max(2000)
    .refine(
      (value) =>
        !value ||
        value
          .split(/[\n,]+/)
          .filter(Boolean)
          .every(
            (url) =>
              /^https?:\/\//i.test(url.trim()) && URL.canParse(url.trim()),
          ),
      "Use complete https:// URLs, one per line.",
    ),
  budget: z.enum(budgetOptions),
  timeline: z.enum(timelineOptions),
  consent: z.literal(true, {
    error: "Please agree to the privacy notice before continuing.",
  }),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export const submissionSchema = inquirySchema.extend({
  requestId: z.uuid(),
  startedAt: z.number().int().positive(),
  websiteConfirm: z.string().max(0),
});

export const stepSchemas = [
  inquirySchema.pick({ name: true, email: true, company: true, phone: true }),
  inquirySchema.pick({
    service: true,
    description: true,
    features: true,
    website: true,
    references: true,
  }),
  inquirySchema.pick({ budget: true, timeline: true }),
];
