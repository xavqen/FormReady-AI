import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { BulkPdfCompressor } from "@/components/tools/bulk-pdf-compressor";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I compress multiple PDFs at once?", a: "Yes. Upload multiple PDF files, set a target KB per file, and download the results separately or as a ZIP." },
  { q: "Will every PDF reach exactly 100KB or 200KB?", a: "Not always. The tool reduces scanned PDFs aggressively but avoids making pages unreadable." },
  { q: "Are PDFs uploaded to a server?", a: "No. Compression runs inside your browser where possible." }
];

export const metadata = buildMetadata("Bulk PDF Compress", "Compress multiple PDF files for online form upload limits and download a ZIP pack.", "/bulk-pdf-compress");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Bulk PDF Compress" description="Compress many scanned PDFs for scholarship, admission, certificate and job uploads in one workflow." ctaHref="/bulk-pdf-compress" ctaLabel="Compress PDFs" /><BulkPdfCompressor /><div className="container-page"><AdSlot label="Ad slot before bulk PDF guide" /></div><SeoSection title="Batch PDF compression for form users"><p>Use this when a portal asks for multiple PDFs such as marksheet, caste certificate, income certificate, ID proof and resume. Compress them together, then download a single ZIP for easy management.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/pdf-page-counter">Count PDF pages</Link></Button><Button asChild variant="secondary"><Link href="/pdf-organize">Organize PDF first</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
