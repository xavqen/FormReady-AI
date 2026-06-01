import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("PDF Merge Online", "Merge multiple PDF files into one document for online upload.", "/pdf-merge");
export default function Page() { return <><PageHero title="Merge PDF Files Online" description="Combine multiple PDF documents into one upload-ready file in your browser." /><PdfTool mode="merge" /><SeoSection title="Merge PDF for form documents"><p>Use PDF merge when a portal asks for one combined document instead of separate marksheet, certificate and ID files.</p></SeoSection></>; }
