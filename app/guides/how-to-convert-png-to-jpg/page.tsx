import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("How to Convert PNG to JPG", "Convert PNG to JPG with white background and target KB for online form upload.", "/guides/how-to-convert-png-to-jpg");

export default function Page() {
  return (
    <>
      <PageHero title="How to Convert PNG to JPG for Forms" description="A simple guide for turning PNG or WebP files into JPG files accepted by most portals." ctaHref="/convert-to-jpg" ctaLabel="Convert now" />
      <SeoSection title="PNG to JPG steps">
        <p>Upload the PNG, select JPG as output, keep background white, choose the required target KB and convert. JPG is usually the safest option for online forms because it is widely accepted and smaller than PNG.</p>
        <p>If the converted file is still too large, reduce the target KB or lower the max side pixel setting.</p>
        <div className="mt-6"><Button asChild><Link href="/convert-to-jpg">Open image converter</Link></Button></div>
      </SeoSection>
    </>
  );
}
