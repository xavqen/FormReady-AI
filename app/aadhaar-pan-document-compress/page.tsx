import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I compress ID document PDFs?", a: "Yes. Upload the PDF and choose a target size. Review the final file before submitting it anywhere." },
  { q: "Is this safe for personal documents?", a: "The processing happens in the browser, so the file is not intentionally uploaded to a server by this app." },
  { q: "What format should I upload?", a: "Most portals accept PDF, JPG or PNG. Check the exact rule on the portal and use the matching FormReady AI tool." }
];

export const metadata = buildMetadata("Aadhaar PAN Document Compress", "Compress Aadhaar, PAN and ID document PDFs privately for online form upload limits.", "/aadhaar-pan-document-compress");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Compress Aadhaar, PAN & ID Document PDFs" description="Prepare ID document PDFs for online upload limits with browser-side compression and clean downloads." ctaHref="/aadhaar-pan-document-compress" ctaLabel="Upload PDF" /><PdfTool mode="compress" /><div className="container-page"><AdSlot label="Ad slot before ID document FAQ" /></div><SeoSection title="Private ID document compression"><p>For sensitive documents, browser-side tools are better because files do not need server storage. After compression, open the final PDF and confirm that the name, number, photo and document edges are readable.</p></SeoSection><FAQ items={faqs} /></>;
}
