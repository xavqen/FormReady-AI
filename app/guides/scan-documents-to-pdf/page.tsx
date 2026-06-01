import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Scan Documents to PDF for Forms", "Create a clean PDF from marksheet, certificate and ID proof photos.", "/guides/scan-documents-to-pdf");

export default function Page() {
  return <><PageHero title="Scan Documents to PDF for Forms" description="Create a clean PDF from marksheet, certificate and ID proof photos." ctaHref="/tools" ctaLabel="Open tools" /><SeoSection title="Guide"><p>Use Document Scanner to place photos on A4, increase contrast and download a PDF. Then compress the PDF if the form asks for a smaller file.</p><p>After creating the file, use AI File Checker to compare type, size and dimensions with common form presets before final submission.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link href="/compress-image">Compress image</Link></Button><Button asChild variant="secondary"><Link href="/ai-file-checker">Check file</Link></Button></div></SeoSection></>;
}
