import type { MetadataRoute } from "next";
import { allPresets } from "@/lib/presets";
import { siteConfig } from "@/lib/seo";

const staticRoutes = [
  "", "tools", "photo-resize", "file-size-converter", "cm-to-pixel", "compress-image", "white-background-photo", "photo-crop-resize", "convert-to-jpg", "image-metadata-cleaner", "pdf-rotate", "pdf-watermark", "photo-print-size-calculator", "passport-photo-sheet", "document-scanner", "batch-photo-resize", "photo-signature-pack", "admit-card-photo-signature", "form-upload-checklist", "ssc-photo-signature-resize", "railway-photo-signature-resize", "neet-photo-resize", "jee-photo-resize", "cuet-photo-resize", "upsc-photo-signature-resize", "ibps-photo-signature-resize", "state-psc-photo-signature-resize", "army-rally-photo-signature-resize", "nursing-admission-photo-resize", "police-photo-signature-resize", "teacher-exam-photo-signature-resize", "college-admission-photo-signature", "signature-resize", "pdf-compress", "bulk-pdf-compress", "pdf-metadata-cleaner", "resume-pdf-compress", "certificate-compress", "aadhaar-pan-document-compress", "image-to-pdf", "jpg-to-pdf", "png-to-pdf", "pdf-merge", "pdf-split", "pdf-organize", "pdf-to-images", "ai-file-checker", "image-dimension-checker", "pdf-page-counter", "file-name-cleaner", "form-requirements", "guides", "guides/resize-photo-for-online-form", "guides/signature-resize-20kb", "guides/compress-pdf-under-200kb", "guides/bulk-compress-pdf-for-online-forms", "guides/remove-pdf-metadata-private-upload", "guides/strip-exif-image-for-form-upload", "guides/rotate-pdf-for-upload", "guides/add-watermark-pdf-online", "guides/photo-print-size-calculator-guide", "guides/common-form-upload-sizes", "guides/reduce-image-size-to-50kb", "guides/make-photo-background-white", "guides/photo-crop-ratio-for-forms", "guides/scan-documents-to-pdf", "guides/photo-signature-upload-mistakes", "guides/best-file-format-for-online-forms", "guides/passport-photo-size-india", "guides/photo-size-for-government-exams", "guides/ssc-photo-signature-size", "guides/neet-photo-size-guide", "guides/jee-photo-size-guide", "guides/admit-card-upload-files", "guides/how-to-convert-png-to-jpg", "guides/how-to-make-passport-photo-sheet", "guides/kb-mb-file-size-guide", "guides/cm-to-pixel-photo-size", "guides/resume-pdf-size-guide", "guides/aadhaar-pan-document-upload-size", "guides/file-name-upload-error", "guides/image-dimension-upload-guide", "guides/pdf-page-count-upload-guide", "guides/online-form-file-upload-errors", "about", "contact", "privacy-policy", "terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Array.from(new Set([...staticRoutes, ...allPresets.map((p) => p.slug)]));
  return routes.map((route) => ({
    url: route ? `${siteConfig.url}/${route}` : siteConfig.url,
    lastModified: new Date(),
    changeFrequency: route ? ("weekly" as const) : ("daily" as const),
    priority: route ? 0.8 : 1
  }));
}
