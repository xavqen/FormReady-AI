import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { FormUploadChecklist } from "@/components/tools/form-upload-checklist";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What should I check before submitting an online form?", a: "Check photo size, signature crop, PDF size, file format, file name and whether every final file opens correctly." },
  { q: "Can I download the checklist?", a: "Yes. Choose your form type and download a text checklist for offline use." },
  { q: "Does this page fix files directly?", a: "It gives direct links to the matching FormReady AI tools for photo, signature and PDF fixing." }
];

export const metadata = buildMetadata("Online Form Upload Checklist", "Checklist for scholarship, exam, admission and job application file uploads with direct photo, signature and PDF tools.", "/form-upload-checklist");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Online Form Upload Checklist" description="Avoid rejected uploads by checking photo, signature, PDF, file name and format before final submit." ctaHref="/form-upload-checklist" ctaLabel="Create checklist" /><FormUploadChecklist /><div className="container-page"><AdSlot label="Ad slot before checklist guide" /></div><SeoSection title="Pre-submit checklist for online forms"><p>Most upload errors happen at the final step. A short checklist helps users confirm file size, format, readability and naming before they click submit on scholarship, exam, admission or job portals.</p></SeoSection><FAQ items={faqs} /></>;
}
