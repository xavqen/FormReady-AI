import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("File Name Upload Error Fix", "Fix online form file name errors caused by spaces, brackets, special characters and long names.", "/guides/file-name-upload-error");
export default function Page() { return <><PageHero title="File Name Upload Error Fix" description="Learn why portals reject file names and how to rename documents safely before upload." /><SeoSection title="Use simple portal-safe names"><p>Use English letters, numbers, dash or underscore only. Avoid spaces, brackets, commas, apostrophes, emojis and very long names. A safe example is <strong>photo-01.jpg</strong> or <strong>marksheet_01.pdf</strong>.</p><p>Do not change the extension manually unless you actually converted the file. Renaming <strong>.png</strong> to <strong>.jpg</strong> does not convert the image format.</p><Button asChild><Link href="/file-name-cleaner">Clean file names now</Link></Button></SeoSection></>; }
