import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("JPG to PDF", "Convert JPG photos and scans to PDF online.", "/jpg-to-pdf");
export default function Page() { return <><PageHero title="JPG to PDF Converter" description="Turn JPG scans into a PDF for school, college, job and government forms." /><PdfTool mode="image-to-pdf" imageOnly /><SeoSection title="JPG to PDF for online forms"><p>JPG is common for scanned documents and photos. Convert multiple JPG files into one PDF without uploading them to a server.</p></SeoSection></>; }
