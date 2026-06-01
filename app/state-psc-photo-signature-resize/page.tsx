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

export const metadata = buildMetadata("State PSC Photo & Signature Resize", "Prepare state PSC exam photo and signature files for online application forms.", "/state-psc-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="State PSC photo and signature files" description="Create photo and signature files for BPSC, UPPSC, MPPSC, RPSC, JPSC and similar state exam portals." /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before State PSC Photo & Signature Resize guide" /></div><SeoSection title="State PSC Photo & Signature Resize helper"><p>State PSC portals can use different size limits by recruitment. Use the pack generator, then adjust the KB targets using the exact active notification.</p></SeoSection><FAQ items={faqs} /></>;
}
