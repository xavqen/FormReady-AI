"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ImageIcon, Loader2, ScanSearch, XCircle } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadImage } from "@/lib/image";
import { formatBytes } from "@/lib/utils";

type Result = {
  file: File;
  width: number;
  height: number;
  ratio: string;
  status: "Passed" | "Needs resize";
  notes: string[];
};

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function ratioLabel(width: number, height: number) {
  const divisor = gcd(width, height) || 1;
  return `${Math.round(width / divisor)}:${Math.round(height / divisor)}`;
}

const presets = [
  { label: "Scholarship 200×230 / 50KB", width: 200, height: 230, kb: 50 },
  { label: "Exam 300×400 / 100KB", width: 300, height: 400, kb: 100 },
  { label: "Signature 300×100 / 20KB", width: 300, height: 100, kb: 20 },
  { label: "NEET/JEE 600×800 / 200KB", width: 600, height: 800, kb: 200 }
];

export function ImageDimensionChecker() {
  const [requiredWidth, setRequiredWidth] = useState(300);
  const [requiredHeight, setRequiredHeight] = useState(400);
  const [maxKb, setMaxKb] = useState(100);
  const [results, setResults] = useState<Result[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function checkFiles(files: File[]) {
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (!images.length) return setError("Upload JPG, PNG or WebP images.");
    setBusy(true);
    setError("");
    try {
      const next: Result[] = [];
      for (const file of images.slice(0, 30)) {
        const image = await loadImage(file);
        const notes: string[] = [];
        const sizeOk = file.size <= maxKb * 1024;
        const widthOk = image.width === requiredWidth;
        const heightOk = image.height === requiredHeight;
        if (!widthOk || !heightOk) notes.push(`Needs ${requiredWidth}×${requiredHeight}px`);
        if (!sizeOk) notes.push(`Needs under ${maxKb}KB`);
        if (!/jpe?g|png|webp/i.test(file.type)) notes.push("Use JPG, PNG or WebP");
        next.push({ file, width: image.width, height: image.height, ratio: ratioLabel(image.width, image.height), status: notes.length ? "Needs resize" : "Passed", notes: notes.length ? notes : ["Ready for this rule"] });
      }
      setResults(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not check image dimensions.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ScanSearch className="h-5 w-5 text-primary" />Image Dimension Checker</CardTitle>
            <CardDescription>Check pixel size, aspect ratio and KB before uploading photos or signatures to online forms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone multiple accept="image/jpeg,image/png,image/webp" onFiles={checkFiles} title="Upload images to check" description="JPG, PNG or WebP" />
            <div className="grid gap-3 rounded-2xl border p-4 sm:grid-cols-3">
              <div className="space-y-2"><Label>Required width px</Label><Input type="number" min={1} value={requiredWidth} onChange={(event) => setRequiredWidth(Number(event.target.value) || 1)} /></div>
              <div className="space-y-2"><Label>Required height px</Label><Input type="number" min={1} value={requiredHeight} onChange={(event) => setRequiredHeight(Number(event.target.value) || 1)} /></div>
              <div className="space-y-2"><Label>Max file size KB</Label><Input type="number" min={1} value={maxKb} onChange={(event) => setMaxKb(Number(event.target.value) || 1)} /></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => <Button key={preset.label} type="button" size="sm" variant="secondary" onClick={() => { setRequiredWidth(preset.width); setRequiredHeight(preset.height); setMaxKb(preset.kb); }}>{preset.label}</Button>)}
            </div>
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            <div className="rounded-2xl border bg-muted/20 p-4 text-sm leading-6 text-muted-foreground">Tip: exact pixel mismatch is the most common reason photos/signatures are rejected even when file size is correct.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check result</CardTitle>
            <CardDescription>{busy ? "Checking images..." : results.length ? `${results.length} image result${results.length === 1 ? "" : "s"}` : "Results will appear here."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {busy && <div className="flex items-center justify-center rounded-2xl border border-dashed p-8 text-sm text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading image details...</div>}
            {!busy && !results.length && <div className="rounded-2xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">Upload an image to check dimensions and KB.</div>}
            {results.map((result) => (
              <div key={result.file.name} className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <ImageIcon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2"><p className="truncate font-semibold">{result.file.name}</p><span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${result.status === "Passed" ? "text-emerald-600 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300"}`}>{result.status === "Passed" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}{result.status}</span></div>
                    <p className="mt-1 text-sm text-muted-foreground">{result.width}×{result.height}px · {result.ratio} ratio · {formatBytes(result.file.size)}</p>
                    <ul className="mt-2 list-inside list-disc text-xs text-muted-foreground">{result.notes.map((note) => <li key={note}>{note}</li>)}</ul>
                  </div>
                </div>
              </div>
            ))}
            {results.some((result) => result.status !== "Passed") && <Button asChild className="w-full" variant="dark"><Link href="/photo-resize">Fix image now</Link></Button>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
