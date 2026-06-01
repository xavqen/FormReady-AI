import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Passport Photo Size India Guide", "Common passport photo size guidance for Indian users and tools to resize or make photo sheets.", "/guides/passport-photo-size-india");

export default function Page() {
  return (
    <>
      <PageHero title="Passport Photo Size India Guide" description="Understand common passport-style photo sizes and create resize or print-ready photo files." ctaHref="/passport-photo-resize" ctaLabel="Resize passport photo" />
      <SeoSection title="Common passport-style photo workflow">
        <p>Most users need two different outputs: an online upload photo and a printable sheet. For online forms, resize the image by pixels and KB. For printing, use millimeters and place multiple copies on A4 or 4×6 paper.</p>
        <p>Start with a clear front-facing photo, use a plain background, crop the face carefully, then download JPG for upload or PDF for printing.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/passport-photo-resize">Resize online photo</Link></Button><Button asChild variant="secondary"><Link href="/passport-photo-sheet">Make photo sheet</Link></Button></div>
      </SeoSection>
    </>
  );
}
