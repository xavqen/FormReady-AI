"use client";

import { useState } from "react";
import { Download, FileStack, Loader2, MoveDown, MoveUp, Trash2, Wand2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type PageItem = { page: number; keep: boolean };

function move<T>(items: T[], from: number, to: number) {
  const copy = [...items];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export function PdfOrganizer() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Blob | null>(null);
  const [range, setRange] = useState("");

  async function pick(files: File[]) {
    const next = files[0];
    setFile(null); setPages([]); setResult(null); setError(""); setRange("");
    if (!next) return;
    if (next.type !== "application/pdf") return setError("Upload a PDF file.");
    setBusy(true);
    try {
      const pdf = await PDFDocument.load(await next.arrayBuffer(), { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setFile(next);
      setPages(Array.from({ length: count }, (_, index) => ({ page: index + 1, keep: true })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this PDF.");
    } finally {
      setBusy(false);
    }
  }

  function applyRange() {
    if (!range.trim()) return;
    const selected = new Set<number>();
    range.split(",").map((part) => part.trim()).filter(Boolean).forEach((part) => {
      const [startText, endText] = part.split("-");
      const start = Number(startText);
      const end = Number(endText ?? startText);
      if (!Number.isFinite(start) || !Number.isFinite(end)) return;
      for (let page = Math.min(start, end); page <= Math.max(start, end); page++) selected.add(page);
    });
    setPages((prev) => prev.map((item) => ({ ...item, keep: selected.has(item.page) })));
  }

  async function exportPdf() {
    if (!file) return setError("Upload a PDF first.");
    const kept = pages.filter((item) => item.keep);
    if (!kept.length) return setError("Keep at least one page.");
    setBusy(true); setError(""); setResult(null);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, kept.map((item) => item.page - 1));
      copied.forEach((page) => out.addPage(page));
      const bytes = await out.save({ useObjectStreams: true });
      // Line 71: const bytes = await out.save({ useObjectStreams: true });
      setResult(new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF organize failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileStack className="h-5 w-5 text-primary" />PDF Page Organizer</CardTitle>
            <CardDescription>Remove, reorder and export selected pages from a PDF without uploading it to a server.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="application/pdf" onFiles={pick} title="Upload PDF" description={file ? `${file.name} · ${formatBytes(file.size)}` : "Select one PDF file"} />
            {busy && <div className="rounded-xl border bg-muted/20 p-3 text-sm text-muted-foreground">Reading PDF...</div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            <div className="grid gap-3 rounded-2xl border p-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2"><Label>Keep page range</Label><Input placeholder="Example: 1-3,5,8" value={range} onChange={(e) => setRange(e.target.value)} /></div>
              <Button className="self-end" variant="secondary" onClick={applyRange} disabled={!pages.length}>Apply range</Button>
            </div>
            <Button className="w-full" size="lg" onClick={exportPdf} disabled={!file || busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Export organized PDF</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>{pages.length ? `${pages.filter((item) => item.keep).length}/${pages.length} pages selected` : "Upload a PDF to see page controls."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-[460px] space-y-2 overflow-y-auto pr-1">
              {pages.map((item, index) => (
                <div key={`${item.page}-${index}`} className="flex items-center gap-2 rounded-xl border bg-muted/20 p-2">
                  <button aria-label={`Toggle page ${item.page}`} className={`h-9 flex-1 rounded-lg px-3 text-left text-sm font-medium ${item.keep ? "bg-background" : "bg-red-500/10 text-red-600 line-through"}`} onClick={() => setPages((prev) => prev.map((row, i) => i === index ? { ...row, keep: !row.keep } : row))}>Page {item.page}</button>
                  <Button size="icon" variant="ghost" disabled={index === 0} onClick={() => setPages((prev) => move(prev, index, index - 1))}><MoveUp className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" disabled={index === pages.length - 1} onClick={() => setPages((prev) => move(prev, index, index + 1))}><MoveDown className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => setPages((prev) => prev.map((row, i) => i === index ? { ...row, keep: false } : row))}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              ))}
            </div>
            {result && file && (
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm text-muted-foreground">Before {formatBytes(file.size)} → After {formatBytes(result.size)}</p>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result, cleanFileName(file.name, "organized", "pdf"))}><Download className="mr-2 h-4 w-4" />Download organized PDF</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
