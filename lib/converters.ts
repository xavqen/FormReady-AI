import { PDFDocument } from "pdf-lib";
import { canvasToBlob, imageFromSrc } from "./image";
import { fileToDataUrl } from "./utils";

export type ConvertImageOptions = {
  format: "image/jpeg" | "image/png" | "image/webp";
  targetKb: number;
  maxSide: number;
  background: "white" | "transparent";
};

export async function convertImageFile(file: File, options: ConvertImageOptions) {
  const source = await fileToDataUrl(file);
  const image = await imageFromSrc(source);
  const scale = Math.min(1, options.maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const ctx = canvas.getContext("2d", { alpha: options.background === "transparent" && options.format !== "image/jpeg" });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (options.background === "white" || options.format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  if (options.format === "image/png") {
    const blob = await canvasToBlob(canvas, options.format, 1);
    return { blob, width: canvas.width, height: canvas.height, hitTarget: blob.size <= options.targetKb * 1024 };
  }

  const maxBytes = options.targetKb * 1024;
  let best = await canvasToBlob(canvas, options.format, 0.92);
  let low = 0.2;
  let high = 0.94;

  for (let i = 0; i < 10; i++) {
    const quality = (low + high) / 2;
    const blob = await canvasToBlob(canvas, options.format, quality);
    if (blob.size > maxBytes) high = quality;
    else {
      best = blob;
      low = quality;
    }
  }

  if (best.size <= maxBytes) return { blob: best, width: canvas.width, height: canvas.height, hitTarget: true };

  let working = canvas;
  for (const shrink of [0.9, 0.78, 0.66, 0.55, 0.45]) {
    const smaller = document.createElement("canvas");
    smaller.width = Math.max(80, Math.round(canvas.width * shrink));
    smaller.height = Math.max(80, Math.round(canvas.height * shrink));
    const smallCtx = smaller.getContext("2d");
    if (!smallCtx) break;
    smallCtx.fillStyle = "#ffffff";
    smallCtx.fillRect(0, 0, smaller.width, smaller.height);
    smallCtx.drawImage(working, 0, 0, smaller.width, smaller.height);
    const blob = await canvasToBlob(smaller, options.format, 0.58);
    if (blob.size < best.size) best = blob;
    if (blob.size <= maxBytes) return { blob, width: smaller.width, height: smaller.height, hitTarget: true };
    working = smaller;
  }

  return { blob: best, width: working.width, height: working.height, hitTarget: false };
}

export type PhotoSheetOptions = {
  photoWidthMm: number;
  photoHeightMm: number;
  page: "a4" | "4x6";
  copies: number;
  gapMm: number;
  dpi: number;
  background: "white" | "light-gray";
};

const pageSizesMm = {
  a4: { width: 210, height: 297, label: "A4" },
  "4x6": { width: 101.6, height: 152.4, label: "4x6 inch" }
};

function mmToPx(mm: number, dpi: number) {
  return Math.round((mm / 25.4) * dpi);
}

function mmToPt(mm: number) {
  return (mm / 25.4) * 72;
}

export async function createPhotoSheet(file: File, options: PhotoSheetOptions) {
  const dataUrl = await fileToDataUrl(file);
  const image = await imageFromSrc(dataUrl);
  const page = pageSizesMm[options.page];
  const pageWidthPx = mmToPx(page.width, options.dpi);
  const pageHeightPx = mmToPx(page.height, options.dpi);
  const photoWidthPx = mmToPx(options.photoWidthMm, options.dpi);
  const photoHeightPx = mmToPx(options.photoHeightMm, options.dpi);
  const gapPx = mmToPx(options.gapMm, options.dpi);
  const marginPx = gapPx;
  const canvas = document.createElement("canvas");
  canvas.width = pageWidthPx;
  canvas.height = pageHeightPx;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.fillStyle = options.background === "light-gray" ? "#f8fafc" : "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const columns = Math.max(1, Math.floor((pageWidthPx - marginPx * 2 + gapPx) / (photoWidthPx + gapPx)));
  const rows = Math.max(1, Math.floor((pageHeightPx - marginPx * 2 + gapPx) / (photoHeightPx + gapPx)));
  const maxCopies = Math.min(options.copies, columns * rows);
  const usedWidth = columns * photoWidthPx + (columns - 1) * gapPx;
  const startX = Math.max(marginPx, Math.round((pageWidthPx - usedWidth) / 2));

  const sourceScale = Math.max(photoWidthPx / image.naturalWidth, photoHeightPx / image.naturalHeight);
  const drawWidth = image.naturalWidth * sourceScale;
  const drawHeight = image.naturalHeight * sourceScale;

  for (let i = 0; i < maxCopies; i++) {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = startX + col * (photoWidthPx + gapPx);
    const y = marginPx + row * (photoHeightPx + gapPx);
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, photoWidthPx, photoHeightPx);
    ctx.beginPath();
    ctx.rect(x, y, photoWidthPx, photoHeightPx);
    ctx.clip();
    ctx.drawImage(image, x + (photoWidthPx - drawWidth) / 2, y + (photoHeightPx - drawHeight) / 2, drawWidth, drawHeight);
    ctx.restore();
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = Math.max(1, Math.round(options.dpi / 200));
    ctx.strokeRect(x, y, photoWidthPx, photoHeightPx);
  }

  ctx.fillStyle = "#94a3b8";
  ctx.font = `${Math.round(options.dpi / 16)}px sans-serif`;
  ctx.fillText(`FormReady AI · ${options.photoWidthMm}×${options.photoHeightMm}mm · ${maxCopies} copies · ${page.label}`, marginPx, pageHeightPx - Math.max(12, marginPx / 2));

  const imageBlob = await canvasToBlob(canvas, "image/jpeg", 0.9);
  const pdf = await PDFDocument.create();
  const pdfPage = pdf.addPage([mmToPt(page.width), mmToPt(page.height)]);
  const jpg = await pdf.embedJpg(await imageBlob.arrayBuffer());
  pdfPage.drawImage(jpg, { x: 0, y: 0, width: pdfPage.getWidth(), height: pdfPage.getHeight() });
  const pdfBlob = new Blob([await pdf.save() as Uint8Array<ArrayBuffer>], { type: "application/pdf" });

  return {
    imageBlob,
    pdfBlob,
    width: canvas.width,
    height: canvas.height,
    columns,
    rows,
    copies: maxCopies,
    previewUrl: canvas.toDataURL("image/jpeg", 0.82)
  };
}
