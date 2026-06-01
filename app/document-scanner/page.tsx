import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { DocumentScanner } from "@/components/tools/document-scanner";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I scan documents without an app?", a: "Yes. Upload phone camera photos and FormReady AI creates a clean PDF inside your browser." },
  { q: "Which mode is best for marksheets?", a: "High contrast works best for most marksheets, certificates and ID proofs photographed on a phone." },
  { q: "Can I compress the scanned PDF after this?", a: "Yes. Download the PDF, then open PDF Compress and select the target size required by your form." }
];

export const metadata = buildMetadata("Document Scanner to PDF Online", "Convert mobile document photos to clean A4 PDF for admission, scholarship, exam and job forms.", "/document-scanner");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Document Scanner to PDF for Online Forms" description="Turn marksheet, certificate and ID proof photos into a clean A4 PDF without installing an app." ctaHref="/document-scanner" /><DocumentScanner /><div className="container-page"><AdSlot label="Ad slot below scanner" /></div><SeoSection title="Scan documents for scholarship and admission forms"><p>Many users need a quick PDF from mobile photos while filling school, college, scholarship or job forms. This scanner improves readability, places pages on A4 and exports a clean PDF.</p><p>Use high contrast for text-heavy pages, grayscale for lighter output, and black-white when you need the smallest possible scan before PDF compression.</p></SeoSection><FAQ items={faqs} /></>;
}
