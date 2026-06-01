"use client";

import { useState } from "react";
import { Download, Images, Loader2, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createPhotoSheet } from "@/lib/converters";
import { downloadBlob, formatBytes } from "@/lib/utils";

type SheetResult = Awaited<ReturnType<typeof createPhotoSheet>>;

const presets = [
  { label: "India passport style 35×45mm", width: 35, height: 45, copies: 8 },
  { label: "Square visa/photo 51×51mm", width: 51, height: 51, copies: 6 },
  { label: "Small form photo 30×40mm", width: 30, height: 40, copies: 12 },
  { label: "Stamp size 25×30mm", width: 25, height: 30, copies: 20 }
];

export function PassportPhotoSheet() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(35);
  const [height, setHeight] = useState(45);
  const [copies, setCopies] = useState(8);
  const [page, setPage] = useState<"a4" | "4x6">("a4");
  const [gapMm, setGapMm] = useState(4);
  const [dpi, setDpi] = useState(220);
  const [background, setBackground] = useState<"white" | "light-gray">("white");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SheetResult | null>(null);

  function chooseFile(input: File[]) {
    setError("");
    setResult(null);
    const selected = input[0];
    if (!selected || !selected.type.startsWith("image/")) return setError("Upload a JPG, PNG or WebP photo.");
    setFile(selected);
  }

  function applyPreset(value: string) {
    const preset = presets.find((item) => item.label === value);
    if (!preset) return;
    setWidth(preset.width);
    setHeight(preset.height);
    setCopies(preset.copies);
  }

  async function process() {
    if (!file) return setError("Upload a photo first.");
    setBusy(true);
    setError("");
    try {
      setResult(await createPhotoSheet(file, { photoWidthMm: width, photoHeightMm: height, page, copies, gapMm, dpi, background }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo sheet creation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Images className="h-5 w-5 text-primary" />Passport Photo Sheet Maker</CardTitle>
            <CardDescription>Create printable A4 or 4×6 sheets with multiple passport/form photos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={chooseFile} title="Upload single photo" description="Use a clean front-facing photo for best results" />
            {file && <div className="rounded-2xl border bg-muted/20 p-4 text-sm"><p className="font-medium">Selected: {file.name}</p><p className="mt-1 text-muted-foreground">{formatBytes(file.size)} · processed on this device</p></div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            {result && (
              <div className="rounded-2xl border bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.previewUrl} alt="Photo sheet preview" className="mx-auto max-h-[560px] w-full object-contain" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sheet settings</CardTitle>
            <CardDescription>Choose common Indian form photo sizes or enter custom millimeters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Preset</Label><Select onChange={(e) => applyPreset(e.target.value)} defaultValue={presets[0].label}>{presets.map((preset) => <option key={preset.label}>{preset.label}</option>)}</Select></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Photo width mm</Label><Input type="number" min={10} value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Photo height mm</Label><Input type="number" min={10} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Copies</Label><Input type="number" min={1} max={40} value={copies} onChange={(e) => setCopies(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Gap mm</Label><Input type="number" min={1} max={15} value={gapMm} onChange={(e) => setGapMm(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Page</Label><Select value={page} onChange={(e) => setPage(e.target.value as typeof page)}><option value="a4">A4 print sheet</option><option value="4x6">4×6 photo paper</option></Select></div>
              <div className="space-y-2"><Label>Quality DPI</Label><Select value={dpi} onChange={(e) => setDpi(Number(e.target.value))}><option value={180}>Light</option><option value={220}>Balanced</option><option value={300}>Print sharp</option></Select></div>
              <div className="space-y-2 sm:col-span-2"><Label>Sheet background</Label><Select value={background} onChange={(e) => setBackground(e.target.value as typeof background)}><option value="white">White</option><option value="light-gray">Light gray guide background</option></Select></div>
            </div>
            <Button className="w-full" size="lg" onClick={process} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Create photo sheet</Button>
            {result && (
              <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                <p className="font-semibold">Generated {result.copies} copies · {result.columns} columns · {result.rows} rows</p>
                <p className="mt-1 text-muted-foreground">JPG: {formatBytes(result.imageBlob.size)} · PDF: {formatBytes(result.pdfBlob.size)}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2"><Button variant="secondary" onClick={() => downloadBlob(result.imageBlob, "formready-photo-sheet.jpg")}><Download className="mr-2 h-4 w-4" />Download JPG</Button><Button variant="dark" onClick={() => downloadBlob(result.pdfBlob, "formready-photo-sheet.pdf")}><Download className="mr-2 h-4 w-4" />Download PDF</Button></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
