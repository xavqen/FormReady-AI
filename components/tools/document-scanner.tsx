"use client";

import { useState } from "react";
import { Download, Loader2, ScanLine, Sparkles, Trash2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { scannedImagesToPdf, type ScanMode, type ScanPageSize } from "@/lib/scanner";
import { downloadBlob, formatBytes } from "@/lib/utils";

export function DocumentScanner() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<ScanMode>("contrast");
  const [pageSize, setPageSize] = useState<ScanPageSize>("a4");
  const [quality, setQuality] = useState(0.78);
  const [margin, setMargin] = useState(32);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);

  function chooseFiles(input: File[]) {
    const valid = input.filter((file) => file.type.startsWith("image/"));
    setError("");
    setResult(null);
    if (!valid.length) return setError("Upload JPG, PNG or WebP document photos.");
    setFiles(valid.slice(0, 40));
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  async function process() {
    if (!files.length) return setError("Upload document photos first.");
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const blob = await scannedImagesToPdf(files, { mode, pageSize, quality, margin });
      setResult({ blob, name: "formready-scanned-document.pdf" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create scanned PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ScanLine className="h-5 w-5 text-primary" />Document Scanner to PDF</CardTitle>
            <CardDescription>Turn mobile document photos into a clean A4 PDF for admission, scholarship and job forms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" multiple onFiles={chooseFiles} title="Upload document photos" description="Marksheets, certificates, ID proofs or receipts" />
            {!!files.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="mb-3 text-sm font-semibold">Pages</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${file.size}-${index}`} className="grid gap-2 rounded-xl bg-background px-3 py-2 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                      <span className="truncate">Page {index + 1}: {file.name}</span>
                      <span>{formatBytes(file.size)}</span>
                      <Button type="button" size="icon" variant="ghost" onClick={() => removeFile(index)} aria-label="Remove page"><Trash2 className="h-4 w-4" /></Button>
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
            <CardTitle>Scan settings</CardTitle>
            <CardDescription>Contrast mode is best for most phone camera document photos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Enhancement</Label><Select value={mode} onChange={(e) => setMode(e.target.value as ScanMode)}><option value="color">Color</option><option value="grayscale">Grayscale</option><option value="contrast">High contrast</option><option value="black-white">Black & white</option></Select></div>
              <div className="space-y-2"><Label>Page size</Label><Select value={pageSize} onChange={(e) => setPageSize(e.target.value as ScanPageSize)}><option value="a4">A4 PDF</option><option value="original">Original image size</option></Select></div>
              <div className="space-y-2"><Label>JPEG quality {Math.round(quality * 100)}%</Label><input aria-label="JPEG quality" type="range" min="0.45" max="0.92" step="0.01" value={quality} onChange={(e) => setQuality(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Margin</Label><Input type="number" min={0} value={margin} onChange={(e) => setMargin(Number(e.target.value))} /></div>
            </div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Create scanned PDF</Button>
            {result && (
              <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                <div className="flex items-center justify-between gap-3"><span>Output size</span><strong>{formatBytes(result.blob.size)}</strong></div>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, result.name)}><Download className="mr-2 h-4 w-4" />Download scanned PDF</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
