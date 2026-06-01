import { PageHero } from "@/components/page-hero";
import { RequirementsTable } from "@/components/requirements-table";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Online Form File Size Requirements", "Common photo, signature and PDF size presets for scholarship, exam, PAN, passport, admission and job forms.", "/form-requirements");

export default function Page() {
  return <><PageHero title="Online Form File Size Requirements" description="Quick reference for common photo, signature and PDF upload limits, with direct links to the right fixer tools." /><RequirementsTable /><SeoSection title="Use official instructions first"><p>Every portal can change its file rules. Use this library as a fast starting point, then compare with the exact notice shown on the official form page.</p></SeoSection></>;
}
