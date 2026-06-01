import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { BackgroundWhiteTool } from "@/components/tools/background-white-tool";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I make photo background white online?", a: "Yes. Upload your image, choose output size and target KB, then download a white-background JPG or WebP." },
  { q: "Is JPG better for online forms?", a: "JPG is usually safest for government, exam and admission portals because older websites may not accept WebP." },
  { q: "Does it remove complex backgrounds automatically?", a: "This tool flattens transparent or mixed image areas onto white and exports a clean file. For complex human cutout removal, use a dedicated background-removal editor first." }
];

export const metadata = buildMetadata("White Background Photo Maker", "Make a photo background white and compress it for online forms, passport photos, exam forms and job applications.", "/white-background-photo");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="White Background Photo Maker" description="Create a clean white-background JPG/WebP with target KB for exam, scholarship, passport and job forms." ctaHref="/white-background-photo" ctaLabel="Make background white" /><BackgroundWhiteTool /><div className="container-page"><AdSlot label="Ad slot before white background guide" /></div><SeoSection title="Make form photos cleaner before upload"><p>Many online portals reject photos with dark, transparent or uneven backgrounds. This tool creates a white-background output, lets you choose a common size, and compresses the final image under a KB target.</p><Button asChild className="mt-6"><Link href="/ai-file-checker">Check final file</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
