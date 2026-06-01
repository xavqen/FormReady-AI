import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { SignatureTool } from "@/components/tools/signature-tool";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I resize signature to 20KB?", a: "Yes. Upload your signature, remove extra white space and choose 20KB." },
  { q: "Does it make the signature background white?", a: "Yes. The output is exported with a clean white background." }
];
export const metadata = buildMetadata("Signature Resize Online", "Crop signature, remove extra white space and compress signature image to 10KB, 20KB, 50KB or 100KB.", "/signature-resize");
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Signature Resize Online" description="Make your signature upload-ready for exam, scholarship, PAN, admission and job forms." /><SignatureTool /><div className="container-page"><AdSlot label="Ad slot before signature FAQ" /></div><SeoSection title="Signature resize for government and college forms"><p>Many portals reject signatures due to extra white space or high file size. This tool trims the signature area, keeps the background white and compresses the output to the selected KB size.</p></SeoSection><FAQ items={faqs} /></>; }
