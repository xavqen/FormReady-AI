import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { BatchImageResizer } from "@/components/tools/batch-image-resizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize multiple photos together?", a: "Yes. Upload up to 20 images, choose one preset and download each optimized file." },
  { q: "Are batch photos uploaded to a server?", a: "No. The batch tool uses browser-side canvas processing on your own device." }
];

export const metadata = buildMetadata("Batch Photo Resize Online", "Resize multiple photos by pixels and KB for online forms in one browser-safe batch.", "/batch-photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Batch Photo Resize Online" description="Resize multiple photos for exam, scholarship, admission and job forms using the same dimensions and KB limit." /><BatchImageResizer /><SeoSection title="Batch photo resize for form centers"><p>This page is useful for cyber cafes, students and job seekers who need to resize many photos quickly with the same upload requirement.</p></SeoSection><FAQ items={faqs} /></>;
}
