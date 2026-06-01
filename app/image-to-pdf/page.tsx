import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("Image to PDF", "Convert JPG, PNG and WebP images to PDF for online forms.", "/image-to-pdf");
export default function Page() { return <><PageHero title="Image to PDF Converter" description="Convert marksheet, certificate, ID and document images into a single PDF." /><PdfTool mode="image-to-pdf" /><SeoSection title="Convert scanned images to PDF"><p>Upload one or more document images, arrange them before upload using your file order, and download a clean PDF suitable for most form portals.</p></SeoSection></>; }
