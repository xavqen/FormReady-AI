import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { AdmitCardPrep } from "@/components/tools/admit-card-prep";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I prepare photo and signature together for exam forms?", a: "Yes. Upload candidate photo and signature, choose an exam profile, then download individual files or one ZIP pack." },
  { q: "Does this work for SSC, Railway and state exam forms?", a: "It includes common exam-style presets, but always compare with the latest official notification before final submission." },
  { q: "Are my files uploaded to a server?", a: "No. Image processing runs inside your browser." }
];

export const metadata = buildMetadata("Admit Card Photo Signature Resize", "Prepare photo, signature and ID scan files for admit card and government exam form uploads.", "/admit-card-photo-signature");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Admit Card Photo & Signature Resize" description="Prepare photo, signature and optional ID scan for exam forms, admit-card portals and recruitment uploads." ctaHref="/admit-card-photo-signature" ctaLabel="Prepare exam files" /><AdmitCardPrep /><div className="container-page"><AdSlot label="Ad slot before admit card guide" /></div><SeoSection title="Exam upload file pack for admit cards"><p>Exam portals commonly reject files because of wrong KB size, wrong dimensions, unclear signature crop or unsupported format. This tool creates clean JPG files with white background and compressed size so you can upload with fewer errors.</p></SeoSection><FAQ items={faqs} /></>;
}
