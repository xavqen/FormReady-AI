import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("How to Resize Photo for Online Form", "Learn how to resize a photo by pixels and KB size for exam, scholarship and government forms.", "/guides/resize-photo-for-online-form");

export default function Page() {
  return <><PageHero title="How to Resize Photo for Online Form" description="Fix rejected photo uploads by correcting file format, dimensions and KB size." /><SeoSection title="Step-by-step photo resize guide"><ol className="ml-5 list-decimal space-y-3"><li>Open the Photo Resize tool and upload your JPG, PNG or WebP photo.</li><li>Select a preset like scholarship, exam, PAN or passport, or enter custom width and height.</li><li>Set the target size such as 20KB, 50KB, 100KB or 200KB.</li><li>Use crop controls to keep your face centered and choose white background if needed.</li><li>Click Apply & preview, compare before/after size, then download the optimized JPG.</li></ol><div className="mt-6"><Button asChild><Link href="/photo-resize">Open Photo Resize Tool</Link></Button></div></SeoSection></>;
}
