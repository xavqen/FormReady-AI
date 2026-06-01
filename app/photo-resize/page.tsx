import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageResizer } from "@/components/tools/image-resizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "How do I resize a photo to 50KB?", a: "Upload the image, set Target KB to 50, select JPG and click Apply & preview." },
  { q: "Can I change width and height?", a: "Yes. Enter exact pixel width and height from your form instructions." }
];

export const metadata = buildMetadata("Photo Resize Online", "Resize JPG, PNG and WebP photos by width, height and target KB for online forms.", "/photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Photo Resize Online for Forms" description="Crop, resize and compress photos to 20KB, 50KB, 100KB or custom dimensions." /><ImageResizer /><div className="container-page"><AdSlot label="Ad slot between tool and guide" /></div><SeoSection title="Photo resize for online application forms"><p>Use this tool when a portal rejects your photo because the size is too large, too small or the dimensions do not match. JPG export is recommended for most government and exam websites because it keeps file size low.</p></SeoSection><FAQ items={faqs} /></>;
}
