import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfOrganizer } from "@/components/tools/pdf-organizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I remove one page from a PDF?", a: "Yes. Upload the PDF, turn off the page you do not want and export the organized PDF." },
  { q: "Can I reorder PDF pages?", a: "Yes. Use the up and down buttons to change page order before downloading." },
  { q: "Is the PDF uploaded anywhere?", a: "No. Page organizing runs in your browser using client-side PDF processing." }
];

export const metadata = buildMetadata("PDF Page Organizer", "Remove, reorder and export selected pages from PDFs for online form uploads.", "/pdf-organize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="PDF Page Organizer" description="Delete extra pages, reorder pages and export a clean PDF for admission, scholarship and document uploads." /><PdfOrganizer /><div className="container-page"><AdSlot label="Ad slot before PDF guide" /></div><SeoSection title="Clean PDF documents before uploading"><p>Online forms often reject PDFs with extra pages or wrong document order. Use PDF Organizer to keep only the required pages and arrange them correctly before final compression or upload.</p></SeoSection><FAQ items={faqs} /></>;
}
