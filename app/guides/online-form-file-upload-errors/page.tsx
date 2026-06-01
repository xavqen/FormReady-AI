import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("Online Form File Upload Errors", "Fix common photo, signature and PDF upload errors in scholarship, exam, admission and job forms.", "/guides/online-form-file-upload-errors");
export default function Page() { return <><PageHero title="Online Form File Upload Errors" description="Quick fixes for wrong format, too large, too small, wrong dimensions and invalid filename errors." /><SeoSection title="Fast checklist before submit"><p>Check file format first, then file size, then image dimensions, then file name. Use JPG for most photos, PDF for documents and simple file names without special characters.</p><p>If the portal still rejects the upload, generate a fresh copy from the original file instead of repeatedly renaming the same rejected file.</p><div className="flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/ai-file-checker">Check my file</Link></Button><Button asChild variant="secondary"><Link href="/file-name-cleaner">Clean file name</Link></Button></div></SeoSection></>; }
