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

export const metadata = buildMetadata("Rotate PDF Pages Before Upload", "Fix sideways or upside-down scanned PDF pages before submitting documents online.", "/guides/rotate-pdf-for-upload");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Rotate PDF Pages Before Upload" description="Fix sideways or upside-down scanned PDF pages before submitting documents online." /><SeoSection title="Rotate PDF Pages Before Upload"><p>Many phone scanner apps produce sideways pages. A rotated PDF looks more professional and avoids manual rejection when documents are checked by staff. Rotate only wrong pages or the full PDF, then open it once before final upload.</p><div className="mt-5"><Button asChild><Link href="/pdf-rotate">Rotate PDF</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
