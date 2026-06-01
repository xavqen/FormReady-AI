import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Compress PDF Under 200KB", "Compress scanned PDFs under 200KB for admission, scholarship and government form uploads.", "/guides/compress-pdf-under-200kb");

export default function Page() {
  return <><PageHero title="Compress PDF Under 200KB" description="Reduce scanned document PDFs while keeping pages readable for online upload portals." /><SeoSection title="PDF compression tips"><ul className="ml-5 list-disc space-y-3"><li>For best results, scan documents in clear light and avoid unnecessary blank margins.</li><li>Use PDF Compress and select 200KB target.</li><li>If the PDF has extra pages, use PDF Organizer first to remove them.</li><li>If the PDF still cannot reach 200KB, split it or rescan at lower resolution.</li></ul><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/pdf-compress">Compress PDF</Link></Button><Button asChild variant="secondary"><Link href="/pdf-organize">Organize PDF Pages</Link></Button></div></SeoSection></>;
}
