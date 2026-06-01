import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PresetTool } from "@/components/tools/preset-tool";
import { allPresets } from "@/lib/presets";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const preset = allPresets.find((item) => item.slug === "school-college-document-resize")!;
export const metadata = buildMetadata("School College Document Resize", "Compress school and college documents for upload portals.", "/school-college-document-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(preset.faq)) }} /><PageHero title={preset.title} description={preset.description} /><section className="container-page -mt-4 pb-2"><div className="rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground"><strong className="text-foreground">Required size:</strong> max {preset.maxKb}KB {preset.width && preset.height ? `· ${preset.width}×${preset.height}px` : ""} · formats {preset.formats.join(", ")}</div></section><PresetTool preset={preset} /><SeoSection title="School and college document resize guide"><p>{preset.description} This page applies automatic settings for the selected form category. Check the official portal instructions first, then adjust custom dimensions or KB if your form shows a different requirement.</p></SeoSection><FAQ items={preset.faq} /></>;
}
