import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What is PDF metadata?", a: "It is document information such as title, author, creator app, producer, keywords and dates." },
  { q: "Can PDF metadata reveal personal information?", a: "Sometimes it can reveal names or software details. Sensitive documents should be handled carefully." },
  { q: "Does cleaning metadata replace secure document handling?", a: "No. It is only one cleanup step. Upload personal documents only to official trusted portals." }
];

export const metadata = buildMetadata("Remove PDF Metadata Before Upload", "Clean common PDF metadata fields before uploading resume, certificate and ID proof PDFs.", "/guides/remove-pdf-metadata-private-upload");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Remove PDF Metadata Before Upload" description="Reset common PDF document info fields before uploading important files." ctaHref="/pdf-metadata-cleaner" ctaLabel="Clean PDF metadata" /><SeoSection title="Private PDF upload checklist"><ol className="ml-5 list-decimal space-y-3"><li>Keep only required pages in the PDF.</li><li>Clean common metadata fields.</li><li>Compress only as much as needed.</li><li>Open the final file and check readability.</li><li>Upload only to the official portal.</li></ol><Button asChild className="mt-6"><Link href="/pdf-metadata-cleaner">Open PDF metadata cleaner</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
