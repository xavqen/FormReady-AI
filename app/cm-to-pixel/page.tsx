import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { DimensionCalculator } from "@/components/tools/dimension-calculator";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "How do I convert 3.5cm x 4.5cm to pixels?", a: "Enter 3.5 and 4.5, choose centimeter, then select DPI. At 300 DPI it becomes about 413 x 531 pixels." },
  { q: "Which DPI should I choose for online forms?", a: "For online upload, follow the required pixel size first. DPI is mainly useful when converting print sizes like centimeter or inch to pixels." },
  { q: "Can I resize the photo after converting dimensions?", a: "Yes. Use the pixel output in the photo resize tool and then compress under the required KB limit." }
];

export const metadata = buildMetadata("CM to Pixel Photo Size Calculator", "Convert cm, mm and inch photo sizes to pixels for online forms, passport photos and document scans.", "/cm-to-pixel");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="CM/MM/Inch to Pixel Calculator" description="Convert photo or document print size into pixel width and height for form upload requirements." ctaHref="/cm-to-pixel" ctaLabel="Calculate pixels" /><DimensionCalculator /><div className="container-page"><AdSlot label="Ad slot before pixel guide" /></div><SeoSection title="Photo size in cm vs pixels"><p>Some forms mention physical photo size such as centimeter or inch, while online upload boxes need pixels and KB. Convert the physical size to pixels, then resize the image and reduce file size before uploading.</p></SeoSection><FAQ items={faqs} /></>;
}
