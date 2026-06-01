import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { AdmitCardPrep } from "@/components/tools/admit-card-prep";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize SSC photo and signature online?", a: "Yes. Use the SSC / Railway style profile, upload photo and signature, then download JPG files." },
  { q: "What if the latest SSC notice uses different limits?", a: "Change the target KB manually before generating the final files." },
  { q: "Can I download a ZIP pack?", a: "Yes. After generating both files, use Download ZIP pack." }
];

export const metadata = buildMetadata("SSC Photo Signature Resize", "Resize SSC exam photo and signature online with target KB, white background and ZIP download.", "/ssc-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="SSC Photo & Signature Resize" description="Prepare SSC-style photo and signature files with clean crop, white background and target KB controls." ctaHref="/ssc-photo-signature-resize" ctaLabel="Resize SSC files" /><AdmitCardPrep /><div className="container-page"><AdSlot label="Ad slot before SSC guide" /></div><SeoSection title="SSC photo and signature upload helper"><p>Use this page when an SSC or similar recruitment form rejects photo or signature files due to KB limit, dimensions or format. The generated JPG files are browser-created and can be downloaded separately or as a ZIP.</p></SeoSection><FAQ items={faqs} /></>;
}
