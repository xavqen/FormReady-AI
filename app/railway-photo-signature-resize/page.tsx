import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { AdmitCardPrep } from "@/components/tools/admit-card-prep";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize Railway exam photo and signature?", a: "Yes. Use the SSC / Railway style profile and generate photo/signature files in JPG format." },
  { q: "Can I add an ID scan?", a: "Yes. Upload an optional ID scan image and it will be compressed as a separate JPG." },
  { q: "Does this replace official instructions?", a: "No. Use it as a file fixer and compare final files with the latest official upload rules." }
];

export const metadata = buildMetadata("Railway Exam Photo Signature Resize", "Resize Railway recruitment photo and signature online with target KB and clean JPG download.", "/railway-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Railway Exam Photo & Signature Resize" description="Create upload-ready photo, signature and optional ID scan files for railway recruitment forms." ctaHref="/railway-photo-signature-resize" ctaLabel="Prepare railway files" /><AdmitCardPrep /><div className="container-page"><AdSlot label="Ad slot before railway guide" /></div><SeoSection title="Railway recruitment upload file fixer"><p>Railway recruitment portals can reject photo or signature uploads when the KB size is too high, the image is unclear or the signature has extra white space. This page helps prepare a cleaner exam upload pack.</p></SeoSection><FAQ items={faqs} /></>;
}
