import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageResizer } from "@/components/tools/image-resizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize CUET photo online?", a: "Yes. Upload your photo, enter the official CUET dimensions and KB limit, then download the final JPG." },
  { q: "Can this also fix signature size?", a: "Use the Signature Resize or Photo + Signature Pack tool for signature files." },
  { q: "Should I follow this preset or the latest notice?", a: "Always follow the latest official portal instructions if they mention different limits." }
];

export const metadata = buildMetadata("CUET Photo Resize", "Resize and compress CUET application photo with crop, white background and target KB controls.", "/cuet-photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="CUET Photo Resize" description="Prepare CUET-style application photos with exact pixel, crop and KB controls." ctaHref="/cuet-photo-resize" ctaLabel="Resize CUET photo" /><ImageResizer title="CUET Photo Resize Tool" defaultWidth={600} defaultHeight={800} defaultKb={200} /><div className="container-page"><AdSlot label="Ad slot before CUET guide" /></div><SeoSection title="CUET application photo helper"><p>Use this page for CUET or similar entrance exam photos. Keep the face centered, use a clear background, export as JPG, and verify the final file with the checker before uploading.</p></SeoSection><FAQ items={faqs} /></>;
}
