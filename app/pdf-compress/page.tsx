import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I compress PDF under 100KB?", a: "Choose 100KB and process the file. The tool will try browser-side compression and show whether the target passed." },
  { q: "Will PDF quality reduce?", a: "Compression can reduce scan quality. The tool balances readability and file size." }
];
export const metadata = buildMetadata("PDF Compress Online", "Compress PDF files under 100KB, 200KB, 500KB or 1MB for online form upload.", "/pdf-compress");
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Compress PDF for Online Forms" description="Reduce PDF size for admission, scholarship, exam and document upload portals." /><PdfTool mode="compress" /><div className="container-page"><AdSlot label="Ad slot after PDF tool" /></div><SeoSection title="PDF compress under KB limits"><p>Online forms often ask for documents under 100KB, 200KB, 500KB or 1MB. This browser-side compressor is best for scanned PDFs and document images saved as PDFs.</p></SeoSection><FAQ items={faqs} /></>; }
