import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageDimensionChecker } from "@/components/tools/image-dimension-checker";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What are image dimensions?", a: "Image dimensions are width and height in pixels, such as 300×400px. Many portals require exact pixel size." },
  { q: "Can file size be correct but dimensions wrong?", a: "Yes. A photo can be under 50KB but still rejected because its width and height do not match the form rule." }
];

export const metadata = buildMetadata("Image Dimension Checker", "Check photo and signature width, height, aspect ratio and KB size before uploading to online forms.", "/image-dimension-checker");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Image Dimension Checker" description="Instantly check photo/signature pixel size, aspect ratio and KB against common online form requirements." /><ImageDimensionChecker /><SeoSection title="Check pixels before resize"><p>When a portal asks for exact photo dimensions, both width and height matter. This checker helps you see whether the image already matches the rule or needs resizing.</p></SeoSection><FAQ items={faqs} /></>;
}
