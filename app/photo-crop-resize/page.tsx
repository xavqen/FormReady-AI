import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { ImageResizer } from "@/components/tools/image-resizer";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I crop and resize photo together?", a: "Yes. Use zoom and move controls, set width/height, then export under the target KB." },
  { q: "Which crop ratio is best for forms?", a: "Use the exact width and height mentioned by the portal. If it only says passport size, square or 3.5cm × 4.5cm is commonly used." },
  { q: "Should I crop before compressing?", a: "Yes. Crop and resize dimensions first, then compress the final image under the KB limit." }
];

export const metadata = buildMetadata("Photo Crop and Resize", "Crop photo, set exact width and height, and compress under target KB for online forms.", "/photo-crop-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Photo Crop & Resize" description="Crop, center, resize and compress photos for online forms with exact pixel and KB controls." ctaHref="/photo-crop-resize" ctaLabel="Crop photo" /><ImageResizer title="Photo Crop & Resize Tool" defaultWidth={300} defaultHeight={400} defaultKb={100} /><div className="container-page"><AdSlot label="Ad slot before crop guide" /></div><SeoSection title="Crop first, then compress"><p>Online form photos fail when the face is off-center, the image has too much background, or the final pixel size does not match the portal. Use crop controls first, then reduce the file size.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/cm-to-pixel">Convert cm to pixels</Link></Button><Button asChild variant="secondary"><Link href="/image-dimension-checker">Check dimensions</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
