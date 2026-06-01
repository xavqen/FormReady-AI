import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "How can I reduce NEET photo size?", a: "Use a JPG export, resize dimensions if needed and lower the target KB until it meets the portal limit." },
  { q: "Can I use a phone photo?", a: "Yes, but crop it cleanly and make sure the face is sharp and well lit." }
];

export const metadata = buildMetadata("NEET Photo Size Guide", "NEET photo resize guide for online application forms with pixel, KB and background tips.", "/guides/neet-photo-size-guide");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="NEET Photo Size Guide" description="Prepare a clear NEET application photo with the right KB, format and crop." ctaHref="/neet-photo-resize" ctaLabel="Resize NEET photo" /><SeoSection title="NEET photo upload checklist"><p>Keep the face clear, avoid heavy filters, export as JPG and match the current portal rules. If the file is too large, reduce target KB. If the photo becomes blurry, start with a sharper original image.</p><p><Button asChild><Link href="/neet-photo-resize">Open NEET photo resize</Link></Button></p></SeoSection><FAQ items={faqs} /></>;
}
