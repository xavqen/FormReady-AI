import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("All File Tools", "All FormReady AI photo, signature and PDF tools in one place.", "/tools");

const tools = [
  ["Photo Resize", "/photo-resize", "Resize by pixels and target KB", "Popular"],
  ["File Size Converter", "/file-size-converter", "Convert KB, MB and bytes for upload limits", "Calc"],
  ["CM to Pixel", "/cm-to-pixel", "Convert cm/mm/inch photo size to pixels", "DPI"],
  ["Compress Image", "/compress-image", "Reduce image file size to 20KB, 50KB or custom", "SEO"],
  ["White Background Photo", "/white-background-photo", "Make photos clean white and form-ready", "Photo"],
  ["Photo Crop & Resize", "/photo-crop-resize", "Crop, center, resize and compress photos", "Crop"],
  ["Convert to JPG", "/convert-to-jpg", "Convert PNG/WebP to JPG with target KB", "Format"],
  ["Image Metadata Cleaner", "/image-metadata-cleaner", "Remove EXIF/GPS data before upload", "Privacy"],
  ["PDF Rotate", "/pdf-rotate", "Rotate sideways scanned PDF pages", "PDF"],
  ["PDF Watermark", "/pdf-watermark", "Add Submitted Copy or self-attested watermark", "Safe"],
  ["Photo Print Size Calculator", "/photo-print-size-calculator", "Convert pixels, cm, inch and DPI", "Print"],
  ["Passport Photo Sheet", "/passport-photo-sheet", "Create A4 or 4×6 printable photo sheets", "Print"],
  ["Document Scanner", "/document-scanner", "Convert phone document photos into a clean PDF", "New"],
  ["Batch Photo Resize", "/batch-photo-resize", "Resize many photos at once", "Batch"],
  ["Photo + Signature Pack", "/photo-signature-pack", "Generate photo and signature together", "Pack"],
  ["Admit Card Upload Pack", "/admit-card-photo-signature", "Prepare exam photo, signature and ID scan", "Exam"],
  ["Form Upload Checklist", "/form-upload-checklist", "Pre-submit checklist for scholarship, exam and job forms", "Checklist"],
  ["SSC Photo + Signature", "/ssc-photo-signature-resize", "Resize SSC-style photo and signature files", "SSC"],
  ["Railway Photo + Signature", "/railway-photo-signature-resize", "Prepare Railway recruitment upload files", "Railway"],
  ["NEET Photo Resize", "/neet-photo-resize", "Resize NEET application photo", "NEET"],
  ["JEE Photo Resize", "/jee-photo-resize", "Resize JEE application photo", "JEE"],
  ["CUET Photo Resize", "/cuet-photo-resize", "Resize CUET application photo", "CUET"],
  ["UPSC Photo + Signature", "/upsc-photo-signature-resize", "Prepare UPSC-style upload files", "UPSC"],
  ["IBPS Photo + Signature", "/ibps-photo-signature-resize", "Prepare bank exam upload files", "IBPS"],
  ["State PSC Photo + Signature", "/state-psc-photo-signature-resize", "Prepare state PSC upload files", "PSC"],
  ["Army Rally Photo + Signature", "/army-rally-photo-signature-resize", "Prepare defence recruitment files", "Army"],
  ["Nursing Admission Photo", "/nursing-admission-photo-resize", "Prepare nursing admission files", "Nursing"],
  ["Police Photo + Signature", "/police-photo-signature-resize", "Prepare police recruitment upload files", "Police"],
  ["Teacher Exam Photo + Signature", "/teacher-exam-photo-signature-resize", "Prepare TET/CTET and teacher exam files", "Teacher"],
  ["Admission Photo + Signature", "/college-admission-photo-signature", "Create admission-ready photo and signature files", "Admission"],
  ["Signature Resize", "/signature-resize", "Crop and compress signature", "Fast"],
  ["PDF Compress", "/pdf-compress", "Compress PDF under common limits", "Private"],
  ["Bulk PDF Compress", "/bulk-pdf-compress", "Compress many PDFs and download ZIP", "Batch"],
  ["PDF Metadata Cleaner", "/pdf-metadata-cleaner", "Reset common PDF metadata fields", "Privacy"],
  ["Resume PDF Compress", "/resume-pdf-compress", "Reduce resume PDF for job portals", "Jobs"],
  ["Certificate Compress", "/certificate-compress", "Compress marksheet and certificate PDFs", "Student"],
  ["ID Document Compress", "/aadhaar-pan-document-compress", "Compress Aadhaar, PAN and ID PDFs", "Private"],
  ["Image to PDF", "/image-to-pdf", "Convert image scans into PDF", "Student"],
  ["JPG to PDF", "/jpg-to-pdf", "Turn JPG files into PDF", "Useful"],
  ["PNG to PDF", "/png-to-pdf", "Turn PNG files into PDF", "Useful"],
  ["PDF Merge", "/pdf-merge", "Combine multiple PDFs", "Document"],
  ["PDF Split", "/pdf-split", "Extract selected PDF pages", "Document"],
  ["PDF Organizer", "/pdf-organize", "Remove and reorder pages", "Power"],
  ["PDF to Images", "/pdf-to-images", "Export PDF pages as JPG", "Converter"],
  ["AI File Checker", "/ai-file-checker", "Check pass/fail before upload", "Smart"],
  ["Image Dimension Checker", "/image-dimension-checker", "Check pixels, ratio and KB before upload", "Pixels"],
  ["PDF Page Counter", "/pdf-page-counter", "Count PDF pages and size per page", "PDF"],
  ["File Name Cleaner", "/file-name-cleaner", "Remove spaces and special characters", "Fix"],
  ["Requirements Library", "/form-requirements", "Common form upload size limits", "Guide"]
];

export default function Page() {
  return (
    <>
      <PageHero title="All FormReady AI Tools" description="Open any photo, signature, scan or PDF fixer from one clean tools library." />
      <section className="container-page pb-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map(([title, href, desc, badge]) => (
            <Link href={href} key={href}>
              <Card className="h-full transition hover:-translate-y-1 hover:border-primary/40">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3"><Badge>{badge}</Badge><ArrowRight className="h-4 w-4 text-muted-foreground" /></div>
                  <h2 className="mt-4 text-lg font-bold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <SeoSection title="Tool hub for high-intent users"><p>This page gives search engines and users a clear index of every file fixing tool, improving internal links and making it easier to discover the right feature quickly.</p></SeoSection>
    </>
  );
}
