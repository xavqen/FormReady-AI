import Link from "next/link";

const links = [
  ["All Tools", "/tools"], ["Photo Resize", "/photo-resize"], ["File Size Converter", "/file-size-converter"], ["CM to Pixel", "/cm-to-pixel"], ["Compress Image", "/compress-image"], ["White Background Photo", "/white-background-photo"], ["Photo Crop & Resize", "/photo-crop-resize"], ["Convert to JPG", "/convert-to-jpg"], ["Image Metadata Cleaner", "/image-metadata-cleaner"], ["PDF Rotate", "/pdf-rotate"], ["PDF Watermark", "/pdf-watermark"], ["Photo Print Size Calculator", "/photo-print-size-calculator"], ["Photo Sheet", "/passport-photo-sheet"], ["Document Scanner", "/document-scanner"],
  ["Batch Photo Resize", "/batch-photo-resize"], ["Photo + Signature Pack", "/photo-signature-pack"], ["Admit Card Pack", "/admit-card-photo-signature"], ["Form Upload Checklist", "/form-upload-checklist"], ["SSC Photo + Signature", "/ssc-photo-signature-resize"], ["Railway Photo + Signature", "/railway-photo-signature-resize"], ["NEET Photo Resize", "/neet-photo-resize"], ["JEE Photo Resize", "/jee-photo-resize"], ["CUET Photo Resize", "/cuet-photo-resize"], ["UPSC Photo + Signature", "/upsc-photo-signature-resize"], ["IBPS Photo + Signature", "/ibps-photo-signature-resize"], ["State PSC Photo + Signature", "/state-psc-photo-signature-resize"], ["Army Rally Files", "/army-rally-photo-signature-resize"], ["Nursing Admission Photo", "/nursing-admission-photo-resize"], ["Police Photo + Signature", "/police-photo-signature-resize"], ["Teacher Exam Files", "/teacher-exam-photo-signature-resize"], ["Admission Photo + Signature", "/college-admission-photo-signature"], ["Signature Resize", "/signature-resize"],
  ["PDF Compress", "/pdf-compress"], ["Bulk PDF Compress", "/bulk-pdf-compress"], ["PDF Metadata Cleaner", "/pdf-metadata-cleaner"], ["Resume PDF Compress", "/resume-pdf-compress"], ["Certificate Compress", "/certificate-compress"], ["ID Document Compress", "/aadhaar-pan-document-compress"], ["Image to PDF", "/image-to-pdf"], ["PDF Merge", "/pdf-merge"], ["PDF Split", "/pdf-split"],
  ["PDF Organizer", "/pdf-organize"], ["PDF Page Counter", "/pdf-page-counter"], ["Image Dimension Checker", "/image-dimension-checker"], ["File Name Cleaner", "/file-name-cleaner"], ["Requirements", "/form-requirements"], ["Guides", "/guides"], ["About", "/about"],
  ["Contact", "/contact"], ["Privacy", "/privacy-policy"], ["Terms", "/terms"]
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 py-10">
      <div className="container-page grid gap-8 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="text-lg font-bold">FormReady AI</div>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Browser-safe document tools for photos, signatures and PDFs used in online forms.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {links.map(([label, href]) => <Link key={href} className="text-muted-foreground hover:text-foreground" href={href}>{label}</Link>)}
        </div>
      </div>
    </footer>
  );
}
