import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("PDF Page Count Upload Guide", "Check PDF page count and reduce PDF size for online form uploads.", "/guides/pdf-page-count-upload-guide");
export default function Page() { return <><PageHero title="PDF Page Count Upload Guide" description="Know when to compress, split or organize a PDF before uploading it to a portal." /><SeoSection title="Page count affects file size"><p>Every scanned page adds image data to a PDF. If your document is too large, first check how many pages it has. Remove extra pages, then compress the final PDF.</p><p>For certificate and ID uploads, portals often need only one or two pages. Splitting unnecessary pages can reduce size more cleanly than heavy compression.</p><Button asChild><Link href="/pdf-page-counter">Count PDF pages</Link></Button></SeoSection></>; }
