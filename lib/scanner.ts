import { PDFDocument } from "pdf-lib";
import { canvasToBlob, imageFromSrc } from "./image";
import { fileToDataUrl } from "./utils";

export type ScanMode = "color" | "grayscale" | "contrast" | "black-white";
export type ScanPageSize = "a4" | "original";

export type ScanOptions = {
  mode: ScanMode;
  pageSize: ScanPageSize;
  quality: number;
  margin: number;
};

function fitWithin(width: number, height: number, maxWidth: number, maxHeight: number) {
  const scale = Math.min(maxWidth / width, maxHeight / height);
  return { width: width * scale, height: height * scale };
}

export async function enhanceScanImage(file: File, mode: ScanMode, quality: number) {
  const image = await imageFromSrc(await fileToDataUrl(file));
  const maxSide = 2200;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  if (mode !== "color") {
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = frame.data;
    const contrast = mode === "contrast" ? 70 : 45;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
      let value = mode === "grayscale" ? gray : Math.max(0, Math.min(255, factor * (gray - 128) + 128));
      if (mode === "black-white") value = value > 168 ? 255 : 0;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    ctx.putImageData(frame, 0, 0);
  }

  const blob = await canvasToBlob(canvas, "image/jpeg", quality);
  return { blob, width: canvas.width, height: canvas.height };
}

export async function scannedImagesToPdf(files: File[], options: ScanOptions) {
  const pdf = await PDFDocument.create();
  for (const file of files) {
    const enhanced = await enhanceScanImage(file, options.mode, options.quality);
    const bytes = await enhanced.blob.arrayBuffer();
    const image = await pdf.embedJpg(bytes);

    if (options.pageSize === "a4") {
      const page = pdf.addPage([595.28, 841.89]);
      const safeWidth = page.getWidth() - options.margin * 2;
      const safeHeight = page.getHeight() - options.margin * 2;
      const fitted = fitWithin(image.width, image.height, safeWidth, safeHeight);
      page.drawImage(image, {
        x: (page.getWidth() - fitted.width) / 2,
        y: (page.getHeight() - fitted.height) / 2,
        width: fitted.width,
        height: fitted.height
      });
    } else {
      const page = pdf.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
  }
  const bytes = await pdf.save({ useObjectStreams: true });
  return new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
}
