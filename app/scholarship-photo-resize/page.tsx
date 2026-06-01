import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PresetTool } from "@/components/tools/preset-tool";
import { allPresets } from "@/lib/presets";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const preset = allPresets.find((item) => item.slug === "scholarship-photo-resize")!;
export const metadata = buildMetadata("Scholarship Photo & Signature Resize", "Resize scholarship photo and signature files for student portals.", "/scholarship-photo-resize");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(preset.faq)) }} /><PageHero title={preset.title} description={preset.description} /><section className="container-page -mt-4 pb-2"><div className="rounded-2xl border bg-muted/30 p-4 text-sm text-muted-foreground"><strong className="text-foreground">Required size:</strong> max {preset.maxKb}KB {preset.width && preset.height ? `· ${preset.width}×${preset.height}px` : ""} · formats {preset.formats.join(", ")}</div></section><PresetTool preset={preset} /><SeoSection title="Scholarship photo resize guide"><p>{preset.description} This page applies automatic settings for the selected form category. Check the official portal instructions first, then adjust custom dimensions or KB if your form shows a different requirement.</p></SeoSection><FAQ items={preset.faq} /></>;
}
