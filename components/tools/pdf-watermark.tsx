"use client";

import { useState } from "react";
import { Download, FileText, Loader2, Stamp, Wand2 } from "lucide-react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

export function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("Submitted Copy");
  const [size, setSize] = useState(42);
  const [opacity, setOpacity] = useState(0.18);
  const [placement, setPlacement] = useState<"diagonal" | "top" | "bottom">("diagonal");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string; pages: number } | null>(null);

  function chooseFile(files: File[]) {
    setError("");
    setResult(null);
    const next = files[0];
    if (!next || next.type !== "application/pdf") return setError("Upload a PDF file only.");
    setFile(next);
  }

  async function addWatermark() {
    if (!file) return setError("Upload a PDF first.");
    if (!text.trim()) return setError("Enter watermark text.");
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, size);
        const diagonal = placement === "diagonal";
        const x = diagonal ? (width - textWidth) / 2 : Math.max(24, (width - textWidth) / 2);
        const y = placement === "top" ? height - size - 34 : placement === "bottom" ? 34 : height / 2;
        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0.15, 0.15, 0.15),
          opacity,
          rotate: diagonal ? degrees(-35) : degrees(0)
        });
      }
      const bytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([bytes as Uint8Array<ArrayBuffer>], { type: "application/pdf" });
      setResult({ blob, name: cleanFileName(file.name, "watermarked", "pdf"), pages: pages.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add watermark.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Stamp className="h-5 w-5 text-primary" />PDF Watermark Tool</CardTitle>
            <CardDescription>Add text such as Submitted Copy, Self Attested or For Admission Use before sharing a PDF.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="application/pdf" onFiles={chooseFile} title="Upload PDF" description="PDF accepted" />
            {file && <div className="rounded-2xl border bg-muted/20 p-4 text-sm"><FileText className="mb-2 h-5 w-5 text-primary" /><p className="font-medium">{file.name}</p><p className="text-muted-foreground">{formatBytes(file.size)}</p></div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Watermark settings</CardTitle>
            <CardDescription>Keep opacity low so scanned text stays readable.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Watermark text</Label><Input value={text} onChange={(event) => setText(event.target.value)} /></div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2"><Label>Size</Label><Input type="number" min={12} max={120} value={size} onChange={(event) => setSize(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Opacity</Label><Input type="number" min={0.05} max={0.9} step={0.05} value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Placement</Label><Select value={placement} onChange={(event) => setPlacement(event.target.value as typeof placement)}><option value="diagonal">Diagonal</option><option value="top">Top center</option><option value="bottom">Bottom center</option></Select></div>
            </div>
            <div className="flex flex-wrap gap-2">{["Submitted Copy", "Self Attested", "For Admission Use", "For Verification"].map((item) => <Button key={item} type="button" size="sm" variant="secondary" onClick={() => setText(item)}>{item}</Button>)}</div>
            <Button className="w-full" size="lg" onClick={addWatermark} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Add watermark</Button>
            {result && (
              <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                <p className="font-medium">Watermark added to {result.pages} page{result.pages > 1 ? "s" : ""}.</p>
                <p className="mt-1 text-muted-foreground">Output size: {formatBytes(result.blob.size)}</p>
                <Button className="mt-4 w-full" variant="dark" onClick={() => downloadBlob(result.blob, result.name)}><Download className="mr-2 h-4 w-4" />Download PDF</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
