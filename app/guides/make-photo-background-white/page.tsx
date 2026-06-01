import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Why do forms ask for a white background photo?", a: "A plain background makes the face clearer and helps portals validate the uploaded photo." },
  { q: "Should I export as JPG?", a: "Yes, JPG is usually the most compatible format for online application portals." },
  { q: "What should I do after making the background white?", a: "Check dimensions, file size and format before final upload." }
];

export const metadata = buildMetadata("How to Make Photo Background White", "Make a white background photo for online forms, exam applications and passport-style uploads.", "/guides/make-photo-background-white");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="How to Make Photo Background White" description="Create a cleaner photo for forms that reject dark, transparent or uneven backgrounds." ctaHref="/white-background-photo" ctaLabel="Make background white" /><SeoSection title="White background upload tips"><ol className="ml-5 list-decimal space-y-3"><li>Upload a clear photo with your face visible.</li><li>Choose JPG output for better portal compatibility.</li><li>Select same size or a passport-style size.</li><li>Set the required KB limit from your form.</li><li>Download and verify the final image before uploading.</li></ol><Button asChild className="mt-6"><Link href="/white-background-photo">Open white background tool</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
