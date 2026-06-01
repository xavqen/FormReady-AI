"use client";

import { useState } from "react";
import { Archive, Download, FileArchive, Loader2, Trash2, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compressPdfToTarget } from "@/lib/pdf";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type Output = { name: string; blob: Blob; before: number; after: number; note: string; hitTarget: boolean };

export function BulkPdfCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetKb, setTargetKb] = useState(500);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);

  function pickFiles(nextFiles: File[]) {
    setError("");
    setOutputs([]);
    const pdfs = nextFiles.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
    if (!pdfs.length) return setError("Upload one or more PDF files.");
    setFiles((prev) => [...prev, ...pdfs].slice(0, 15));
  }

  async function compressAll() {
    if (!files.length) return setError("Upload PDFs first.");
    setBusy(true);
    setError("");
    setOutputs([]);
    const next: Output[] = [];
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setStatus(`Compressing ${index + 1} of ${files.length}: ${file.name}`);
        const result = await compressPdfToTarget(file, targetKb);
        next.push({
          name: cleanFileName(file.name, `${targetKb}kb`, "pdf"),
          blob: result.blob,
          before: file.size,
          after: result.blob.size,
          note: result.note,
          hitTarget: result.hitTarget
        });
        setOutputs([...next]);
      }
      setStatus("Done. Download files separately or as one ZIP.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not compress PDFs.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    if (!outputs.length) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    outputs.forEach((item) => zip.file(item.name, item.blob));
    zip.file("compression-report.txt", outputs.map((item) => `${item.name}: ${formatBytes(item.before)} -> ${formatBytes(item.after)} · ${item.note}`).join("\n"));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `formready-bulk-pdf-${targetKb}kb.zip`);
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileArchive className="h-5 w-5 text-primary" />Bulk PDF Compress</CardTitle>
            <CardDescription>Compress multiple scanned PDFs for admission, scholarship and job portals, then download a ZIP.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="application/pdf" multiple onFiles={pickFiles} title="Upload PDFs" description="Up to 15 files · processed in this browser" />
            <div className="grid gap-3 rounded-2xl border p-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2"><Label>Target KB per PDF</Label><Input type="number" min={80} value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))} /></div>
              <div className="flex flex-wrap items-end gap-2">{[100, 200, 500, 1024].map((kb) => <Button key={kb} type="button" variant="secondary" size="sm" onClick={() => setTargetKb(kb)}>{kb === 1024 ? "1MB" : `${kb}KB`}</Button>)}</div>
            </div>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl border bg-muted/20 p-3 text-sm">
                  <span className="min-w-0 truncate">{file.name} · {formatBytes(file.size)}</span>
                  <Button size="sm" variant="ghost" onClick={() => setFiles((prev) => prev.filter((item) => item !== file))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            {status && <div className="rounded-xl border bg-muted/20 p-3 text-sm text-muted-foreground">{status}</div>}
            <Button className="w-full" size="lg" onClick={compressAll} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Compress all PDFs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compressed PDFs</CardTitle>
            <CardDescription>Exact KB cannot be guaranteed for every PDF without unreadable quality loss.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!outputs.length && <div className="rounded-2xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">Compressed PDFs will appear here.</div>}
            {outputs.map((item) => (
              <div key={item.name} className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatBytes(item.before)} → {formatBytes(item.after)} · {item.hitTarget ? "Target hit" : "Best effort"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => downloadBlob(item.blob, item.name)}><Download className="mr-1 h-4 w-4" />PDF</Button>
                </div>
              </div>
            ))}
            {outputs.length > 1 && <Button className="w-full" variant="dark" onClick={downloadZip}><Archive className="mr-2 h-4 w-4" />Download ZIP</Button>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
