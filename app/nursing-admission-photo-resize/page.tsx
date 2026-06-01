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

export const metadata = buildMetadata("Nursing Admission Photo Resize", "Resize nursing admission photos and signatures for college or entrance forms.", "/nursing-admission-photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Nursing admission photo and signature" description="Prepare photo and signature files for nursing admission, paramedical entrance and college application portals." /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before Nursing Admission Photo Resize guide" /></div><SeoSection title="Nursing Admission Photo Resize helper"><p>Nursing and paramedical admission portals commonly ask for small JPG photos and signatures. Use this page to create form-ready files and avoid upload rejection.</p></SeoSection><FAQ items={faqs} /></>;
}
