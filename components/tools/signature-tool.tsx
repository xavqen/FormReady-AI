"use client";

import { useState } from "react";
import { Download, Loader2, PenLine, Scissors, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadImage, resizeImageToBlob, trimWhitespace, type ImageInfo } from "@/lib/image";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

const targets = [10, 20, 50, 100];

export function SignatureTool({ defaultKb = 20 }: { defaultKb?: number }) {
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [source, setSource] = useState("");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(100);
  const [targetKb, setTargetKb] = useState(defaultKb);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pickFile(files: File[]) {
    setError(""); setResult(null);
    const file = files[0];
    if (!file?.type.startsWith("image/")) return setError("Upload a signature image.");
    try {
      const loaded = await loadImage(file);
      setImage(loaded);
      setSource(loaded.dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load signature.");
    }
  }

  async function autoCrop() {
    if (!source) return setError("Upload a signature first.");
    setBusy(true); setError("");
    try { setSource(await trimWhitespace(source)); }
    catch (err) { setError(err instanceof Error ? err.message : "Crop failed."); }
    finally { setBusy(false); }
  }

  async function process() {
    if (!source || !image) return setError("Upload a signature first.");
    setBusy(true); setError("");
    try {
      if (result) URL.revokeObjectURL(result.url);
      const blob = await resizeImageToBlob(source, { width, height, targetKb, format: "image/jpeg", background: "white", zoom: 1, offsetX: 0, offsetY: 0 });
      setResult({ blob, url: URL.createObjectURL(blob) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signature resize failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PenLine className="h-5 w-5 text-primary" />Signature Resize Tool</CardTitle>
            <CardDescription>Crop extra white space, make background white and compress signature to 10KB–100KB.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={pickFile} title="Upload signature" />
            {source && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                {image && <p className="text-sm font-medium">Original: {image.width}×{image.height}px · {formatBytes(image.file.size)}</p>}
                <div className="mt-4 rounded-xl border bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={source} alt="Signature preview" className="mx-auto max-h-48 object-contain" />
                </div>
                <Button className="mt-4" variant="secondary" onClick={autoCrop} disabled={busy}><Scissors className="mr-2 h-4 w-4" />Remove extra white space</Button>
              </div>
            )}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Signature settings</CardTitle>
            <CardDescription>Use exact form size when the portal gives dimensions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Width px</Label><Input type="number" min={80} value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Height px</Label><Input type="number" min={30} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
              <div className="space-y-2 sm:col-span-2"><Label>Target KB</Label><Input type="number" min={5} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
            </div>
            <div className="flex flex-wrap gap-2">{targets.map((kb) => <Button key={kb} size="sm" variant="secondary" onClick={() => setTargetKb(kb)}>{kb}KB</Button>)}</div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Resize signature</Button>
            {result && image && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="grid gap-2 text-sm sm:grid-cols-2"><span>Before: {formatBytes(image.file.size)}</span><span>After: {formatBytes(result.blob.size)}</span></div>
                <div className="mt-4 rounded-xl border bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.url} alt="Final signature" className="mx-auto max-h-40 object-contain" />
                </div>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, cleanFileName(image.file.name, "signature", "jpg"))}><Download className="mr-2 h-4 w-4" />Download signature</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
