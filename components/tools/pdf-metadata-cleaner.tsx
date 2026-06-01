"use client";

import { useState } from "react";
import { Download, FileCheck2, Loader2, Shield, Wand2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type CleanedPdf = { blob: Blob; name: string; pages: number; before: number; after: number };

export function PdfMetadataCleaner() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CleanedPdf | null>(null);

  function pickFile(files: File[]) {
    const next = files[0];
    setError("");
    setResult(null);
    if (!next || !(next.type === "application/pdf" || next.name.toLowerCase().endsWith(".pdf"))) return setError("Upload a PDF file.");
    setFile(next);
  }

  async function cleanPdf() {
    if (!file) return setError("Upload a PDF first.");
    setBusy(true);
    setError("");
    try {
      const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const pages = await out.copyPages(source, source.getPageIndices());
      pages.forEach((page) => out.addPage(page));
      out.setTitle("FormReady AI cleaned PDF");
      out.setAuthor("FormReady AI");
      out.setSubject("");
      out.setKeywords([]);
      out.setProducer("FormReady AI");
      out.setCreator("FormReady AI");
      out.setCreationDate(new Date());
      out.setModificationDate(new Date());
      const bytes = await out.save({ useObjectStreams: true });
      // Line 44: const bytes = await out.save({ useObjectStreams: true });
      const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      setResult({ blob, name: cleanFileName(file.name, "metadata-cleaned", "pdf"), pages: source.getPageCount(), before: file.size, after: blob.size });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not clean PDF metadata.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />PDF Metadata Cleaner</CardTitle>
            <CardDescription>Rebuild a PDF and reset common document info before uploading certificates, resumes or ID documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="application/pdf" onFiles={pickFile} title="Upload PDF" description="Processed locally in the browser" />
            {file && <div className="rounded-2xl border bg-muted/20 p-4 text-sm"><FileCheck2 className="mb-2 h-5 w-5 text-primary" /><p className="font-medium">{file.name}</p><p className="mt-1 text-muted-foreground">Original size: {formatBytes(file.size)}</p></div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            <Button className="w-full" size="lg" onClick={cleanPdf} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Clean PDF metadata</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cleaned output</CardTitle>
            <CardDescription>This removes common document info fields. It is not a forensic privacy guarantee.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!result && <div className="rounded-2xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">Cleaned PDF result will appear here.</div>}
            {result && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="font-semibold">{result.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{result.pages} pages · {formatBytes(result.before)} → {formatBytes(result.after)}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Pages copied into a fresh PDF container.</li>
                  <li>Title, author, subject, keywords and creator fields reset.</li>
                  <li>File stays in your browser during processing.</li>
                </ul>
                <Button className="mt-5 w-full" variant="dark" onClick={() => downloadBlob(result.blob, result.name)}><Download className="mr-2 h-4 w-4" />Download cleaned PDF</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
