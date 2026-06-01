import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Why does my file show a different KB size on different websites?", a: "Some tools calculate 1KB as 1024 bytes, while some portals use 1000 bytes. Keep the file slightly under the limit to avoid rejection." },
  { q: "How much is 50KB in bytes?", a: "Using browser-style binary size, 50KB is 51,200 bytes." },
  { q: "What should I do before uploading a file?", a: "Check file type, file size, dimensions and readability before final submission." }
];

export const metadata = buildMetadata("KB MB File Size Guide", "Understand KB, MB and bytes for online form upload limits like 20KB, 50KB, 100KB and 1MB.", "/guides/kb-mb-file-size-guide");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="KB, MB & Bytes Guide for Online Forms" description="Understand common upload limits before resizing photos, signatures and PDFs." ctaHref="/file-size-converter" ctaLabel="Open converter" /><SeoSection title="Common upload limits"><p>Online forms usually reject files that are too large. A 20KB signature should be kept around 18KB to 19KB, a 50KB photo around 48KB, and a 200KB PDF around 190KB when possible. This gives a small safety margin for portals that calculate size differently.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-2xl border p-4"><strong>20KB</strong><p className="text-sm text-muted-foreground">20,480 bytes</p></div><div className="rounded-2xl border p-4"><strong>50KB</strong><p className="text-sm text-muted-foreground">51,200 bytes</p></div><div className="rounded-2xl border p-4"><strong>100KB</strong><p className="text-sm text-muted-foreground">102,400 bytes</p></div><div className="rounded-2xl border p-4"><strong>1MB</strong><p className="text-sm text-muted-foreground">1,048,576 bytes</p></div></div><Button asChild className="mt-6"><Link href="/file-size-converter">Convert file size now</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
