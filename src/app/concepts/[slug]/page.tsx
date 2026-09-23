import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ConceptShell,
  FormaConcept,
  OrbitConcept,
} from "@/components/concept-demo";
export function generateStaticParams() {
  return [{ slug: "forma" }, { slug: "orbit" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug === "forma" ? "Forma" : "Orbit"} — Interactive concept`,
    robots: { index: false, follow: false },
  };
}
export default async function Concept({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "forma" && slug !== "orbit") notFound();
  return (
    <ConceptShell name={slug === "forma" ? "Forma" : "Orbit"}>
      {slug === "forma" ? <FormaConcept /> : <OrbitConcept />}
    </ConceptShell>
  );
}
