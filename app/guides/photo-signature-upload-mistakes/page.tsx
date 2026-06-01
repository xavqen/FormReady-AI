import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Common Photo and Signature Upload Mistakes", "Avoid wrong format, wrong KB, blurry crop and extra whitespace in form uploads.", "/guides/photo-signature-upload-mistakes");

export default function Page() {
  return <><PageHero title="Common Photo and Signature Upload Mistakes" description="Avoid wrong format, wrong KB, blurry crop and extra whitespace in form uploads." ctaHref="/tools" ctaLabel="Open tools" /><SeoSection title="Guide"><p>Most upload failures happen because the file is too large, dimensions are wrong, the signature has too much white space, or PNG transparency is rejected.</p><p>After creating the file, use AI File Checker to compare type, size and dimensions with common form presets before final submission.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link href="/compress-image">Compress image</Link></Button><Button asChild variant="secondary"><Link href="/ai-file-checker">Check file</Link></Button></div></SeoSection></>;
}
