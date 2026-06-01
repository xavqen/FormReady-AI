import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "When should I use bulk PDF compression?", a: "Use it when a form asks for many scanned PDFs such as marksheet, ID proof, certificate and resume." },
  { q: "Can multiple PDFs be compressed into one ZIP?", a: "Yes. Compress all files and download a ZIP pack for easy storage." },
  { q: "Why does a PDF not reach the exact KB target?", a: "Some PDFs contain dense images or too many pages. Reducing them too far can make text unreadable." }
];

export const metadata = buildMetadata("Bulk Compress PDF for Online Forms", "Compress multiple PDF documents for online form upload limits and download a ZIP pack.", "/guides/bulk-compress-pdf-for-online-forms");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Bulk Compress PDF for Online Forms" description="Compress multiple certificates, marksheets and ID documents before form submission." ctaHref="/bulk-pdf-compress" ctaLabel="Bulk compress PDFs" /><SeoSection title="Batch PDF upload workflow"><ul className="ml-5 list-disc space-y-3"><li>Remove extra pages before compression.</li><li>Compress every PDF near the portal limit.</li><li>Open each final PDF to confirm readability.</li><li>Use simple file names before uploading.</li></ul><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/bulk-pdf-compress">Open bulk PDF compressor</Link></Button><Button asChild variant="secondary"><Link href="/file-name-cleaner">Clean file names</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
