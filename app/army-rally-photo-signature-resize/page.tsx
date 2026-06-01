import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PhotoSignaturePack } from "@/components/tools/photo-signature-pack";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize photo and signature together?", a: "Yes. Upload both files, set target KB values and download a ZIP pack." },
  { q: "Can I use custom official requirements?", a: "Yes. Adjust the photo and signature KB values according to the active notification or portal instruction." },
  { q: "Will my files be stored online?", a: "No. The main image processing runs in your browser." }
];

export const metadata = buildMetadata("Army Rally Photo & Signature Resize", "Prepare army recruitment photo, signature and ID scan files for online upload.", "/army-rally-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Army rally upload files" description="Create photo, signature and optional ID scan files for army rally and defence recruitment forms." /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before Army Rally Photo & Signature Resize guide" /></div><SeoSection title="Army Rally Photo & Signature Resize helper"><p>Defence recruitment forms often need clear candidate photos, signatures and document scans. This page prepares browser-side JPG files that are easier to upload.</p></SeoSection><FAQ items={faqs} /></>;
}
