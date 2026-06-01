"use client";

import { useState } from "react";
import { Download, FileText, Loader2, RotateCw, Sparkles } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

function parsePageRange(input: string, total: number) {
  if (!input.trim() || input.trim().toLowerCase() === "all") return Array.from({ length: total }, (_, index) => index);
  const pages = new Set<number>();
  for (const part of input.split(",")) {
    const clean = part.trim();
    if (!clean) continue;
    if (clean.includes("-")) {
      const [startRaw, endRaw] = clean.split("-").map((value) => Number(value.trim()));
      const start = Math.max(1, Math.min(total, startRaw));
      const end = Math.max(start, Math.min(total, endRaw));
      for (let page = start; page <= end; page++) pages.add(page - 1);
    } else {
      const page = Number(clean);
      if (Number.isFinite(page) && page >= 1 && page <= total) pages.add(page - 1);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function PdfRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [range, setRange] = useState("all");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string; pages: number; changed: number } | null>(null);

  function chooseFile(files: File[]) {
    setError("");
    setResult(null);
    const next = files[0];
    if (!next || next.type !== "application/pdf") return setError("Upload a PDF file only.");
    setFile(next);
  }

  async function rotate() {
    if (!file) return setError("Upload a PDF first.");
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const total = pdf.getPageCount();
      const pages = parsePageRange(range, total);
      if (!pages.length) throw new Error("No valid pages found. Use all, 1-3, or 1,3,5 format.");
      for (const index of pages) {
        const page = pdf.getPage(index);
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle + 360) % 360));
      }
      const bytes = await pdf.save({ useObjectStreams: true });
      // Line 64: const bytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      setResult({ blob, name: cleanFileName(file.name, `rotated-${angle}`, "pdf"), pages: total, changed: pages.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not rotate PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><RotateCw className="h-5 w-5 text-primary" />PDF Rotate Tool</CardTitle>
            <CardDescription>Rotate all pages or selected pages before uploading scanned documents to a portal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="application/pdf" onFiles={chooseFile} title="Upload PDF" description="PDF accepted" />
            {file && <div className="rounded-2xl border bg-muted/20 p-4 text-sm"><FileText className="mb-2 h-5 w-5 text-primary" /><p className="font-medium">{file.name}</p><p className="text-muted-foreground">{formatBytes(file.size)}</p></div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rotation settings</CardTitle>
            <CardDescription>Use page ranges like all, 1-3, 5, or 1,3,5.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Rotate by</Label><Select value={angle} onChange={(event) => setAngle(Number(event.target.value))}><option value={90}>90° clockwise</option><option value={180}>180°</option><option value={270}>270° clockwise</option><option value={-90}>90° anti-clockwise</option></Select></div>
              <div className="space-y-2"><Label>Pages</Label><Input value={range} onChange={(event) => setRange(event.target.value)} placeholder="all or 1-3,5" /></div>
            </div>
            <Button className="w-full" size="lg" onClick={rotate} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}Rotate PDF</Button>
            {result && (
              <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                <p className="font-medium">Rotated {result.changed} of {result.pages} page{result.pages > 1 ? "s" : ""}.</p>
                <p className="mt-1 text-muted-foreground">Output size: {formatBytes(result.blob.size)}</p>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, result.name)}><Download className="mr-2 h-4 w-4" />Download rotated PDF</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
