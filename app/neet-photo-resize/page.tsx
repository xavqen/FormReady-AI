import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageResizer } from "@/components/tools/image-resizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize a NEET form photo online?", a: "Yes. Upload the photo, use the preset dimensions or enter the official dimensions and target KB from the form instructions." },
  { q: "Should I use JPG for NEET photo upload?", a: "JPG is usually the safest choice for small upload limits because it compresses well." },
  { q: "Can I make the background white?", a: "Yes. Select white background before export." }
];

export const metadata = buildMetadata("NEET Photo Resize Online", "Resize NEET application photo online by pixels and KB with white background and JPG download.", "/neet-photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="NEET Photo Resize Online" description="Resize and compress NEET application photo with pixel, KB and background controls." ctaHref="/neet-photo-resize" ctaLabel="Resize NEET photo" /><ImageResizer title="NEET Photo Resize Tool" defaultWidth={600} defaultHeight={800} defaultKb={200} /><div className="container-page"><AdSlot label="Ad slot before NEET guide" /></div><SeoSection title="NEET application photo size helper"><p>Use this tool to crop and compress a candidate photo for NEET-style online forms. Always confirm the current official form instructions, then enter those exact pixel and KB limits before downloading.</p></SeoSection><FAQ items={faqs} /></>;
}
