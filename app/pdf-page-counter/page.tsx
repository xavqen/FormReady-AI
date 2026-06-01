import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfPageCounter } from "@/components/tools/pdf-page-counter";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I count PDF pages online safely?", a: "Yes. This tool reads the PDF inside your browser and shows page count without server upload." },
  { q: "Why does page count matter for online forms?", a: "Some portals allow only a few pages or a small file size. Knowing page count helps decide whether to compress, split or upload only required pages." }
];

export const metadata = buildMetadata("PDF Page Counter", "Count PDF pages and check PDF file size before uploading resumes, certificates and documents to online forms.", "/pdf-page-counter");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="PDF Page Counter & Size Checker" description="Check PDF page count, total size and size per page before upload. Works in your browser." /><PdfPageCounter /><SeoSection title="PDF page count for form uploads"><p>Large PDFs are usually caused by high-resolution scans or too many pages. Check page count first, then compress or split only the pages required by the form portal.</p></SeoSection><FAQ items={faqs} /></>;
}
