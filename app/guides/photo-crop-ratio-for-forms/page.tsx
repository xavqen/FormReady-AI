import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What is crop ratio?", a: "Crop ratio is the relationship between width and height, such as 1:1 square or 3:4 portrait." },
  { q: "Should I crop or resize first?", a: "Crop first to frame the face, then resize to the exact pixels and compress to the KB limit." },
  { q: "What if the form gives dimensions in cm?", a: "Convert cm to pixels using DPI, then enter those pixel values in the photo resize tool." }
];

export const metadata = buildMetadata("Photo Crop Ratio for Online Forms", "Understand photo crop ratio, pixels and KB size for exam, admission and job form uploads.", "/guides/photo-crop-ratio-for-forms");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Photo Crop Ratio for Online Forms" description="Keep your face centered and match the exact photo shape required by the portal." ctaHref="/photo-crop-resize" ctaLabel="Crop photo" /><SeoSection title="Common crop ratios"><ul className="ml-5 list-disc space-y-3"><li>1:1 square is common for passport-style and profile photos.</li><li>3:4 portrait is common for exam and application photos.</li><li>Wide signature images are usually closer to 3:1.</li><li>Always follow exact portal width and height when provided.</li></ul><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/photo-crop-resize">Open crop tool</Link></Button><Button asChild variant="secondary"><Link href="/cm-to-pixel">CM to pixel calculator</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
