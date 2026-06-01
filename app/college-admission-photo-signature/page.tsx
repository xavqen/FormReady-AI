import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PhotoSignaturePack } from "@/components/tools/photo-signature-pack";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I prepare admission photo and signature together?", a: "Yes. Upload both files, choose the closest preset, adjust signature size and download the output files." },
  { q: "Can I use this for school forms too?", a: "Yes. It works for school, college, scholarship and admission portals when their size limits are similar." },
  { q: "Do I need to create an account?", a: "No. The tool works directly in the browser." }
];

export const metadata = buildMetadata("College Admission Photo Signature Resize", "Resize photo and signature together for college admission, school registration and student forms.", "/college-admission-photo-signature");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="College Admission Photo & Signature Resize" description="Create upload-ready photo and signature files for school, college and admission forms in one workflow." ctaHref="/college-admission-photo-signature" ctaLabel="Create admission pack" /><PhotoSignaturePack /><div className="container-page"><AdSlot label="Ad slot before admission pack guide" /></div><SeoSection title="Admission form photo and signature pack"><p>Admission portals often ask for a student photo, signature and documents with separate size limits. This page helps generate the photo and signature together, then users can compress documents using the PDF tools.</p></SeoSection><FAQ items={faqs} /></>;
}
