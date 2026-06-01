"use client";

import { useMemo, useState } from "react";
import { Calculator, ImageIcon, Printer, Ruler } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadImage } from "@/lib/image";
import { formatBytes } from "@/lib/utils";

function round(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

export function PhotoPrintSizeCalculator() {
  const [file, setFile] = useState<File | null>(null);
  const [widthPx, setWidthPx] = useState(600);
  const [heightPx, setHeightPx] = useState(800);
  const [dpi, setDpi] = useState(300);
  const [targetCmW, setTargetCmW] = useState(3.5);
  const [targetCmH, setTargetCmH] = useState(4.5);
  const [error, setError] = useState("");

  async function chooseFile(files: File[]) {
    const next = files[0];
    setError("");
    if (!next || !next.type.startsWith("image/")) return setError("Upload a JPG, PNG or WebP image.");
    try {
      const info = await loadImage(next);
      setFile(next);
      setWidthPx(info.width);
      setHeightPx(info.height);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read image.");
    }
  }

  const output = useMemo(() => {
    const inchW = widthPx / dpi;
    const inchH = heightPx / dpi;
    const cmW = inchW * 2.54;
    const cmH = inchH * 2.54;
    const requiredW = Math.round((targetCmW / 2.54) * dpi);
    const requiredH = Math.round((targetCmH / 2.54) * dpi);
    return { inchW, inchH, cmW, cmH, requiredW, requiredH };
  }, [widthPx, heightPx, dpi, targetCmW, targetCmH]);

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Printer className="h-5 w-5 text-primary" />Photo Print Size Calculator</CardTitle>
            <CardDescription>Convert image pixels to print size in cm/inch and calculate required pixels for passport or ID photos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={chooseFile} title="Upload photo optional" description="Auto-fill pixel size from your image" />
            {file && <div className="rounded-2xl border bg-muted/20 p-4 text-sm"><ImageIcon className="mb-2 h-5 w-5 text-primary" /><p className="font-medium">{file.name}</p><p className="text-muted-foreground">{formatBytes(file.size)} · {widthPx}×{heightPx}px</p></div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2"><Label>Width px</Label><Input type="number" min={1} value={widthPx} onChange={(event) => setWidthPx(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Height px</Label><Input type="number" min={1} value={heightPx} onChange={(event) => setHeightPx(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>DPI/PPI</Label><Input type="number" min={72} value={dpi} onChange={(event) => setDpi(Number(event.target.value))} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Results</CardTitle>
            <CardDescription>300 DPI is commonly used for sharp print photos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-muted/20 p-4"><p className="text-sm text-muted-foreground">Print size</p><p className="mt-2 text-2xl font-bold">{round(output.cmW)} × {round(output.cmH)} cm</p><p className="text-sm text-muted-foreground">{round(output.inchW)} × {round(output.inchH)} inch</p></div>
              <div className="rounded-2xl border bg-muted/20 p-4"><p className="text-sm text-muted-foreground">Aspect ratio</p><p className="mt-2 text-2xl font-bold">{round(widthPx / heightPx)}:1</p><p className="text-sm text-muted-foreground">Use crop tool if portal asks exact ratio.</p></div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="mb-3 flex items-center gap-2"><Ruler className="h-4 w-4 text-primary" /><p className="font-semibold">Required pixels for target print size</p></div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-2"><Label>Width cm</Label><Input type="number" step="0.1" value={targetCmW} onChange={(event) => setTargetCmW(Number(event.target.value))} /></div>
                <div className="space-y-2"><Label>Height cm</Label><Input type="number" step="0.1" value={targetCmH} onChange={(event) => setTargetCmH(Number(event.target.value))} /></div>
                <div className="space-y-2"><Label>DPI</Label><Input type="number" min={72} value={dpi} onChange={(event) => setDpi(Number(event.target.value))} /></div>
              </div>
              <div className="mt-4 rounded-xl bg-muted/30 p-3 text-sm"><strong>{output.requiredW} × {output.requiredH}px</strong> needed for {targetCmW}×{targetCmH} cm at {dpi} DPI.</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
