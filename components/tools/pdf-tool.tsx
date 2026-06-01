"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Download, FileArchive, FileImage, FileStack, Loader2, Scissors, Sparkles, Trash2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { compressPdfToTarget, imagesToPdf, mergePdfs, pdfToImages, splitPdf } from "@/lib/pdf";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

export type PdfMode = "compress" | "merge" | "split" | "image-to-pdf" | "pdf-to-images";

const modeCopy = {
  compress: { icon: FileArchive, title: "PDF Compress Tool", desc: "Compress scanned PDFs under 100KB, 200KB, 500KB or 1MB." },
  merge: { icon: FileStack, title: "PDF Merge Tool", desc: "Merge multiple PDF files into one upload-ready document." },
  split: { icon: Scissors, title: "PDF Split Tool", desc: "Extract selected page range from a PDF." },
  "image-to-pdf": { icon: FileImage, title: "Image to PDF Tool", desc: "Convert JPG or PNG scans into a single PDF." },
  "pdf-to-images": { icon: FileImage, title: "PDF to Images Tool", desc: "Render PDF pages as JPG images in your browser." }
};

export function PdfTool({ mode, imageOnly = false }: { mode: PdfMode; imageOnly?: boolean }) {
  const copy = modeCopy[mode];
  const Icon = copy.icon;
  const [files, setFiles] = useState<File[]>([]);
  const [targetKb, setTargetKb] = useState(mode === "compress" ? 200 : 500);
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string; hitTarget?: boolean } | null>(null);
  const [images, setImages] = useState<{ blob: Blob; name: string }[]>([]);

  function chooseFiles(input: File[]) {
    setError(""); setMessage(""); setResult(null); setImages([]);
    const valid = input.filter((file) => mode === "image-to-pdf" ? file.type.startsWith("image/") : file.type === "application/pdf");
    if (!valid.length) return setError(mode === "image-to-pdf" ? "Upload JPG, PNG or WebP images." : "Upload PDF files only.");
    setFiles(valid);
  }

  function moveFile(index: number, direction: -1 | 1) {
    setFiles((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function run() {
    if (!files.length) return setError("Upload file first.");
    setBusy(true); setError(""); setMessage(""); setResult(null); setImages([]);
    try {
      if (mode === "compress") {
        const output = await compressPdfToTarget(files[0], targetKb);
        setResult({ blob: output.blob, name: cleanFileName(files[0].name, `compressed-${targetKb}kb`, "pdf"), hitTarget: output.hitTarget });
        setMessage(output.note);
      }
      if (mode === "merge") {
        if (files.length < 2) throw new Error("Upload at least 2 PDFs to merge.");
        const blob = await mergePdfs(files);
        setResult({ blob, name: "formready-merged.pdf" });
        setMessage(`Merged ${files.length} PDFs.`);
      }
      if (mode === "split") {
        const blob = await splitPdf(files[0], fromPage, toPage);
        setResult({ blob, name: cleanFileName(files[0].name, `pages-${fromPage}-${toPage}`, "pdf") });
        setMessage(`Extracted pages ${fromPage} to ${toPage}.`);
      }
      if (mode === "image-to-pdf") {
        const blob = await imagesToPdf(files, targetKb);
        setResult({ blob, name: imageOnly ? "formready-images.pdf" : "formready-image-to-pdf.pdf" });
        setMessage(`Converted ${files.length} image${files.length > 1 ? "s" : ""} to PDF.`);
      }
      if (mode === "pdf-to-images") {
        const out = await pdfToImages(files[0]);
        setImages(out);
        setMessage(`Converted ${out.length} page${out.length > 1 ? "s" : ""} to JPG images.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF processing failed.");
    } finally {
      setBusy(false);
    }
  }

  const accept = mode === "image-to-pdf" ? "image/jpeg,image/png,image/webp" : "application/pdf";
  const multiple = mode === "merge" || mode === "image-to-pdf";

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-primary" />{copy.title}</CardTitle>
            <CardDescription>{copy.desc} Files stay inside your browser.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept={accept} multiple={multiple} onFiles={chooseFiles} title={multiple ? "Upload files" : "Upload file"} description={mode === "image-to-pdf" ? "JPG, PNG, WebP accepted" : "PDF accepted"} />
            {!!files.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="mb-3 text-sm font-semibold">Selected files</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {files.map((file, index) => <div key={`${file.name}-${file.size}-${index}`} className="grid gap-2 rounded-xl bg-background px-3 py-2 sm:grid-cols-[1fr_auto_auto] sm:items-center"><span className="truncate">{index + 1}. {file.name}</span><span>{formatBytes(file.size)}</span><div className="flex gap-1"><Button type="button" size="icon" variant="ghost" onClick={() => moveFile(index, -1)} disabled={index === 0} aria-label="Move up"><ArrowUp className="h-4 w-4" /></Button><Button type="button" size="icon" variant="ghost" onClick={() => moveFile(index, 1)} disabled={index === files.length - 1} aria-label="Move down"><ArrowDown className="h-4 w-4" /></Button><Button type="button" size="icon" variant="ghost" onClick={() => removeFile(index)} aria-label="Remove file"><Trash2 className="h-4 w-4" /></Button></div></div>)}
                </div>
              </div>
            )}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing settings</CardTitle>
            <CardDescription>Choose target and download after processing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === "compress" && <div className="space-y-2"><Label>Compress under</Label><Select value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))}><option value={100}>100KB</option><option value={200}>200KB</option><option value={500}>500KB</option><option value={1024}>1MB</option></Select></div>}
            {mode === "image-to-pdf" && <div className="space-y-2"><Label>Quality target</Label><Select value={targetKb} onChange={(e) => setTargetKb(Number(e.target.value))}><option value={500}>Balanced</option><option value={1000}>High quality</option><option value={200}>Small file</option></Select></div>}
            {mode === "split" && <div className="grid gap-3 sm:grid-cols-2"><div className="space-y-2"><Label>From page</Label><Input type="number" min={1} value={fromPage} onChange={(e) => setFromPage(Number(e.target.value))} /></div><div className="space-y-2"><Label>To page</Label><Input type="number" min={1} value={toPage} onChange={(e) => setToPage(Number(e.target.value))} /></div></div>}
            <Button className="w-full" size="lg" onClick={run} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Process file</Button>
            {message && <div className="rounded-xl border bg-muted/30 p-3 text-sm text-muted-foreground">{message}</div>}
            {result && (
              <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                <div className="flex items-center justify-between gap-3"><span>Output size</span><strong>{formatBytes(result.blob.size)}</strong></div>
                {typeof result.hitTarget === "boolean" && <p className={result.hitTarget ? "mt-2 text-emerald-600" : "mt-2 text-amber-600"}>{result.hitTarget ? "Target passed" : "Best possible browser compression generated"}</p>}
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, result.name)}><Download className="mr-2 h-4 w-4" />Download file</Button>
              </div>
            )}
            {!!images.length && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">Download images</p>
                <div className="mt-3 grid gap-2">
                  {images.map((img) => <Button key={img.name} variant="secondary" onClick={() => downloadBlob(img.blob, img.name)}><Download className="mr-2 h-4 w-4" />{img.name}</Button>)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

