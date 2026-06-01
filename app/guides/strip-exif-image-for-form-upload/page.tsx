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

export const metadata = buildMetadata("Remove EXIF Metadata Before Form Upload", "Learn how to remove EXIF, GPS and camera metadata from photos before uploading them to online forms.", "/guides/strip-exif-image-for-form-upload");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Remove EXIF Metadata Before Form Upload" description="Learn how to remove EXIF, GPS and camera metadata from photos before uploading them to online forms." /><SeoSection title="Remove EXIF Metadata Before Form Upload"><p>Photo metadata can include device model, date, app edits and sometimes location. For public or government uploads, a clean image copy is safer. Redrawing the photo in browser removes common hidden metadata while keeping the visible image intact.</p><div className="mt-5"><Button asChild><Link href="/image-metadata-cleaner">Clean image metadata</Link></Button></div></SeoSection><FAQ items={faqs} /></>;
}
