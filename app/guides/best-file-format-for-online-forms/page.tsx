import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Best File Format for Online Forms", "Choose JPG, PNG, WebP or PDF correctly for government and admission portals.", "/guides/best-file-format-for-online-forms");

export default function Page() {
  return <><PageHero title="Best File Format for Online Forms" description="Choose JPG, PNG, WebP or PDF correctly for government and admission portals." ctaHref="/tools" ctaLabel="Open tools" /><SeoSection title="Guide"><p>JPG is safest for photos, PNG can work for signatures, and PDF is best for multi-page documents. WebP is small but not accepted by many older portals.</p><p>After creating the file, use AI File Checker to compare type, size and dimensions with common form presets before final submission.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link href="/compress-image">Compress image</Link></Button><Button asChild variant="secondary"><Link href="/ai-file-checker">Check file</Link></Button></div></SeoSection></>;
}
