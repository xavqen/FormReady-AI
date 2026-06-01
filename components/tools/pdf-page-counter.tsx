"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Layers3, Loader2, SplitSquareHorizontal } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";

type PdfResult = {
  file: File;
  pages: number;
  sizePerPage: number;
  encrypted: boolean;
  suggestion: string;
};

export function PdfPageCounter() {
  const [results, setResults] = useState<PdfResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function inspect(files: File[]) {
    const pdfs = files.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
    if (!pdfs.length) return setError("Upload PDF files only.");
    setBusy(true);
    setError("");
    try {
      const next: PdfResult[] = [];
      for (const file of pdfs.slice(0, 20)) {
        const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
        const pages = pdf.getPageCount();
        const sizePerPage = file.size / Math.max(1, pages);
        const encrypted = false;
        let suggestion = "Looks upload-friendly. Use checker for exact portal rule.";
        if (file.size > 1024 * 1024) suggestion = "Large PDF: compress before uploading.";
        if (pages > 10) suggestion = "Many pages: split only required pages if portal limit is strict.";
        next.push({ file, pages, sizePerPage, encrypted, suggestion });
      }
      setResults(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read this PDF.");
    } finally {
      setBusy(false);
    }
  }

  const totalPages = results.reduce((sum, result) => sum + result.pages, 0);
  const totalSize = results.reduce((sum, result) => sum + result.file.size, 0);

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Layers3 className="h-5 w-5 text-primary" />PDF Page Counter</CardTitle>
            <CardDescription>Check PDF page count, total size and size per page before uploading to forms or job portals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone multiple accept="application/pdf" onFiles={inspect} title="Upload PDF files" description="No server upload, browser-side inspection" />
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-muted/20 p-4"><p className="text-sm text-muted-foreground">Total pages</p><p className="mt-1 text-2xl font-bold">{totalPages}</p></div>
              <div className="rounded-2xl border bg-muted/20 p-4"><p className="text-sm text-muted-foreground">Total size</p><p className="mt-1 text-2xl font-bold">{formatBytes(totalSize)}</p></div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row"><Button asChild variant="secondary"><Link href="/pdf-compress">Compress PDF</Link></Button><Button asChild variant="secondary"><Link href="/pdf-split">Split PDF</Link></Button></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PDF details</CardTitle>
            <CardDescription>{busy ? "Reading PDF..." : results.length ? `${results.length} PDF result${results.length === 1 ? "" : "s"}` : "Upload PDFs to inspect them."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {busy && <div className="flex items-center justify-center rounded-2xl border border-dashed p-8 text-sm text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading page count...</div>}
            {!busy && !results.length && <div className="rounded-2xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">Page count and file size summary will appear here.</div>}
            {results.map((result) => (
              <div key={result.file.name} className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{result.file.name}</p>
                    <div className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3"><span>{result.pages} pages</span><span>{formatBytes(result.file.size)}</span><span>{formatBytes(result.sizePerPage)}/page</span></div>
                    <p className="mt-2 text-xs text-muted-foreground">{result.suggestion}</p>
                    {result.pages > 1 && <Button asChild className="mt-3" size="sm" variant="secondary"><Link href="/pdf-organize"><SplitSquareHorizontal className="mr-2 h-4 w-4" />Organize pages</Link></Button>}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
