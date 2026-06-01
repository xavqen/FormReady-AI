export type PresetKind = "photo" | "signature" | "document";

export type FormPreset = {
  slug: string;
  name: string;
  kind: PresetKind;
  title: string;
  description: string;
  width?: number;
  height?: number;
  minKb?: number;
  maxKb: number;
  formats: string[];
  faq: { q: string; a: string }[];
};

export const photoPresets: FormPreset[] = [
  {
    slug: "scholarship-photo-resize",
    name: "Scholarship Photo",
    kind: "photo",
    title: "Scholarship Photo & Signature Resize",
    description: "Resize student photos for NSP, state scholarship, college scholarship and school admission forms.",
    width: 200,
    height: 230,
    minKb: 10,
    maxKb: 50,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I resize a scholarship photo below 50KB?", a: "Yes. Upload the image and FormReady AI compresses it near the selected target while keeping the face clear." },
      { q: "Will my photo upload to government portals?", a: "Use the checker result before final download. It verifies format, size and dimensions against the preset." }
    ]
  },
  {
    slug: "exam-photo-resize",
    name: "Government Exam Photo",
    kind: "photo",
    title: "Government Exam Photo Resize",
    description: "Prepare photo and signature files for SSC, railway, police, teacher, state PSC and entrance exam forms.",
    width: 300,
    height: 400,
    minKb: 20,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Which size should I choose for exam forms?", a: "Most portals ask for 20KB to 100KB. Select the exam preset, then adjust only if your form mentions a different size." },
      { q: "Can I make the background white?", a: "Yes. Enable the white background option before downloading." }
    ]
  },
  {
    slug: "passport-photo-resize",
    name: "Passport Photo",
    kind: "photo",
    title: "Passport Photo Resize",
    description: "Crop and resize a passport-style photo with clean background and correct aspect ratio.",
    width: 600,
    height: 600,
    minKb: 20,
    maxKb: 200,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Does this create a passport-size photo?", a: "It creates a square, clean, compressed photo suitable for many online upload requirements. Always compare with the official portal instructions." },
      { q: "Is face detection automatic?", a: "This build uses manual crop controls for privacy and speed on weak phones." }
    ]
  },
  {
    slug: "pan-card-photo-resize",
    name: "PAN Card Photo",
    kind: "photo",
    title: "PAN Card Photo Resize",
    description: "Prepare PAN application photo files in JPG/PNG format with controlled KB size.",
    width: 213,
    height: 213,
    minKb: 10,
    maxKb: 50,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I use PNG for PAN photo?", a: "You can upload PNG, then export as JPG for better compatibility and smaller size." },
      { q: "What if the official requirement is different?", a: "Use custom width, height and KB fields on the photo tool page." }
    ]
  },

  {
    slug: "ssc-photo-signature-resize",
    name: "SSC Photo + Signature",
    kind: "photo",
    title: "SSC Photo & Signature Resize",
    description: "Prepare SSC-style photo and signature files with target KB and white background.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 50,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I resize SSC photo and signature together?", a: "Yes. Use the SSC photo/signature page to generate both files and download a ZIP pack." },
      { q: "Can I change the target KB?", a: "Yes. Enter the KB limit written in your latest official SSC instructions." }
    ]
  },
  {
    slug: "railway-photo-signature-resize",
    name: "Railway Photo + Signature",
    kind: "photo",
    title: "Railway Exam Photo & Signature Resize",
    description: "Create Railway recruitment photo, signature and optional ID scan files.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 50,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I prepare Railway recruitment files?", a: "Yes. Upload photo, signature and optional ID scan, then download the prepared files." },
      { q: "Should I check official limits?", a: "Yes. Railway recruitment requirements can change, so compare with the active notice." }
    ]
  },
  {
    slug: "neet-photo-resize",
    name: "NEET Photo",
    kind: "photo",
    title: "NEET Photo Resize",
    description: "Resize and compress NEET application photos with custom pixel and KB controls.",
    width: 600,
    height: 800,
    minKb: 20,
    maxKb: 200,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I resize NEET photo to custom size?", a: "Yes. Enter the official width, height and KB limit before downloading." },
      { q: "Is JPG recommended?", a: "JPG is usually best for small upload limits and broad portal compatibility." }
    ]
  },
  {
    slug: "jee-photo-resize",
    name: "JEE Photo",
    kind: "photo",
    title: "JEE Photo Resize",
    description: "Resize JEE application photos by pixels, crop and target KB.",
    width: 600,
    height: 800,
    minKb: 20,
    maxKb: 200,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I crop my JEE photo?", a: "Yes. Use zoom and movement controls before generating the final image." },
      { q: "Can I use this for other entrance exams?", a: "Yes. Set custom dimensions and KB limit based on that portal." }
    ]
  },

  {
    slug: "cuet-photo-resize",
    name: "CUET Photo",
    kind: "photo",
    title: "CUET Photo Resize",
    description: "Resize and compress CUET application photos with crop, white background and target KB controls.",
    width: 600,
    height: 800,
    minKb: 20,
    maxKb: 200,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I resize CUET photo to custom size?", a: "Yes. Enter the official width, height and KB limit before downloading." },
      { q: "Can I use this for other entrance exams?", a: "Yes. Set custom values based on your portal instructions." }
    ]
  },
  {
    slug: "upsc-photo-signature-resize",
    name: "UPSC Photo + Signature",
    kind: "photo",
    title: "UPSC Photo & Signature Resize",
    description: "Create UPSC-style photo and signature files with target KB and clean JPG output.",
    width: 300,
    height: 400,
    minKb: 20,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I prepare UPSC photo and signature together?", a: "Yes. Use the dedicated UPSC photo/signature page and download a ZIP pack." },
      { q: "Should I check latest official limits?", a: "Yes. Always compare with the active UPSC application instructions." }
    ]
  },
  {
    slug: "police-photo-signature-resize",
    name: "Police Recruitment Photo + Signature",
    kind: "photo",
    title: "Police Recruitment Photo & Signature Resize",
    description: "Prepare police recruitment photo, signature and optional ID scan files.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I prepare police form upload files?", a: "Yes. Upload photo, signature and optional ID scan, then generate form-ready files." },
      { q: "Can I customize KB limits?", a: "Yes. Enter the size limit from your state recruitment portal." }
    ]
  },
  {
    slug: "teacher-exam-photo-signature-resize",
    name: "Teacher Exam Photo + Signature",
    kind: "photo",
    title: "Teacher Exam Photo & Signature Resize",
    description: "Prepare TET, CTET, B.Ed entrance and teacher recruitment photo/signature files.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I use this for TET or CTET forms?", a: "Yes. Set custom dimensions and KB according to the official instructions." },
      { q: "Can I download photo and signature as ZIP?", a: "Yes. Generate both files and download the ZIP pack." }
    ]
  },
  {
    slug: "ibps-photo-signature-resize",
    name: "IBPS Photo + Signature",
    kind: "photo",
    title: "IBPS Photo & Signature Resize",
    description: "Prepare IBPS bank exam photo and signature files with target KB and clean JPG output.",
    width: 300,
    height: 400,
    minKb: 20,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I prepare IBPS photo and signature together?", a: "Yes. Use the IBPS page to generate both files and download a ZIP pack." },
      { q: "Should I follow official IBPS limits?", a: "Yes. Always compare the final file with the active IBPS notification." }
    ]
  },
  {
    slug: "state-psc-photo-signature-resize",
    name: "State PSC Photo + Signature",
    kind: "photo",
    title: "State PSC Photo & Signature Resize",
    description: "Prepare state PSC exam photo and signature files for online application portals.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I use this for BPSC, UPPSC or RPSC?", a: "Yes. Set the custom KB and dimensions based on your state portal." },
      { q: "Can I download a ZIP pack?", a: "Yes. Generate photo and signature together, then download the ZIP." }
    ]
  },
  {
    slug: "army-rally-photo-signature-resize",
    name: "Army Rally Photo + Signature",
    kind: "photo",
    title: "Army Rally Photo & Signature Resize",
    description: "Prepare defence recruitment photo, signature and optional ID scan files.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I prepare army recruitment upload files?", a: "Yes. Use this page to prepare photo, signature and optional ID scan files." },
      { q: "Can I customize size limits?", a: "Yes. Use the official portal values before generating files." }
    ]
  },
  {
    slug: "nursing-admission-photo-resize",
    name: "Nursing Admission Photo",
    kind: "photo",
    title: "Nursing Admission Photo Resize",
    description: "Resize nursing admission photos and signatures for college or entrance forms.",
    width: 300,
    height: 400,
    minKb: 10,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I use this for nursing admission forms?", a: "Yes. It helps prepare photo and signature files for nursing and paramedical portals." },
      { q: "Does it support custom dimensions?", a: "Yes. Use the photo resize controls if your portal mentions exact dimensions." }
    ]
  },
  {
    slug: "job-application-photo-resize",
    name: "Job Application Photo",
    kind: "photo",
    title: "Job Application Photo Resize",
    description: "Resize photos for job portals, resume uploads, campus hiring and private company forms.",
    width: 300,
    height: 300,
    minKb: 20,
    maxKb: 100,
    formats: ["JPG", "PNG", "WebP"],
    faq: [
      { q: "Can I make a LinkedIn-style profile photo?", a: "Yes. Use square crop, white background and 100KB target for a clean upload-ready profile photo." },
      { q: "Will it reduce blur?", a: "It preserves clarity as much as possible, but very small original photos may still look soft." }
    ]
  }
];

