import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PdfTool } from "@/components/tools/pdf-tool";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("PDF Split Online", "Split PDF files and extract selected pages for online forms.", "/pdf-split");
export default function Page() { return <><PageHero title="Split PDF Pages Online" description="Extract only the required pages from a PDF before uploading to a portal." /><PdfTool mode="split" /><SeoSection title="Split PDF for required pages"><p>Use this page when a form asks for only one certificate page from a large scanned PDF.</p></SeoSection></>; }
