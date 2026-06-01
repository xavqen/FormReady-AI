import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RequirementsTable } from "@/components/requirements-table";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Common Online Form Upload Sizes", "Common photo, signature and PDF upload size requirements for Indian online forms.", "/guides/common-form-upload-sizes");

export default function Page() {
  return <><PageHero title="Common Online Form Upload Sizes" description="Quick reference for common photo, signature and document upload limits." /><RequirementsTable /><SeoSection title="Always check official portal instructions"><p>These are common presets used by many form portals, but official requirements can change. Before final upload, compare your portal instructions with the preset and use custom width, height and KB fields when needed.</p><div className="mt-6"><Button asChild><Link href="/ai-file-checker">Check My File</Link></Button></div></SeoSection></>;
}
