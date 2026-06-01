import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageResizer } from "@/components/tools/image-resizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize JEE photo online?", a: "Yes. Upload the image, set the required dimensions and target KB, then download the optimized JPG." },
  { q: "Can I crop my photo for JEE form?", a: "Yes. Use zoom and move controls to adjust the crop before download." },
  { q: "Is the image processed privately?", a: "Yes. The image is processed inside your browser." }
];

export const metadata = buildMetadata("JEE Photo Resize Online", "Resize JEE Main application photo online by width, height and target KB for form upload.", "/jee-photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="JEE Photo Resize Online" description="Crop, resize and compress JEE application photo with exact width, height and KB controls." ctaHref="/jee-photo-resize" ctaLabel="Resize JEE photo" /><ImageResizer title="JEE Photo Resize Tool" defaultWidth={600} defaultHeight={800} defaultKb={200} /><div className="container-page"><AdSlot label="Ad slot before JEE guide" /></div><SeoSection title="JEE form photo resize helper"><p>JEE application photo requirements can change by year and portal. Use the custom width, height and target KB fields to match the current official instruction exactly.</p></SeoSection><FAQ items={faqs} /></>;
}
