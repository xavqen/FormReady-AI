import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("PNG to PDF", "Convert PNG images to PDF online.", "/png-to-pdf");
export default function Page() { return <><PageHero title="PNG to PDF Converter" description="Convert PNG documents, certificates and screenshots into PDF." /><PdfTool mode="image-to-pdf" imageOnly /><SeoSection title="PNG to PDF for form uploads"><p>PNG files can be large. The converter exports pages into PDF with balanced image quality for easier online upload.</p></SeoSection></>; }
