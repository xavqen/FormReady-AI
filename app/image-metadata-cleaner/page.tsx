import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageMetadataCleaner } from "@/components/tools/image-metadata-cleaner";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Does this remove GPS location from photos?", a: "Yes. The image is redrawn on a browser canvas, which removes common EXIF, GPS and camera metadata from the exported file." },
  { q: "Are images uploaded to a server?", a: "No. The metadata cleaning process runs in your browser." },
  { q: "Which output format should I use for forms?", a: "JPG is usually the safest choice for online forms because it is widely accepted and compresses well." }
];

export const metadata = buildMetadata("Image Metadata Cleaner", "Remove EXIF, GPS and camera metadata from JPG, PNG and WebP images before uploading to forms.", "/image-metadata-cleaner");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Remove Image Metadata Before Upload" description="Clean EXIF, GPS and camera details from photos while keeping files form-ready and private." /><ImageMetadataCleaner /><div className="container-page"><AdSlot label="Ad slot before metadata guide" /></div><SeoSection title="Why remove image metadata?"><p>Phone photos can contain hidden metadata such as camera model, capture time and location. Redrawing the image creates a clean copy that is safer to upload on public, exam, job or admission portals.</p></SeoSection><FAQ items={faqs} /></>;
}
