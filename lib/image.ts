import { fileToDataUrl } from "./utils";

export type ImageInfo = { width: number; height: number; dataUrl: string; file: File };
export type ResizeOptions = {
  width: number;
  height: number;
  targetKb: number;
  format: "image/jpeg" | "image/png" | "image/webp";
  background: "white" | "transparent";
  zoom: number;
  offsetX: number;
  offsetY: number;
};

export async function loadImage(file: File): Promise<ImageInfo> {
  const dataUrl = await fileToDataUrl(file);
  const image = await imageFromSrc(dataUrl);
  return { width: image.naturalWidth, height: image.naturalHeight, dataUrl, file };
}

export function imageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read this image."));
    image.src = src;
  });
}

export async function resizeImageToBlob(source: string, options: ResizeOptions): Promise<Blob> {
  const image = await imageFromSrc(source);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(options.width));
  canvas.height = Math.max(1, Math.round(options.height));
  const ctx = canvas.getContext("2d", { alpha: options.background === "transparent" });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (options.background === "white" || options.format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight) * options.zoom;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const dx = (canvas.width - drawWidth) / 2 + options.offsetX;
  const dy = (canvas.height - drawHeight) / 2 + options.offsetY;
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);

  if (options.format === "image/png") return canvasToBlob(canvas, options.format, 1);

  const maxBytes = options.targetKb * 1024;
  let low = 0.24;
  let high = 0.94;
  let best = await canvasToBlob(canvas, options.format, high);

  for (let i = 0; i < 10; i++) {
    const mid = (low + high) / 2;
    const blob = await canvasToBlob(canvas, options.format, mid);
    if (blob.size > maxBytes) {
      high = mid;
    } else {
      best = blob;
      low = mid;
    }
  }

  if (best.size > maxBytes) {
    let w = canvas.width;
    let h = canvas.height;
    let working = canvas;
    for (let i = 0; i < 6 && best.size > maxBytes; i++) {
      w = Math.max(80, Math.round(w * 0.9));
      h = Math.max(80, Math.round(h * 0.9));
      const smaller = document.createElement("canvas");
      smaller.width = w;
      smaller.height = h;
      const smallCtx = smaller.getContext("2d");
      if (!smallCtx) break;
      smallCtx.fillStyle = "#ffffff";
      smallCtx.fillRect(0, 0, w, h);
      smallCtx.drawImage(working, 0, 0, w, h);
      working = smaller;
      best = await canvasToBlob(working, options.format, 0.62);
    }
  }

  return best;
}

export async function trimWhitespace(source: string, tolerance = 245) {
  const image = await imageFromSrc(source);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");
  ctx.drawImage(image, 0, 0);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let top = canvas.height;
  let left = canvas.width;
  let right = 0;
  let bottom = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const r = pixels.data[i];
      const g = pixels.data[i + 1];
      const b = pixels.data[i + 2];
      const a = pixels.data[i + 3];
      if (a > 10 && !(r > tolerance && g > tolerance && b > tolerance)) {
        top = Math.min(top, y);
        left = Math.min(left, x);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right <= left || bottom <= top) return source;
  const pad = Math.round(Math.max(canvas.width, canvas.height) * 0.025);
  const sx = Math.max(0, left - pad);
  const sy = Math.max(0, top - pad);
  const sw = Math.min(canvas.width - sx, right - left + pad * 2);
  const sh = Math.min(canvas.height - sy, bottom - top + pad * 2);
  const out = document.createElement("canvas");
  out.width = sw;
  out.height = sh;
  const outCtx = out.getContext("2d");
  if (!outCtx) return source;
  outCtx.fillStyle = "#ffffff";
  outCtx.fillRect(0, 0, sw, sh);
  outCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
  return out.toDataURL("image/png");
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not export file."))), type, quality);
  });
}


export type ImageCompressionOptions = {
  targetKb: number;
  maxSide: number;
  format: "image/jpeg" | "image/webp";
  background: "white" | "transparent";
};

export async function compressImageToTarget(file: File, options: ImageCompressionOptions) {
  const dataUrl = await fileToDataUrl(file);
  const image = await imageFromSrc(dataUrl);
  const drawToCanvas = (scaleFactor: number) => {
    const baseScale = Math.min(1, options.maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const scale = Math.max(0.1, baseScale * scaleFactor);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const ctx = canvas.getContext("2d", { alpha: options.background === "transparent" && options.format === "image/webp" });
    if (!ctx) throw new Error("Canvas is not supported in this browser.");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (options.background === "white" || options.format === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
  };

  const maxBytes = options.targetKb * 1024;
  let best = await canvasToBlob(drawToCanvas(1), options.format, 0.9);
  let bestWidth = Math.round(image.naturalWidth * Math.min(1, options.maxSide / Math.max(image.naturalWidth, image.naturalHeight)));
  let bestHeight = Math.round(image.naturalHeight * Math.min(1, options.maxSide / Math.max(image.naturalWidth, image.naturalHeight)));

  for (const scaleFactor of [1, 0.9, 0.78, 0.66, 0.55, 0.45]) {
    const canvas = drawToCanvas(scaleFactor);
    let low = 0.22;
    let high = 0.94;
    let localBest = await canvasToBlob(canvas, options.format, high);
    for (let i = 0; i < 9; i++) {
      const mid = (low + high) / 2;
      const blob = await canvasToBlob(canvas, options.format, mid);
      if (blob.size > maxBytes) {
        high = mid;
      } else {
        localBest = blob;
        low = mid;
      }
    }
    if (localBest.size < best.size || best.size > maxBytes) {
      best = localBest;
      bestWidth = canvas.width;
      bestHeight = canvas.height;
    }
    if (localBest.size <= maxBytes) {
      return { blob: localBest, width: canvas.width, height: canvas.height, hitTarget: true };
    }
  }

  return { blob: best, width: bestWidth, height: bestHeight, hitTarget: best.size <= maxBytes };
}

