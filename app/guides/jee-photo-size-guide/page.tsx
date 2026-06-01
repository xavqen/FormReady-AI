import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "How do I resize a JEE photo?", a: "Upload your image, enter the width, height and KB limit mentioned by the portal, then download the optimized JPG." },
  { q: "What causes JEE photo rejection?", a: "Wrong size, wrong crop, dark background, blurry face or unsupported file format can cause rejection." }
];

export const metadata = buildMetadata("JEE Photo Size Guide", "JEE application photo resize guide with upload checklist and image compression tips.", "/guides/jee-photo-size-guide");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="JEE Photo Size Guide" description="Resize and compress JEE application photo without losing face clarity." ctaHref="/jee-photo-resize" ctaLabel="Resize JEE photo" /><SeoSection title="JEE photo upload tips"><p>Use a clear original photo, plain background and JPG output. Check the latest official instructions, then set the same dimensions and KB limit inside the tool before downloading.</p><p><Button asChild><Link href="/jee-photo-resize">Open JEE photo resize</Link></Button></p></SeoSection><FAQ items={faqs} /></>;
}
