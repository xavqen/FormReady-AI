import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageCompressor } from "@/components/tools/image-compressor";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "How do I reduce image size to 50KB?", a: "Upload the image, set Target KB to 50, choose JPG and click Compress images." },
  { q: "Does this keep my file private?", a: "Yes. Compression runs inside your browser using Canvas, so files are not uploaded to a server." },
  { q: "Which format should I use for government forms?", a: "Use JPG unless the official portal clearly accepts WebP. JPG is the safest option for most forms." }
];

export const metadata = buildMetadata("Compress Image to 20KB, 50KB, 100KB", "Reduce JPG, PNG and WebP file size online for scholarship, exam, PAN, passport and job forms.", "/compress-image");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Compress Image to Exact KB for Online Forms" description="Reduce JPG, PNG and WebP files to 20KB, 50KB, 100KB or custom size with private browser-side processing." ctaHref="/compress-image" /><ImageCompressor /><div className="container-page"><AdSlot label="Ad slot below image compressor" /></div><SeoSection title="Image compressor for urgent form uploads"><p>This tool targets users who already have correct dimensions but the file size is too large. It is useful for exam forms, scholarship portals, job applications, PAN/passport uploads and school admission documents.</p><p>For safest compatibility, export as JPG with a white background and check the final file in the AI File Checker before uploading to the official portal.</p></SeoSection><FAQ items={faqs} /></>;
}
