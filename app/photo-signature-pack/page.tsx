import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PhotoSignaturePack } from "@/components/tools/photo-signature-pack";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize photo and signature together?", a: "Yes. Upload both files, choose the form preset and create a downloadable ZIP pack." },
  { q: "Does this upload my photo to a server?", a: "No. The photo and signature are processed inside your browser." },
  { q: "Can I download only one file?", a: "Yes. Each output has its own download button, and ZIP download appears when both files are generated." }
];

export const metadata = buildMetadata("Photo and Signature Resize Pack", "Resize photo and signature together for exam, scholarship, PAN, passport and job application forms.", "/photo-signature-pack");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Photo + Signature Resize Pack" description="Upload your photo and signature once, then download form-ready JPG files separately or as a ZIP pack." /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before guide" /></div><SeoSection title="Best for exam and scholarship form uploads"><p>Many portals ask for both a photo and signature with different KB limits. This pack generator saves time by creating both files in one workflow, while keeping the original files private on your device.</p></SeoSection><FAQ items={faqs} /></>;
}