export const documentPresets: FormPreset[] = [
  {
    slug: "admission-form-document-resize",
    name: "Admission Form Document",
    kind: "document",
    title: "Admission Form Document Resize",
    description: "Compress marksheets, certificates and admission PDFs under common portal limits.",
    maxKb: 500,
    formats: ["PDF", "JPG", "PNG"],
    faq: [
      { q: "Can I compress scanned admission PDFs?", a: "Yes. PDF compression rasterizes pages and adjusts image quality to target a smaller file." },
      { q: "Can all PDFs reach 500KB?", a: "Most scanned PDFs can be reduced. Text-heavy or protected PDFs may not hit every exact target." }
    ]
  },
  {
    slug: "school-college-document-resize",
    name: "School/College Document",
    kind: "document",
    title: "School & College Document Resize",
    description: "Resize document scans for school registration, college admission and student portals.",
    maxKb: 500,
    formats: ["PDF", "JPG", "PNG"],
    faq: [
      { q: "Can I convert certificates to PDF?", a: "Yes. Upload JPG/PNG files on Image to PDF or JPG to PDF page." },
      { q: "Are documents uploaded to server?", a: "No. The main tools process files inside your browser." }
    ]
  }
];

export const allPresets = [...photoPresets, ...documentPresets];

export const popularTools = [
  { title: "Photo Resize", href: "/photo-resize", desc: "Resize photo by pixel and KB", badge: "Most used" },
  { title: "File Size Converter", href: "/file-size-converter", desc: "Convert KB, MB and bytes instantly", badge: "Calc" },
  { title: "CM to Pixel", href: "/cm-to-pixel", desc: "Convert photo dimensions to pixels", badge: "DPI" },
  { title: "Compress Image", href: "/compress-image", desc: "Reduce JPG/PNG/WebP to exact KB", badge: "SEO" },
  { title: "White Background Photo", href: "/white-background-photo", desc: "Make form photos clean and white", badge: "Photo" },
  { title: "Photo Crop & Resize", href: "/photo-crop-resize", desc: "Crop, center and compress photos", badge: "Crop" },
  { title: "Convert to JPG", href: "/convert-to-jpg", desc: "Convert PNG/WebP to JPG with target KB", badge: "Format" },
  { title: "Image Metadata Cleaner", href: "/image-metadata-cleaner", desc: "Remove EXIF/GPS before upload", badge: "Privacy" },
  { title: "PDF Rotate", href: "/pdf-rotate", desc: "Fix sideways scanned PDF pages", badge: "PDF" },
  { title: "PDF Watermark", href: "/pdf-watermark", desc: "Add submitted copy watermark", badge: "Safe" },
  { title: "Photo Print Size Calculator", href: "/photo-print-size-calculator", desc: "Pixels to cm, inch and DPI", badge: "Print" },
  { title: "Passport Photo Sheet", href: "/passport-photo-sheet", desc: "Make printable A4 or 4×6 photo sheets", badge: "Print" },
  { title: "Document Scanner", href: "/document-scanner", desc: "Turn phone photos into clean PDF", badge: "New" },
  { title: "Batch Photo Resize", href: "/batch-photo-resize", desc: "Resize many photos at once", badge: "Batch" },
  { title: "Photo + Signature Pack", href: "/photo-signature-pack", desc: "Generate both files and ZIP", badge: "Pack" },
  { title: "Admit Card Upload Pack", href: "/admit-card-photo-signature", desc: "Prepare exam photo, signature and ID scan", badge: "Exam" },
  { title: "Form Upload Checklist", href: "/form-upload-checklist", desc: "Pre-submit checklist for forms", badge: "Checklist" },
  { title: "SSC Photo + Signature", href: "/ssc-photo-signature-resize", desc: "SSC-style photo/signature files", badge: "SSC" },
  { title: "NEET Photo Resize", href: "/neet-photo-resize", desc: "NEET application photo helper", badge: "NEET" },
  { title: "IBPS Photo + Signature", href: "/ibps-photo-signature-resize", desc: "Bank exam photo/signature files", badge: "IBPS" },
  { title: "State PSC Photo + Signature", href: "/state-psc-photo-signature-resize", desc: "State exam upload files", badge: "PSC" },
  { title: "Admission Photo + Signature", href: "/college-admission-photo-signature", desc: "Prepare admission photo and signature", badge: "Admission" },
  { title: "Signature Resize", href: "/signature-resize", desc: "Crop signature and reduce KB", badge: "Fast" },
  { title: "PDF Compress", href: "/pdf-compress", desc: "Compress PDFs under portal limits", badge: "Private" },
  { title: "Bulk PDF Compress", href: "/bulk-pdf-compress", desc: "Compress many PDFs and download ZIP", badge: "Batch" },
  { title: "PDF Metadata Cleaner", href: "/pdf-metadata-cleaner", desc: "Reset PDF title and author fields", badge: "Privacy" },
  { title: "Resume PDF Compress", href: "/resume-pdf-compress", desc: "Reduce resume PDF for job portals", badge: "Jobs" },
  { title: "Image to PDF", href: "/image-to-pdf", desc: "Convert scans into PDF", badge: "Student" },
  { title: "PDF Organizer", href: "/pdf-organize", desc: "Remove and reorder PDF pages", badge: "Tools" },
  { title: "AI File Checker", href: "/ai-file-checker", desc: "Check format, size and dimensions", badge: "Smart" },
  { title: "Image Dimension Checker", href: "/image-dimension-checker", desc: "Check pixels, ratio and KB", badge: "Pixels" },
  { title: "PDF Page Counter", href: "/pdf-page-counter", desc: "Count PDF pages and size", badge: "PDF" },
  { title: "File Name Cleaner", href: "/file-name-cleaner", desc: "Fix invalid upload file names", badge: "Fix" }
];

