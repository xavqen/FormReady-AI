import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PhotoPrintSizeCalculator } from "@/components/tools/photo-print-size-calculator";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "How many pixels are needed for 3.5 x 4.5 cm photo?", a: "At 300 DPI, a 3.5 x 4.5 cm photo needs about 413 x 531 pixels." },
  { q: "What DPI should I use for printing?", a: "300 DPI is commonly used for sharp printed photos." },
  { q: "Does DPI affect online upload?", a: "Most portals check pixel dimensions and file size, not physical DPI metadata. Use the calculator when print size matters." }
];

export const metadata = buildMetadata("Photo Print Size Calculator", "Convert photo pixels to cm, inch and DPI for passport photo, ID photo and print size requirements.", "/photo-print-size-calculator");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Photo Print Size Calculator" description="Convert pixels, DPI, cm and inches for passport-size photos, ID photos and printed form requirements." /><PhotoPrintSizeCalculator /><SeoSection title="Pixel to print size explained"><p>Online portals usually require width, height and KB. Printers often use centimeters, inches and DPI. This calculator helps bridge both so you can crop and resize the photo correctly.</p></SeoSection><FAQ items={faqs} /></>;
}
