import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("How to Make Passport Photo Sheet", "Create passport photo sheets on A4 or 4x6 paper from one image and download as PDF or JPG.", "/guides/how-to-make-passport-photo-sheet");

export default function Page() {
  return (
    <>
      <PageHero title="How to Make Passport Photo Sheet" description="Generate multiple passport-size photos on one printable page without manual editing." ctaHref="/passport-photo-sheet" ctaLabel="Create sheet" />
      <SeoSection title="Photo sheet steps">
        <p>Upload one clear photo, choose the required photo size in millimeters, select A4 or 4×6 paper, choose copies and generate the sheet. Download PDF for printing or JPG for sharing with a shop.</p>
        <p>For official documents, always confirm the exact size and background rules before printing.</p>
        <div className="mt-6"><Button asChild><Link href="/passport-photo-sheet">Open photo sheet maker</Link></Button></div>
      </SeoSection>
    </>
  );
}
