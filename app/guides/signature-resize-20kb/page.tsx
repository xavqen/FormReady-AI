import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Signature Resize to 20KB", "Crop and compress a signature image to 20KB for online exam and scholarship forms.", "/guides/signature-resize-20kb");

export default function Page() {
  return <><PageHero title="Signature Resize to 20KB" description="Remove extra white space, make the background clean and download a smaller signature JPG." /><SeoSection title="How to make a signature under 20KB"><ol className="ml-5 list-decimal space-y-3"><li>Upload a clear signature photo or scan.</li><li>Use auto trim to remove extra white space around the signature.</li><li>Choose 20KB target and JPG output for best compatibility.</li><li>Preview the final signature and confirm it is readable.</li><li>Download and upload it to your form portal.</li></ol><div className="mt-6"><Button asChild><Link href="/signature-resize">Open Signature Resize Tool</Link></Button></div></SeoSection></>;
}
