import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfWatermarkTool } from "@/components/tools/pdf-watermark";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I add Self Attested watermark?", a: "Yes. Use the preset text buttons or type your own watermark text." },
  { q: "Does watermarking change the original file?", a: "No. The tool creates a new PDF download and leaves your original file unchanged." },
  { q: "Can I keep document text readable?", a: "Yes. Use low opacity such as 0.15 to 0.25 for a light watermark." }
];

export const metadata = buildMetadata("Add Watermark to PDF", "Add text watermark to PDF documents for submitted copy, self attested and verification uploads.", "/pdf-watermark");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Add Watermark to PDF" description="Add Submitted Copy, Self Attested or custom text watermark to PDFs before sharing or uploading." /><PdfWatermarkTool /><div className="container-page"><AdSlot label="Ad slot before watermark guide" /></div><SeoSection title="PDF watermark for safer sharing"><p>Adding a light watermark can make shared documents clearer in purpose, such as admission use, verification use or submitted copy. Keep the text readable and compare with portal rules before final upload.</p></SeoSection><FAQ items={faqs} /></>;
}
