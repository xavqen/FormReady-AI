# FormReady AI

All-in-one browser-first document fixer for online forms: photo resize, signature resize, PDF compress, PDF merge/split, image-to-PDF, PDF-to-images, AI file checker, SEO preset pages, clean ad slots and premium-plan section.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Shadcn-style reusable UI components
- Framer Motion ready
- Lucide Icons
- pdf-lib + PDF.js
- Browser Canvas image processing

## Pages included

- `/`
- `/photo-resize`
- `/signature-resize`
- `/pdf-compress`
- `/image-to-pdf`
- `/jpg-to-pdf`
- `/png-to-pdf`
- `/pdf-merge`
- `/pdf-split`
- `/pdf-to-images`
- `/ai-file-checker`
- `/scholarship-photo-resize`
- `/exam-photo-resize`
- `/passport-photo-resize`
- `/pan-card-photo-resize`
- `/job-application-photo-resize`
- `/admission-form-document-resize`
- `/school-college-document-resize`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`

## Create from scratch

```bash
npx create-next-app@latest formready-ai --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*"
cd formready-ai
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate framer-motion lucide-react pdf-lib pdfjs-dist @radix-ui/react-slot
```

Then paste the files from this zip into the project root.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxxxxxxxxxxxxx"
```

Keep `NEXT_PUBLIC_ADSENSE_CLIENT_ID` empty until AdSense approval.

## Deploy on Vercel

1. Push code to GitHub.
2. Open Vercel.
3. Add New Project.
4. Import GitHub repository.
5. Framework preset: Next.js.
6. Add environment variable `NEXT_PUBLIC_APP_URL`.
7. Deploy.
8. Add your custom domain.

## Deploy on Netlify

1. Push code to GitHub.
2. Open Netlify.
3. Add new site from Git.
4. Build command: `npm run build`.
5. Publish directory: `.next`.
6. Install/enable the official Next.js runtime if Netlify asks.
7. Add `NEXT_PUBLIC_APP_URL` environment variable.
8. Deploy.

## Google Search Console

1. Open Google Search Console.
2. Add property using your domain.
3. Verify with DNS TXT record or HTML meta tag.
4. After deployment, open `https://your-domain.com/sitemap.xml`.
5. In Search Console, go to Sitemaps.
6. Submit `sitemap.xml`.
7. Use URL Inspection for important pages like `/photo-resize` and `/signature-resize`.

## Sitemap and robots

Already included:

- `app/sitemap.ts`
- `app/robots.ts`

Set `NEXT_PUBLIC_APP_URL` correctly before deployment so sitemap URLs use your real domain.

## Add Google AdSense later

