import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PhotoSignaturePack } from "@/components/tools/photo-signature-pack";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize teacher exam photo and signature?", a: "Yes. Use this page for TET, CTET, B.Ed entrance and state teacher recruitment forms." },
  { q: "Which format should I download?", a: "JPG is usually safest unless the official portal asks for PNG or PDF." },
  { q: "What should I check before upload?", a: "Check file name, size, dimensions, format and signature readability." }
];

export const metadata = buildMetadata("Teacher Exam Photo Signature Resize", "Prepare photo and signature files for TET, CTET, B.Ed entrance and teacher recruitment forms.", "/teacher-exam-photo-signature-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Teacher Exam Photo & Signature Resize" description="Create upload-ready photo and signature files for TET, CTET, B.Ed entrance and teacher recruitment forms." ctaHref="/teacher-exam-photo-signature-resize" ctaLabel="Resize teacher exam files" /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before teacher exam guide" /></div><SeoSection title="Teacher exam upload helper"><p>Teacher exam and recruitment portals may reject files due to wrong KB, dimensions, extra whitespace or unsupported format. Generate the photo and signature together, then verify before upload.</p></SeoSection><FAQ items={faqs} /></>;
}
