import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I compress a resume PDF under 500KB?", a: "Yes. Upload the resume PDF, choose a target such as 500KB or 1MB, then download the compressed file." },
  { q: "Will resume text remain readable?", a: "The tool tries to balance readability and file size. Always open the final PDF once before uploading it to a job portal." },
  { q: "Is my resume uploaded to a server?", a: "No. This tool runs inside your browser for privacy." }
];

export const metadata = buildMetadata("Resume PDF Compress Online", "Compress resume PDF under 500KB or 1MB for job applications and career portals.", "/resume-pdf-compress");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Compress Resume PDF for Job Applications" description="Reduce resume PDF size for job portals, internships, campus hiring and online applications." ctaHref="/resume-pdf-compress" ctaLabel="Upload resume PDF" /><PdfTool mode="compress" /><div className="container-page"><AdSlot label="Ad slot before resume PDF guide" /></div><SeoSection title="Resume PDF upload size fixer"><p>Job portals often reject large resume PDFs. Compress your resume to common limits like 500KB or 1MB, then check that text, contact details and links are readable before submitting.</p></SeoSection><FAQ items={faqs} /></>;
}
