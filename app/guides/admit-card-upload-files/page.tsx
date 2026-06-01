import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Which files are commonly needed for exam forms?", a: "Most exam forms ask for photo and signature. Some also need ID proof, certificate or category document scans." },
  { q: "How do I avoid upload failure?", a: "Check format, size, dimensions, readability and file name before final submit." }
];

export const metadata = buildMetadata("Admit Card Upload Files Guide", "Guide to preparing photo, signature and ID scan files for exam forms and admit-card portals.", "/guides/admit-card-upload-files");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Admit Card Upload Files Guide" description="Prepare photo, signature and ID scan files correctly for exam forms and admit-card portals." ctaHref="/admit-card-photo-signature" ctaLabel="Prepare exam pack" /><SeoSection title="Before you upload exam files"><ul><li>Photo should be clear and recent.</li><li>Signature should be dark, cropped and readable.</li><li>ID scan should not be blurred or cut off.</li><li>PDF and image sizes should match the portal limit.</li><li>Use simple file names without special symbols.</li></ul><p><Button asChild><Link href="/admit-card-photo-signature">Open admit card upload pack</Link></Button></p></SeoSection><FAQ items={faqs} /></>;
}
