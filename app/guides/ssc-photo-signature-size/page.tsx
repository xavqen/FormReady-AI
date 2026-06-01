import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "What should I do if SSC photo upload fails?", a: "Check file format, KB size, dimensions and background. Then resize the photo and try again." },
  { q: "Why does signature upload fail?", a: "Common reasons are extra white space, very light ink, wrong KB size or unsupported file format." }
];

export const metadata = buildMetadata("SSC Photo Signature Size Guide", "Guide to fixing SSC photo and signature upload errors with resize, crop and KB compression tips.", "/guides/ssc-photo-signature-size");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="SSC Photo & Signature Size Guide" description="Fix common SSC photo and signature upload errors before submitting your recruitment form." ctaHref="/ssc-photo-signature-resize" ctaLabel="Resize SSC files" /><SeoSection title="How to prepare SSC upload files"><ol><li>Use a clear recent photo with plain background.</li><li>Crop the signature close to the ink area.</li><li>Export in JPG unless the portal specifically asks for another format.</li><li>Compress to the KB range mentioned in the latest official instructions.</li><li>Open the final files once before uploading.</li></ol><p><Button asChild><Link href="/ssc-photo-signature-resize">Open SSC resize tool</Link></Button></p></SeoSection><FAQ items={faqs} /></>;
}
