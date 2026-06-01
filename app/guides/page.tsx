import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("Online Form File Guides", "Practical guides for photo resize, signature resize, PDF compression and document upload requirements.", "/guides");

const guides = [
  ["Resize Photo for Online Form", "/guides/resize-photo-for-online-form", "Exact width, height and KB basics"],
  ["KB MB File Size Guide", "/guides/kb-mb-file-size-guide", "Understand bytes, KB, MB and upload limits"],
  ["CM to Pixel Photo Size", "/guides/cm-to-pixel-photo-size", "Convert print dimensions to pixels"],
  ["Reduce Image Size to 50KB", "/guides/reduce-image-size-to-50kb", "Compress JPG/PNG for upload limits"],
  ["Make Photo Background White", "/guides/make-photo-background-white", "Create clean white-background photos"],
  ["Photo Crop Ratio for Forms", "/guides/photo-crop-ratio-for-forms", "Crop ratios, pixels and KB basics"],
  ["Signature Resize 20KB", "/guides/signature-resize-20kb", "Crop whitespace and make clean signature"],
  ["Compress PDF under 200KB", "/guides/compress-pdf-under-200kb", "Shrink scanned PDFs for forms"],
  ["Bulk Compress PDF for Online Forms", "/guides/bulk-compress-pdf-for-online-forms", "Compress many PDFs and download ZIP"],
  ["Remove PDF Metadata Before Upload", "/guides/remove-pdf-metadata-private-upload", "Reset common PDF info fields"],
  ["Remove EXIF Before Form Upload", "/guides/strip-exif-image-for-form-upload", "Clean hidden photo metadata"],
  ["Rotate PDF Before Upload", "/guides/rotate-pdf-for-upload", "Fix sideways scanned pages"],
  ["Add PDF Watermark Online", "/guides/add-watermark-pdf-online", "Mark PDFs as submitted or self-attested"],
  ["Photo Print Size Calculator", "/guides/photo-print-size-calculator-guide", "Pixels, cm, inch and DPI explained"],
  ["Scan Documents to PDF", "/guides/scan-documents-to-pdf", "Create a clean PDF from phone photos"],
  ["Common Form Upload Sizes", "/guides/common-form-upload-sizes", "Photo, signature and PDF requirements"],
  ["Photo & Signature Upload Mistakes", "/guides/photo-signature-upload-mistakes", "Fix rejected uploads quickly"],
  ["Best File Format for Online Forms", "/guides/best-file-format-for-online-forms", "JPG vs PNG vs WebP vs PDF"],
  ["Passport Photo Size India", "/guides/passport-photo-size-india", "Resize and print passport-style photos"],
  ["Photo Size for Government Exams", "/guides/photo-size-for-government-exams", "Avoid rejected photo/signature uploads"],
  ["SSC Photo Signature Size", "/guides/ssc-photo-signature-size", "Fix SSC upload photo/signature errors"],
  ["NEET Photo Size Guide", "/guides/neet-photo-size-guide", "Prepare NEET application photos"],
  ["JEE Photo Size Guide", "/guides/jee-photo-size-guide", "Prepare JEE application photos"],
  ["Admit Card Upload Files", "/guides/admit-card-upload-files", "Photo, signature and ID scan checklist"],
  ["How to Convert PNG to JPG", "/guides/how-to-convert-png-to-jpg", "Make form-friendly JPG files"],
  ["How to Make Passport Photo Sheet", "/guides/how-to-make-passport-photo-sheet", "Create A4 or 4×6 printable sheets"],
  ["Resume PDF Size Guide", "/guides/resume-pdf-size-guide", "Compress resumes for job portals"],
  ["Aadhaar PAN Document Upload Size", "/guides/aadhaar-pan-document-upload-size", "Private ID document compression checklist"],
  ["File Name Upload Error Fix", "/guides/file-name-upload-error", "Remove invalid filename characters"],
  ["Image Dimension Upload Guide", "/guides/image-dimension-upload-guide", "Width, height, ratio and KB explained"],
  ["PDF Page Count Upload Guide", "/guides/pdf-page-count-upload-guide", "When to split, compress or organize PDFs"],
  ["Online Form File Upload Errors", "/guides/online-form-file-upload-errors", "Fix common upload rejection messages"]
];

export default function Page() {
  return (
    <>
      <PageHero title="Online Form File Guides" description="SEO-ready help pages for common photo, signature and PDF upload problems." />
      <section className="container-page pb-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map(([title, href, desc]) => (
            <Link href={href} key={href}>
              <Card className="h-full transition hover:-translate-y-1 hover:border-primary/40">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3"><Badge>Guide</Badge><ArrowRight className="h-4 w-4 text-muted-foreground" /></div>
                  <h2 className="mt-4 text-lg font-bold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <SeoSection title="Why guides matter"><p>These guides target informational searches and internally link users to the tools when they are ready to fix their files.</p></SeoSection>
    </>
  );
}
