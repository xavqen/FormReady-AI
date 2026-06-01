"use client";

import { useMemo, useState } from "react";
import JSZip from "jszip";
import { Download, FileImage, Loader2, RefreshCcw, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { convertImageFile } from "@/lib/converters";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type Output = { file: File; blob: Blob; width: number; height: number; hitTarget: boolean; name: string };

export function ImageFormatConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [targetKb, setTargetKb] = useState(100);
  const [maxSide, setMaxSide] = useState(1400);
  const [background, setBackground] = useState<"white" | "transparent">("white");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);

  const ext = useMemo(() => format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg", [format]);

  function chooseFiles(input: File[]) {
    setError("");
    setOutputs([]);
    const valid = input.filter((file) => file.type.startsWith("image/"));
    if (!valid.length) return setError("Upload JPG, PNG or WebP image files.");
    setFiles(valid);
  }

  async function process() {
    if (!files.length) return setError("Upload at least one image first.");
    setBusy(true);
    setError("");
    try {
      const converted: Output[] = [];
      for (const file of files) {
        const output = await convertImageFile(file, { format, targetKb, maxSide, background });
        converted.push({ file, ...output, name: cleanFileName(file.name, `converted-${targetKb}kb`, ext) });
      }
      setOutputs(converted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    if (!outputs.length) return;
    const zip = new JSZip();
    outputs.forEach((item) => zip.file(item.name, item.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "formready-converted-images.zip");
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileImage className="h-5 w-5 text-primary" />Image Format Converter</CardTitle>
            <CardDescription>Convert PNG, WebP and HEIC-like browser-readable images into JPG, PNG or WebP with target KB.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onFiles={chooseFiles} title="Upload images" description="Batch convert common image formats in your browser" />
            {!!files.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-semibold">Selected images</p><Button variant="ghost" size="sm" onClick={() => { setFiles([]); setOutputs([]); }}><RefreshCcw className="mr-1 h-4 w-4" />Clear</Button></div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {files.map((file) => <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl bg-background px-3 py-2"><span className="truncate">{file.name}</span><span>{formatBytes(file.size)}</span></div>)}
                </div>
              </div>
            )}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion settings</CardTitle>
            <CardDescription>Use JPG for most government portals. WebP is smaller but not accepted everywhere.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Output format</Label><Select value={format} onChange={(e) => setFormat(e.target.value as typeof format)}><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option><option value="image/png">PNG</option></Select></div>
              <div className="space-y-2"><Label>Background</Label><Select value={background} onChange={(e) => setBackground(e.target.value as typeof background)}><option value="white">White</option><option value="transparent">Transparent</option></Select></div>
              <div className="space-y-2"><Label>Target KB</Label><Input type="number" min={10} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Max side px</Label><Input type="number" min={200} value={maxSide} onChange={(e) => setMaxSide(Number(e.target.value))} /></div>
            </div>
            <div className="flex flex-wrap gap-2">{[20, 50, 100, 200, 500].map((kb) => <Button key={kb} type="button" variant="secondary" size="sm" onClick={() => setTargetKb(kb)}>{kb}KB</Button>)}</div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Convert images</Button>
            {!!outputs.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">Converted files</p>{outputs.length > 1 && <Button size="sm" variant="dark" onClick={downloadZip}><Download className="mr-1 h-4 w-4" />ZIP</Button>}</div>
                <div className="mt-3 space-y-2">
                  {outputs.map((item) => <div key={item.name} className="rounded-xl bg-background p-3 text-sm"><div className="flex items-center justify-between gap-3"><span className="truncate font-medium">{item.name}</span><Button size="sm" variant="secondary" onClick={() => downloadBlob(item.blob, item.name)}><Download className="mr-1 h-4 w-4" />Download</Button></div><p className="mt-1 text-muted-foreground">{formatBytes(item.file.size)} → {formatBytes(item.blob.size)} · {item.width}×{item.height}px · {item.hitTarget ? "target passed" : "best possible"}</p></div>)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
