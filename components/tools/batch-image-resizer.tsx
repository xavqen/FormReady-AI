"use client";

import { useState } from "react";
import { Download, Images, Loader2, Trash2, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { loadImage, resizeImageToBlob } from "@/lib/image";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type BatchOutput = { original: File; blob: Blob; name: string; url: string };

const batchPresets = [
  { label: "Scholarship", width: 200, height: 230, kb: 50 },
  { label: "Exam form", width: 300, height: 400, kb: 100 },
  { label: "Passport square", width: 600, height: 600, kb: 200 },
  { label: "Job profile", width: 300, height: 300, kb: 100 }
];

export function BatchImageResizer() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(400);
  const [targetKb, setTargetKb] = useState(100);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<BatchOutput[]>([]);

  function chooseFiles(next: File[]) {
    setError("");
    outputs.forEach((item) => URL.revokeObjectURL(item.url));
    setOutputs([]);
    const images = next.filter((file) => file.type.startsWith("image/"));
    if (!images.length) return setError("Upload JPG, PNG or WebP images.");
    setFiles(images.slice(0, 20));
  }

  function applyPreset(value: string) {
    const preset = batchPresets.find((item) => item.label === value);
    if (!preset) return;
    setWidth(preset.width);
    setHeight(preset.height);
    setTargetKb(preset.kb);
  }

  function removeFile(name: string, size: number) {
    setFiles((current) => current.filter((file) => !(file.name === name && file.size === size)));
  }

  async function processBatch() {
    if (!files.length) return setError("Upload images first.");
    setBusy(true);
    setError("");
    outputs.forEach((item) => URL.revokeObjectURL(item.url));
    setOutputs([]);
    try {
      const ext = format === "image/webp" ? "webp" : "jpg";
      const done: BatchOutput[] = [];
      for (const file of files) {
        const info = await loadImage(file);
        const blob = await resizeImageToBlob(info.dataUrl, {
          width,
          height,
          targetKb,
          format,
          background: "white",
          zoom: 1,
          offsetX: 0,
          offsetY: 0
        });
        done.push({ original: file, blob, name: cleanFileName(file.name, "batch-formready", ext), url: URL.createObjectURL(blob) });
      }
      setOutputs(done);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Batch resize failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Images className="h-5 w-5 text-primary" />Batch Photo Resize</CardTitle>
            <CardDescription>Resize up to 20 photos locally with the same form-ready settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" multiple onFiles={chooseFiles} title="Upload multiple photos" description="JPG, PNG or WebP · max 20 files per batch" />
            {!!files.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between text-sm"><strong>{files.length} selected</strong><span className="text-muted-foreground">Browser-only</span></div>
                <div className="max-h-72 space-y-2 overflow-auto pr-1">
                  {files.map((file) => (
                    <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2 text-sm">
                      <span className="truncate">{file.name}</span>
                      <div className="flex items-center gap-2 text-muted-foreground"><span>{formatBytes(file.size)}</span><Button size="icon" variant="ghost" onClick={() => removeFile(file.name, file.size)} aria-label={`Remove ${file.name}`}><Trash2 className="h-4 w-4" /></Button></div>
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
            <CardTitle>Batch settings</CardTitle>
            <CardDescription>Use common preset sizes or exact portal instructions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Preset</Label><Select defaultValue="Exam form" onChange={(e) => applyPreset(e.target.value)}>{batchPresets.map((item) => <option key={item.label}>{item.label}</option>)}</Select></div>
              <div className="space-y-2"><Label>Format</Label><Select value={format} onChange={(e) => setFormat(e.target.value as typeof format)}><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></Select></div>
              <div className="space-y-2"><Label>Width px</Label><Input type="number" min={50} value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Height px</Label><Input type="number" min={50} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
              <div className="space-y-2 sm:col-span-2"><Label>Target KB per image</Label><Input type="number" min={5} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
            </div>
            <Button className="w-full" size="lg" onClick={processBatch} disabled={busy || !files.length}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Resize batch</Button>
            {!!outputs.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-semibold">Ready downloads</p>
                <div className="mt-3 max-h-80 space-y-2 overflow-auto pr-1">
                  {outputs.map((item) => (
                    <div key={item.name} className="grid gap-3 rounded-xl border bg-background p-3 text-sm sm:grid-cols-[64px_1fr_auto] sm:items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt="Output preview" className="h-16 w-16 rounded-lg border bg-white object-contain" />
                      <div className="min-w-0"><p className="truncate font-medium">{item.name}</p><p className="text-muted-foreground">{formatBytes(item.original.size)} → {formatBytes(item.blob.size)}</p></div>
                      <Button variant="secondary" onClick={() => downloadBlob(item.blob, item.name)}><Download className="mr-2 h-4 w-4" />Download</Button>
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
