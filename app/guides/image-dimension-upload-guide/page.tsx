import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("Image Dimension Upload Guide", "Understand width, height, pixels, aspect ratio and KB size for online form photo uploads.", "/guides/image-dimension-upload-guide");
export default function Page() { return <><PageHero title="Image Dimension Upload Guide" description="Understand why online forms ask for exact photo width and height in pixels." /><SeoSection title="Pixels and KB are different"><p>Dimensions mean the visual size of the image, such as 300×400 pixels. KB means file weight. A photo can have correct KB but wrong dimensions, so check both before final upload.</p><p>For forms, use the exact width and height written in the notice. If the notice gives cm or inch, convert it to pixels using DPI before resizing.</p><Button asChild><Link href="/image-dimension-checker">Check image dimensions</Link></Button></SeoSection></>; }
