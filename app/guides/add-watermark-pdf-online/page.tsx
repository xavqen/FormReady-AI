import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I do this on mobile?", a: "Yes. FormReady AI tools are mobile-first and work in modern phone browsers." },
  { q: "Are files private?", a: "The main tools run in your browser, so files do not need to be uploaded to a server." }
];

export const metadata = buildMetadata("Add PDF Watermark for Safer Sharing", "Add text watermark such as Submitted Copy, Self Attested or For Verification to a PDF.", "/guides/add-watermark-pdf-online");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Add PDF Watermark for Safer Sharing" description="Add text watermark such as Submitted Copy, Self Attested or For Verification to a PDF." /><SeoSection title="Add PDF Watermark for Safer Sharing"><p>A light watermark helps show the purpose of a shared document. Keep opacity low so marksheets, ID scans and certificates stay readable. Always follow the portal rule if watermarking is not allowed.</p><div className="mt-5"><Button asChild><Link href="/pdf-watermark">Add watermark</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
