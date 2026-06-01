import { PDFDocument } from "pdf-lib";
import { canvasToBlob } from "./image";

export type PdfCompressionResult = { blob: Blob; hitTarget: boolean; pages: number; note: string };

type PdfJs = typeof import("pdfjs-dist");

async function loadPdfJs(): Promise<PdfJs> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  return pdfjs;
}

export async function mergePdfs(files: File[]) {
  const out = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((page) => out.addPage(page));
  }
  const bytes = await out.save({ useObjectStreams: true });
  return new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
}

export async function splitPdf(file: File, fromPage: number, toPage: number) {
  const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = src.getPageCount();
  const from = Math.max(1, Math.min(total, fromPage));
  const to = Math.max(from, Math.min(total, toPage));
  const out = await PDFDocument.create();
  const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
  const pages = await out.copyPages(src, indices);
  pages.forEach((page) => out.addPage(page));
  const bytes = await out.save({ useObjectStreams: true });
  return new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
}

export async function imagesToPdf(files: File[], targetKb?: number) {
  const pdf = await PDFDocument.create();
  for (const file of files) {
    const processed = await imageFileForPdf(file, targetKb ? Math.max(0.45, Math.min(0.92, targetKb / Math.max(files.length, 1) / 600)) : 0.82);
    const bytes = await processed.arrayBuffer();
    const image = processed.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  const bytes = await pdf.save({ useObjectStreams: true });
  return new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
}

async function imageFileForPdf(file: File, quality: number) {
  if (file.type === "image/jpeg" && quality > 0.8) return file;
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not load image."));
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    const maxSide = 1800;
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await canvasToBlob(canvas, "image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function pdfToImages(file: File, scale = 1.45) {
  const pdfjs = await loadPdfJs();
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const blobs: { blob: Blob; name: string }[] = [];
  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
    const page = await pdf.getPage(pageNo);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported.");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({ canvasContext: ctx, viewport } as any).promise;
    
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.88);
    blobs.push({ blob, name: `${file.name.replace(/\.pdf$/i, "")}-page-${pageNo}.jpg` });
  }
  return blobs;
}

export async function compressPdfToTarget(file: File, targetKb: number): Promise<PdfCompressionResult> {
  const pdfjs = await loadPdfJs();
  const maxBytes = targetKb * 1024;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;

  let best: Blob | null = null;
  const attempts = [
    { scale: 1.35, quality: 0.82 },
    { scale: 1.1, quality: 0.72 },
    { scale: 0.9, quality: 0.62 },
    { scale: 0.72, quality: 0.52 },
    { scale: 0.58, quality: 0.44 }
  ];

  for (const attempt of attempts) {
    const out = await PDFDocument.create();
    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
      const page = await pdf.getPage(pageNo);
      const viewport = page.getViewport({ scale: attempt.scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not supported.");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await page.render({ canvasContext: ctx, viewport } as any).promise;
      
      const jpg = await canvasToBlob(canvas, "image/jpeg", attempt.quality);
      const image = await out.embedJpg(await jpg.arrayBuffer());
      const p = out.addPage([image.width, image.height]);
      p.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    const bytes = await out.save({ useObjectStreams: true });
    const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
    best = !best || blob.size < best.size ? blob : best;
    if (blob.size <= maxBytes) {
      return { blob, hitTarget: true, pages: pdf.numPages, note: `Compressed under ${targetKb}KB.` };
    }
  }

  return {
    blob: best ?? file,
    hitTarget: Boolean(best && best.size <= maxBytes),
    pages: pdf.numPages,
    note: best && best.size < file.size ? "Reduced PDF size, but exact target could not be guaranteed for this file." : "This PDF could not be reduced enough in-browser. Try fewer pages or scan at lower quality."
  };
}