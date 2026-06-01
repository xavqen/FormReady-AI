import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What is the formula for cm to pixels?", a: "Pixels = centimeters ÷ 2.54 × DPI. Round the final result to the nearest whole number." },
  { q: "Should I use 300 DPI for online forms?", a: "Use 300 DPI when converting print sizes, but if the form gives exact pixels, follow the exact pixel rule instead." },
  { q: "What comes first: pixel resize or KB compress?", a: "Resize dimensions first, then compress the final image under the KB limit." }
];

export const metadata = buildMetadata("CM to Pixel Photo Size Guide", "Learn how to convert photo size from cm, mm and inch to pixels for online forms and passport photos.", "/guides/cm-to-pixel-photo-size");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="CM to Pixel Photo Size Guide" description="Convert physical photo dimensions into pixel values for form uploads." ctaHref="/cm-to-pixel" ctaLabel="Open calculator" /><SeoSection title="How to convert photo size"><p>When a form mentions a size like 3.5cm × 4.5cm, convert it to pixels using DPI, then use those pixels in the photo resize tool. After dimensions are correct, reduce the JPG size under the required KB limit.</p><div className="mt-6 rounded-2xl border bg-muted/20 p-5"><p className="font-semibold">Formula</p><p className="mt-2 text-sm text-muted-foreground">pixels = physical size in inches × DPI</p><p className="mt-1 text-sm text-muted-foreground">inches = centimeters ÷ 2.54</p></div><Button asChild className="mt-6"><Link href="/cm-to-pixel">Calculate pixels now</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
