import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I compress certificates for admission forms?", a: "Yes. Upload the certificate PDF and compress it under common limits such as 200KB, 500KB or 1MB." },
  { q: "What if my certificate is an image?", a: "Use Image to PDF or Document Scanner first, then compress the final PDF if needed." },
  { q: "Can all certificates reach 100KB?", a: "Not always. Very detailed scans may need a higher limit to stay readable." }
];

export const metadata = buildMetadata("Certificate PDF Compress", "Compress marksheet, certificate and scanned document PDFs for school, college and admission form uploads.", "/certificate-compress");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Compress Certificate PDF for Forms" description="Reduce marksheet, certificate and scanned document PDFs for admission, scholarship and verification portals." ctaHref="/certificate-compress" ctaLabel="Upload certificate PDF" /><PdfTool mode="compress" /><div className="container-page"><AdSlot label="Ad slot before certificate guide" /></div><SeoSection title="Certificate upload made easier"><p>Scanned certificates and marksheets often become too large after camera scanning. Compress the PDF in the browser, check readability, then upload the smaller document to your portal.</p></SeoSection><FAQ items={faqs} /></>;
}
