import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Reduce Image Size to 50KB Online", "Learn how to compress JPG or PNG files to 50KB for online application forms.", "/guides/reduce-image-size-to-50kb");

export default function Page() {
  return <><PageHero title="Reduce Image Size to 50KB Online" description="Learn how to compress JPG or PNG files to 50KB for online application forms." ctaHref="/tools" ctaLabel="Open tools" /><SeoSection title="Guide"><p>Use Compress Image when your portal accepts the photo dimensions but rejects the file because it is too large. Set 50KB, export as JPG and verify before uploading.</p><p>After creating the file, use AI File Checker to compare type, size and dimensions with common form presets before final submission.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link href="/compress-image">Compress image</Link></Button><Button asChild variant="secondary"><Link href="/ai-file-checker">Check file</Link></Button></div></SeoSection></>;
}
