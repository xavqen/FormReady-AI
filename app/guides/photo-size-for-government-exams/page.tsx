import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Photo Size for Government Exams", "Guide to resize photo and signature files for government exam forms with checker and presets.", "/guides/photo-size-for-government-exams");

export default function Page() {
  return (
    <>
      <PageHero title="Photo Size for Government Exams" description="Fix common government exam upload errors: wrong KB, wrong dimensions, wrong format and signature whitespace." ctaHref="/exam-photo-resize" ctaLabel="Use exam preset" />
      <SeoSection title="Best practice for exam form uploads">
        <p>Exam portals commonly reject uploads when the image is too large, too small, blurry, has extra white space, or uses an unsupported format. Use JPG, white background, correct dimensions and a reasonable target such as 20KB to 100KB unless the portal says otherwise.</p>
        <p>After resizing, run the AI File Checker to confirm file type, size and dimensions before final form submission.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/exam-photo-resize">Resize exam photo</Link></Button><Button asChild variant="secondary"><Link href="/signature-resize">Fix signature</Link></Button></div>
      </SeoSection>
    </>
  );
}