1. Apply for AdSense after adding original content and getting stable traffic.
2. Get your publisher ID, example: `ca-pub-1234567890`.
3. Add it to `.env.local` and Vercel/Netlify environment variables as `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
4. Replace the visual `AdSlot` boxes with real ad units after approval.
5. Keep ad placements clean: below hero, between tools, sidebar desktop, before FAQ.

## Notes

- Image resizing is fully client-side using Canvas.
- PDF merge/split uses `pdf-lib` in browser.
- PDF compression uses PDF.js rendering + image recompression. Scanned PDFs usually compress well; exact target is not always possible for every PDF without severe quality loss.
- No file storage is used by default.


## Added in continuation

- `/tools` complete tools index for better internal linking.
- `/batch-photo-resize` working browser-side batch image resize tool.
- `/form-requirements` searchable-style requirements reference table.
- Reorder/remove controls for merge and image-to-PDF workflows.
- `not-found.tsx`, `loading.tsx`, and `manifest.ts` for production polish.

## Suggested next monetization steps

1. Replace ad placeholders after Google AdSense approval.
2. Add premium auth/payment only after organic traffic starts.
3. Add analytics events for tool starts, successful downloads, failed checks and preset usage.
4. Create 20–50 long-tail SEO pages from real Search Console queries after indexing.

## v3 continuation additions

Added production-growth pages and tools:

- `/photo-signature-pack` — create photo + signature outputs together and download as separate files or one ZIP.
- `/pdf-organize` — remove pages, reorder pages, keep ranges like `1-3,5`, and export a clean PDF.
- `/guides` — SEO guide hub.
- `/guides/resize-photo-for-online-form`
- `/guides/signature-resize-20kb`
- `/guides/compress-pdf-under-200kb`
- `/guides/common-form-upload-sizes`
- Dynamic Open Graph/Twitter image route for better social previews.
- Updated sitemap, header, footer and popular tools grid.

### New dependency

The photo/signature ZIP export uses `jszip`:

```bash
npm install
```

No server upload is required for these new tools. Processing is browser-side.


## v4 continuation additions

Added more high-traffic utility layers:

- `/compress-image` — batch compress JPG/PNG/WebP to exact KB targets like 20KB, 50KB, 100KB and 200KB.
- `/document-scanner` — convert phone document photos into clean A4 PDF with color, grayscale, high contrast and black-white modes.
- Extra SEO guides:
  - `/guides/reduce-image-size-to-50kb`
  - `/guides/scan-documents-to-pdf`
  - `/guides/photo-signature-upload-mistakes`
  - `/guides/best-file-format-for-online-forms`
- Updated tools index, header, footer, popular tools and sitemap.

These additions target common urgent searches such as "compress image to 50KB", "scan document to PDF online", "photo signature upload error" and "best file format for online form".


## v5 continuation additions

Added another traffic-focused layer:

- `/convert-to-jpg` — batch convert PNG/WebP/JPG into form-friendly JPG, PNG or WebP with target KB and ZIP download.
- `/passport-photo-sheet` — create printable A4 or 4×6 photo sheets with multiple passport/form photos and download JPG or PDF.
- New SEO guides:
  - `/guides/passport-photo-size-india`
  - `/guides/photo-size-for-government-exams`
  - `/guides/how-to-convert-png-to-jpg`
  - `/guides/how-to-make-passport-photo-sheet`
- Updated header, footer, tools hub, popular tools grid and sitemap.

These pages target urgent searches like "convert PNG to JPG for form", "passport photo sheet maker", "government exam photo size" and "passport photo size India".

## v6 continuation additions

New practical traffic pages added in this version:

- `/file-size-converter` — converts bytes, KB and MB and checks real file size from uploaded photo/PDF.
- `/cm-to-pixel` — converts cm, mm and inch photo sizes into pixels using DPI.
- `/resume-pdf-compress` — SEO landing page for job seekers compressing resume PDFs.
- `/certificate-compress` — SEO landing page for marksheet/certificate PDF compression.
- `/aadhaar-pan-document-compress` — privacy-focused ID document PDF compression landing page.
- `/college-admission-photo-signature` — admission-focused photo + signature pack page.
- New guides: KB/MB file size guide, cm-to-pixel photo guide, resume PDF size guide, and ID document upload size guide.

Internal links, sitemap, tools hub, header, footer and popular tools list were updated so the new pages are discoverable by users and search crawlers.

## v7 continuation additions

Added another exam/form traffic layer:

- `/admit-card-photo-signature` — creates an exam upload pack with photo, signature and optional ID scan.
- `/form-upload-checklist` — downloadable checklist for scholarship, exam, admission and job form uploads.
- `/ssc-photo-signature-resize` — SSC-style photo/signature resize landing page using the exam pack tool.
- `/railway-photo-signature-resize` — Railway recruitment photo/signature/ID scan page.
- `/neet-photo-resize` — NEET-focused photo resize page.
- `/jee-photo-resize` — JEE-focused photo resize page.
- New guides:
  - `/guides/ssc-photo-signature-size`
  - `/guides/neet-photo-size-guide`
  - `/guides/jee-photo-size-guide`
  - `/guides/admit-card-upload-files`

Updated sitemap, header, footer, tools hub, popular tools, SEO keywords and preset library so the new pages are crawlable and internally linked.

The new admit-card pack keeps processing client-side. Users can download files individually or as one ZIP pack.


## v8 continuation additions

Added another upload-error prevention layer:

- `/file-name-cleaner` — removes spaces, brackets, special characters and long names, then downloads renamed files as ZIP.
- `/image-dimension-checker` — checks photo/signature width, height, aspect ratio and KB before resizing.
- `/pdf-page-counter` — counts PDF pages, total size and size per page in the browser.
- New guides:
  - `/guides/file-name-upload-error`
  - `/guides/image-dimension-upload-guide`
  - `/guides/pdf-page-count-upload-guide`
  - `/guides/online-form-file-upload-errors`

Updated sitemap, header, footer, tools hub, guide hub, SEO keywords and popular tools so these new pages are crawlable and internally linked.

These pages target common urgent searches around “invalid file name”, “wrong image dimensions”, “PDF page count”, and “file upload error” while keeping processing client-side.

## v9 continuation additions

This version adds another production/SEO layer focused on high-intent form upload problems:

- `/white-background-photo` — make photo background white, resize and compress to target KB.
- `/photo-crop-resize` — crop, center, resize and compress photos for online forms.
- `/bulk-pdf-compress` — compress multiple PDFs and download results as ZIP.
- `/pdf-metadata-cleaner` — rebuild PDF and reset common metadata fields.
- `/cuet-photo-resize` — CUET-focused photo resize landing page.
- `/upsc-photo-signature-resize` — UPSC photo/signature workflow.
- `/police-photo-signature-resize` — police recruitment upload pack.
- `/teacher-exam-photo-signature-resize` — TET/CTET/teacher exam upload pack.
- New SEO guides for white background photos, crop ratios, bulk PDF compression and PDF metadata cleanup.
- Updated header, footer, tools hub, homepage presets, keyword list and sitemap.

Run checks locally:

```bash
npm install
npm run lint
npm run build
```

If PDF.js worker errors appear after upgrading dependencies, keep `pdfjs-dist` and `next` on compatible latest versions, then restart the dev server.


## v10 continuation

Added privacy and PDF finishing layer:

- `/image-metadata-cleaner` removes common EXIF/GPS/camera metadata by redrawing images in the browser.
- `/pdf-rotate` rotates all or selected PDF pages using ranges like `all`, `1-3`, or `1,3,5`.
- `/pdf-watermark` adds light text watermark such as Submitted Copy, Self Attested or For Verification.
- `/photo-print-size-calculator` converts pixels, cm, inches and DPI for passport/ID print sizes.
- New exam/admission SEO pages: IBPS, State PSC, Army Rally and Nursing Admission photo/signature resize.
- New guides for EXIF removal, PDF rotation, PDF watermarking and photo print size.
- Updated tools hub, guides hub, sitemap, header/footer links and SEO keywords.

Recommended local check:

```bash
npm install
npm run lint
npm run build
```
