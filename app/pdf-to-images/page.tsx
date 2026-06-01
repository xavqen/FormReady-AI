import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("PDF to Images", "Convert PDF pages to JPG images in the browser.", "/pdf-to-images");
export default function Page() { return <><PageHero title="PDF to Images Converter" description="Convert PDF pages into JPG images for portals that accept image uploads." /><PdfTool mode="pdf-to-images" /><SeoSection title="PDF pages to image files"><p>Render PDF pages as JPG images. This is useful when a form accepts only image uploads and rejects PDF files.</p></SeoSection></>; }
