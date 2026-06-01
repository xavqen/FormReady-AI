"use client";

import { useMemo, useState } from "react";
import { Download, Image as ImageIcon, Loader2, RotateCcw, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { loadImage, resizeImageToBlob, type ImageInfo } from "@/lib/image";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

const quickTargets = [20, 50, 100, 200];
const presets = [
  { label: "Custom", width: 300, height: 300, kb: 100 },
  { label: "Passport size", width: 600, height: 600, kb: 200 },
  { label: "Scholarship form", width: 200, height: 230, kb: 50 },
  { label: "Exam form", width: 300, height: 400, kb: 100 },
  { label: "PAN card", width: 213, height: 213, kb: 50 }
];

export function ImageResizer({ defaultWidth = 300, defaultHeight = 300, defaultKb = 100, title = "Photo Resize Tool" }: { defaultWidth?: number; defaultHeight?: number; defaultKb?: number; title?: string }) {
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [targetKb, setTargetKb] = useState(defaultKb);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [background, setBackground] = useState<"white" | "transparent">("white");
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);

  const outputExt = useMemo(() => format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg", [format]);

  async function pickFile(files: File[]) {
    setError("");
    setResult(null);
    const file = files[0];
    if (!file || !file.type.startsWith("image/")) {
      setError("Upload a JPG, PNG or WebP image.");
      return;
    }
    try {
      setImage(await loadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read image.");
    }
  }

  async function process() {
    if (!image) return setError("Upload an image first.");
    setBusy(true);
    setError("");
    try {
      if (result) URL.revokeObjectURL(result.url);
      const blob = await resizeImageToBlob(image.dataUrl, { width, height, targetKb, format, background, zoom, offsetX, offsetY });
      setResult({ blob, url: URL.createObjectURL(blob) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resize failed.");
    } finally {
      setBusy(false);
    }
  }

  function applyPreset(value: string) {
    const preset = presets.find((p) => p.label === value);
    if (!preset) return;
    setWidth(preset.width); setHeight(preset.height); setTargetKb(preset.kb);
  }

  function resetCrop() {
    setZoom(1); setOffsetX(0); setOffsetY(0);
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-primary" />{title}</CardTitle>
            <CardDescription>Upload, crop, resize by pixels and compress by KB in your browser.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={pickFile} title="Upload photo" description="JPG, PNG or WebP · processed on this device" />
            {image && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">Original: {image.width}×{image.height}px · {formatBytes(image.file.size)}</p>
                <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.dataUrl} alt="Uploaded preview" className="mx-auto max-h-[360px] w-full object-contain" />
                </div>
              </div>
            )}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output settings</CardTitle>
            <CardDescription>Select a preset or enter exact dimensions from your form.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Preset</Label><Select onChange={(e) => applyPreset(e.target.value)} defaultValue="Custom">{presets.map((p) => <option key={p.label}>{p.label}</option>)}</Select></div>
              <div className="space-y-2"><Label>Format</Label><Select value={format} onChange={(e) => setFormat(e.target.value as typeof format)}><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></Select></div>
              <div className="space-y-2"><Label>Width px</Label><Input type="number" min={50} value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Height px</Label><Input type="number" min={50} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Target KB</Label><Input type="number" min={5} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Background</Label><Select value={background} onChange={(e) => setBackground(e.target.value as typeof background)}><option value="white">White</option><option value="transparent">Transparent</option></Select></div>
            </div>
            <div className="flex flex-wrap gap-2">{quickTargets.map((kb) => <Button key={kb} type="button" variant="secondary" size="sm" onClick={() => setTargetKb(kb)}>{kb}KB</Button>)}</div>
            <div className="grid gap-3 rounded-2xl border p-4">
              <div className="flex items-center justify-between"><Label>Crop controls</Label><Button type="button" size="sm" variant="ghost" onClick={resetCrop}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button></div>
              <Label>Zoom {zoom.toFixed(2)}x</Label><input aria-label="Zoom" type="range" min="1" max="2.8" step="0.02" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
              <Label>Move X {offsetX}px</Label><input aria-label="Move X" type="range" min="-200" max="200" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} />
              <Label>Move Y {offsetY}px</Label><input aria-label="Move Y" type="range" min="-200" max="200" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} />
            </div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Apply & preview</Button>
            {result && image && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="grid gap-2 text-sm sm:grid-cols-2"><span>Before: {formatBytes(image.file.size)}</span><span>After: {formatBytes(result.blob.size)}</span></div>
                <div className="mt-4 overflow-hidden rounded-xl border bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.url} alt="Result preview" className="mx-auto max-h-72 object-contain" />
                </div>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, cleanFileName(image.file.name, "formready", outputExt))}><Download className="mr-2 h-4 w-4" />Download optimized image</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
