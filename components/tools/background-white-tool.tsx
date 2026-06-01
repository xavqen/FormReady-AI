"use client";

import { useMemo, useState } from "react";
import { Download, Eraser, Loader2, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { loadImage, resizeImageToBlob, type ImageInfo } from "@/lib/image";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type SizeMode = "same" | "passport" | "square" | "custom";

const sizeModes: Record<SizeMode, { label: string; width: number; height: number }> = {
  same: { label: "Keep original size", width: 0, height: 0 },
  passport: { label: "Passport 600×600", width: 600, height: 600 },
  square: { label: "Square 300×300", width: 300, height: 300 },
  custom: { label: "Custom size", width: 300, height: 400 }
};

export function BackgroundWhiteTool() {
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [mode, setMode] = useState<SizeMode>("same");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(400);
  const [targetKb, setTargetKb] = useState(100);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; url: string; width: number; height: number } | null>(null);

  const ext = useMemo(() => format === "image/webp" ? "webp" : "jpg", [format]);
  const outputWidth = mode === "same" ? image?.width ?? width : mode === "custom" ? width : sizeModes[mode].width;
  const outputHeight = mode === "same" ? image?.height ?? height : mode === "custom" ? height : sizeModes[mode].height;

  async function pickFile(files: File[]) {
    const file = files[0];
    setError("");
    setResult(null);
    if (!file || !file.type.startsWith("image/")) return setError("Upload a JPG, PNG or WebP image.");
    try {
      setImage(await loadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read image.");
    }
  }

  async function makeWhiteBackground() {
    if (!image) return setError("Upload an image first.");
    setBusy(true);
    setError("");
    try {
      if (result) URL.revokeObjectURL(result.url);
      const blob = await resizeImageToBlob(image.dataUrl, {
        width: outputWidth,
        height: outputHeight,
        targetKb,
        format,
        background: "white",
        zoom: 1,
        offsetX: 0,
        offsetY: 0
      });
      setResult({ blob, url: URL.createObjectURL(blob), width: outputWidth, height: outputHeight });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create white background image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Eraser className="h-5 w-5 text-primary" />Photo White Background Maker</CardTitle>
            <CardDescription>Convert transparent, dark or mixed-background uploads into a clean white JPG/WebP for online forms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={pickFile} title="Upload photo" description="Works locally in your browser" />
            {image && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">Original: {image.width}×{image.height}px · {formatBytes(image.file.size)}</p>
                <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.dataUrl} alt="Uploaded preview" className="mx-auto max-h-80 object-contain" />
                </div>
              </div>
            )}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output settings</CardTitle>
            <CardDescription>Use JPG for best compatibility with older government and exam portals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Size mode</Label><Select value={mode} onChange={(e) => setMode(e.target.value as SizeMode)}>{Object.entries(sizeModes).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</Select></div>
              <div className="space-y-2"><Label>Format</Label><Select value={format} onChange={(e) => setFormat(e.target.value as typeof format)}><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></Select></div>
              <div className="space-y-2"><Label>Width px</Label><Input type="number" min={50} value={outputWidth} disabled={mode !== "custom"} onChange={(e) => setWidth(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Height px</Label><Input type="number" min={50} value={outputHeight} disabled={mode !== "custom"} onChange={(e) => setHeight(Number(e.target.value))} /></div>
              <div className="space-y-2 sm:col-span-2"><Label>Target KB</Label><Input type="number" min={10} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
            </div>
            <div className="flex flex-wrap gap-2">{[20, 50, 100, 200].map((kb) => <Button key={kb} type="button" variant="secondary" size="sm" onClick={() => setTargetKb(kb)}>{kb}KB</Button>)}</div>
            <Button className="w-full" size="lg" onClick={makeWhiteBackground} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Make white background</Button>
            {result && image && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="grid gap-2 text-sm sm:grid-cols-2"><span>Before: {formatBytes(image.file.size)}</span><span>After: {formatBytes(result.blob.size)}</span></div>
                <p className="mt-1 text-xs text-muted-foreground">Output: {result.width}×{result.height}px</p>
                <div className="mt-4 overflow-hidden rounded-xl border bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.url} alt="White background result" className="mx-auto max-h-72 object-contain" />
                </div>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, cleanFileName(image.file.name, "white-background", ext))}><Download className="mr-2 h-4 w-4" />Download white background photo</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
