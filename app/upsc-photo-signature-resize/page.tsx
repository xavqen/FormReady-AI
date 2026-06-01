import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PhotoSignaturePack } from "@/components/tools/photo-signature-pack";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize UPSC photo and signature together?", a: "Yes. Upload both files, choose a close preset, adjust custom KB and download a ZIP pack." },
  { q: "Can I use custom requirements?", a: "Yes. Use the photo resize and signature settings to match the active official instructions." },
  { q: "Will files be stored online?", a: "No. The main processing runs in your browser." }
];

export const metadata = buildMetadata("UPSC Photo Signature Resize", "Prepare UPSC-style photo and signature upload files with target KB and ZIP download.", "/upsc-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="UPSC Photo & Signature Resize" description="Create clean photo and signature files for UPSC and similar exam application forms." ctaHref="/upsc-photo-signature-resize" ctaLabel="Resize UPSC files" /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before UPSC guide" /></div><SeoSection title="UPSC photo signature upload helper"><p>UPSC and similar portals may reject files for wrong dimensions, wrong KB, extra signature whitespace or unsupported format. Generate a clean JPG pack, then compare with the latest official instructions.</p></SeoSection><FAQ items={faqs} /></>;
}
