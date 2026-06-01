import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { AdmitCardPrep } from "@/components/tools/admit-card-prep";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I prepare police recruitment photo and signature?", a: "Yes. Use this page to prepare photo, signature and optional ID scan in one pack." },
  { q: "Can I change KB limits?", a: "Yes. Enter the size limit from your state police recruitment portal." },
  { q: "Can I download all files as ZIP?", a: "Yes. After generating files, download the complete ZIP pack." }
];

export const metadata = buildMetadata("Police Recruitment Photo Signature Resize", "Resize police recruitment photo, signature and ID scan files for online application forms.", "/police-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Police Recruitment Photo & Signature Resize" description="Prepare photo, signature and optional ID scan for police recruitment application forms." ctaHref="/police-photo-signature-resize" ctaLabel="Prepare police form files" /><AdmitCardPrep /><div className="container-page"><AdSlot label="Ad slot before police recruitment guide" /></div><SeoSection title="Police recruitment upload helper"><p>State police recruitment forms often require photo, signature and document scans with strict file size rules. Use this tool to generate cleaner upload files, then check official limits before final submission.</p></SeoSection><FAQ items={faqs} /></>;
}
