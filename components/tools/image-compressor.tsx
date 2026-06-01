"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Download, ImageDown, Loader2, Package, Sparkles, Trash2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { compressImageToTarget } from "@/lib/image";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type Output = { name: string; blob: Blob; before: number; width: number; height: number; hitTarget: boolean };

export function ImageCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetKb, setTargetKb] = useState(50);
  const [maxSide, setMaxSide] = useState(1600);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [background, setBackground] = useState<"white" | "transparent">("white");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);

  function chooseFiles(input: File[]) {
    const valid = input.filter((file) => file.type.startsWith("image/"));
    setError("");
    setOutputs([]);
    if (!valid.length) return setError("Upload JPG, PNG or WebP images.");
    setFiles(valid.slice(0, 30));
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  async function process() {
    if (!files.length) return setError("Upload image files first.");
    setBusy(true);
    setError("");
    setOutputs([]);
    try {
      const ext = format === "image/webp" ? "webp" : "jpg";
      const results: Output[] = [];
      for (const file of files) {
        const output = await compressImageToTarget(file, { targetKb, maxSide, format, background });
        results.push({
          name: cleanFileName(file.name, `${targetKb}kb`, ext),
          blob: output.blob,
          before: file.size,
          width: output.width,
          height: output.height,
          hitTarget: output.hitTarget
        });
      }
      setOutputs(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image compression failed.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    if (!outputs.length) return;
    const zip = new JSZip();
    outputs.forEach((item) => zip.file(item.name, item.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `formready-compressed-images-${targetKb}kb.zip`);
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageDown className="h-5 w-5 text-primary" />Image KB Compressor</CardTitle>
            <CardDescription>Reduce JPG, PNG or WebP size for online forms without uploading to a server.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" multiple onFiles={chooseFiles} title="Upload images" description="Batch compress up to 30 images" />
            {!!files.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="mb-3 text-sm font-semibold">Selected images</p>
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
            <CardTitle>Compression settings</CardTitle>
            <CardDescription>Use JPG for government forms. WebP is smaller but not accepted everywhere.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Target KB</Label><Input type="number" min={5} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Max side px</Label><Input type="number" min={300} value={maxSide} onChange={(e) => setMaxSide(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Output format</Label><Select value={format} onChange={(e) => setFormat(e.target.value as typeof format)}><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></Select></div>
              <div className="space-y-2"><Label>Background</Label><Select value={background} onChange={(e) => setBackground(e.target.value as typeof background)}><option value="white">White</option><option value="transparent">Transparent</option></Select></div>
            </div>
            <div className="flex flex-wrap gap-2">{[20, 50, 100, 200].map((kb) => <Button key={kb} type="button" size="sm" variant="secondary" onClick={() => setTargetKb(kb)}>{kb}KB</Button>)}</div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Compress images</Button>
            {!!outputs.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-semibold">Compressed results</p><Button size="sm" variant="secondary" onClick={downloadZip}><Package className="mr-2 h-4 w-4" />ZIP all</Button></div>
                <div className="space-y-2">
                  {outputs.map((item) => (
                    <div key={item.name} className="rounded-xl bg-background p-3 text-sm">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><span className="truncate font-medium">{item.name}</span><Button size="sm" variant="dark" onClick={() => downloadBlob(item.blob, item.name)}><Download className="mr-2 h-4 w-4" />Download</Button></div>
                      <p className="mt-2 text-muted-foreground">{formatBytes(item.before)} → {formatBytes(item.blob.size)} · {item.width}×{item.height}px · {item.hitTarget ? "Target passed" : "Best possible"}</p>
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
