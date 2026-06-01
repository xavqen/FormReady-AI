import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { PdfMetadataCleaner } from "@/components/tools/pdf-metadata-cleaner";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What metadata can a PDF contain?", a: "A PDF can contain title, author, creator, producer, keywords and date fields. Some files may also contain embedded objects." },
  { q: "Does this guarantee complete privacy?", a: "No. It resets common metadata fields and rebuilds the PDF, but forensic removal is not guaranteed." },
  { q: "Should I use this before uploading ID documents?", a: "It can reduce unnecessary document info, but only upload personal documents to official trusted portals." }
];

export const metadata = buildMetadata("PDF Metadata Cleaner", "Clean common PDF metadata fields before uploading resume, certificate and ID document PDFs.", "/pdf-metadata-cleaner");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="PDF Metadata Cleaner" description="Reset common PDF title, author and creator fields before uploading important documents." ctaHref="/pdf-metadata-cleaner" ctaLabel="Clean PDF" /><PdfMetadataCleaner /><div className="container-page"><AdSlot label="Ad slot before PDF privacy guide" /></div><SeoSection title="Privacy-focused PDF cleanup"><p>This tool is useful before uploading resumes, certificates and ID document PDFs when you want a fresh PDF copy with common document information reset. It works in the browser and does not require file storage.</p><Button asChild className="mt-6"><Link href="/pdf-compress">Compress cleaned PDF</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
