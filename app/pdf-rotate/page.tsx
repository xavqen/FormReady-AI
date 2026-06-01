import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfRotateTool } from "@/components/tools/pdf-rotate";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I rotate only one PDF page?", a: "Yes. Enter a page range such as 2 or 1-3,5 before processing." },
  { q: "Will the PDF be uploaded?", a: "No. Rotation is done in your browser using client-side PDF processing." },
  { q: "Can I rotate scanned documents?", a: "Yes. It works for scanned document PDFs and normal PDFs." }
];

export const metadata = buildMetadata("Rotate PDF Online", "Rotate PDF pages online for scanned documents, certificates and online form uploads.", "/pdf-rotate");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Rotate PDF Pages Online" description="Fix sideways scanned PDFs before uploading certificates, ID documents or admission files." /><PdfRotateTool /><div className="container-page"><AdSlot label="Ad slot before PDF rotate FAQ" /></div><SeoSection title="Fix sideways PDFs before upload"><p>Many phone-scanned PDFs are rejected because pages are sideways or upside down. Rotate all pages or selected pages, then download a corrected PDF.</p></SeoSection><FAQ items={faqs} /></>;
}
