"use client";

import { useState } from "react";
import { Download, Eraser, Loader2, Package, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { canvasToBlob, imageFromSrc } from "@/lib/image";
import { cleanFileName, downloadBlob, fileToDataUrl, formatBytes } from "@/lib/utils";

type Output = { name: string; blob: Blob; before: number; beforeType: string; width: number; height: number; note: string };

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

const extensions: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

async function cleanImage(file: File, format: OutputFormat, maxSide: number, quality: number, whiteBackground: boolean): Promise<Output> {
  const src = await fileToDataUrl(file);
  const image = await imageFromSrc(src);
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: format !== "image/jpeg" && !whiteBackground });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (whiteBackground || format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(image, 0, 0, width, height);
  const blob = await canvasToBlob(canvas, format, format === "image/png" ? 1 : quality / 100);
  return {
    name: cleanFileName(file.name, "metadata-clean", extensions[format]),
    blob,
    before: file.size,
    beforeType: file.type || "Unknown",
    width,
    height,
    note: "EXIF/GPS/camera metadata removed by redrawing the image in browser."
  };
}

export function ImageMetadataCleaner() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [maxSide, setMaxSide] = useState(1800);
  const [quality, setQuality] = useState(86);
  const [whiteBackground, setWhiteBackground] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);

  function chooseFiles(input: File[]) {
    setError("");
    setOutputs([]);
    const valid = input.filter((file) => file.type.startsWith("image/"));
    if (!valid.length) return setError("Upload JPG, PNG or WebP images.");
    setFiles(valid);
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function process() {
    if (!files.length) return setError("Upload at least one image first.");
    setBusy(true);
    setError("");
    setOutputs([]);
    try {
      const next: Output[] = [];
      for (const file of files) {
        next.push(await cleanImage(file, format, maxSide, quality, whiteBackground));
      }
      setOutputs(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not clean image metadata.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    if (!outputs.length) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    outputs.forEach((item) => zip.file(item.name, item.blob));
    zip.file("metadata-cleaner-note.txt", "Images were redrawn in the browser to strip common EXIF, GPS and camera metadata. Always check official portal format requirements before upload.");
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "formready-metadata-cleaned-images.zip");
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Image Metadata Cleaner</CardTitle>
            <CardDescription>Strip EXIF, GPS and camera metadata from photos before uploading to forms. Processing stays in your browser.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" multiple onFiles={chooseFiles} title="Upload images" description="JPG, PNG or WebP accepted" />
            {!!files.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="mb-3 text-sm font-semibold">Selected files</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${file.size}-${index}`} className="grid gap-2 rounded-xl bg-background px-3 py-2 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                      <span className="truncate">{index + 1}. {file.name}</span>
                      <span>{formatBytes(file.size)}</span>
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeFile(index)} aria-label="Remove file"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cleaner settings</CardTitle>
            <CardDescription>JPG is the safest output for most government and admission portals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Output format</Label><Select value={format} onChange={(event) => setFormat(event.target.value as OutputFormat)}><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></Select></div>
              <div className="space-y-2"><Label>Max side px</Label><Input type="number" min={400} value={maxSide} onChange={(event) => setMaxSide(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Quality</Label><Input type="number" min={30} max={100} value={quality} onChange={(event) => setQuality(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Background</Label><Select value={whiteBackground ? "white" : "keep"} onChange={(event) => setWhiteBackground(event.target.value === "white")}><option value="white">White background</option><option value="keep">Keep transparency if possible</option></Select></div>
            </div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Eraser className="mr-2 h-4 w-4" />}Clean metadata</Button>
            {!!outputs.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-semibold">Cleaned images</p><Button size="sm" variant="secondary" onClick={downloadZip}><Package className="mr-2 h-4 w-4" />ZIP all</Button></div>
                <div className="space-y-2">
                  {outputs.map((item) => (
                    <div key={item.name} className="rounded-xl bg-background p-3 text-sm">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><span className="truncate font-medium">{item.name}</span><Button size="sm" variant="dark" onClick={() => downloadBlob(item.blob, item.name)}><Download className="mr-2 h-4 w-4" />Download</Button></div>
                      <p className="mt-2 text-muted-foreground">{formatBytes(item.before)} → {formatBytes(item.blob.size)} · {item.width}×{item.height}px</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><Sparkles className="h-3 w-3" />{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
