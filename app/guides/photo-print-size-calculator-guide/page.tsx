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

export const metadata = buildMetadata("Photo Print Size Calculator Guide", "Understand pixels, DPI, centimeters and inches for passport-size and ID photos.", "/guides/photo-print-size-calculator-guide");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Photo Print Size Calculator Guide" description="Understand pixels, DPI, centimeters and inches for passport-size and ID photos." /><SeoSection title="Photo Print Size Calculator Guide"><p>Online uploads usually care about pixels and KB, while print shops care about centimeters and DPI. At 300 DPI, print photos need more pixels for sharp output. Use a calculator before making photo sheets or ID photos.</p><div className="mt-5"><Button asChild><Link href="/photo-print-size-calculator">Calculate print size</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
