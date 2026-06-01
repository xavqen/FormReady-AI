"use client";

import { useState } from "react";
import { CheckCircle2, Download, Loader2, ShieldCheck, XCircle, Wand2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { allPresets } from "@/lib/presets";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";
import { loadImage } from "@/lib/image";
import { compressPdfToTarget } from "@/lib/pdf";
import { resizeImageToBlob } from "@/lib/image";

type CheckRow = { label: string; status: "pass" | "fail" | "warn"; value: string };

export function FileChecker() {
  const [presetSlug, setPresetSlug] = useState(allPresets[0].slug);
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<CheckRow[]>([]);
  const [summary, setSummary] = useState("Upload a file to check it.");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);

  const preset = allPresets.find((item) => item.slug === presetSlug) ?? allPresets[0];

  async function check(files: File[]) {
    const next = files[0];
    if (!next) return;
    setFile(next); setResult(null); setBusy(true);
    try {
      const newRows: CheckRow[] = [];
      const sizeKb = next.size / 1024;
      const isImage = next.type.startsWith("image/");
      const isPdf = next.type === "application/pdf";
      const allowed = preset.formats.some((f) => next.type.toLowerCase().includes(f.toLowerCase().replace("jpg", "jpeg"))) || (preset.formats.includes("JPG") && next.type === "image/jpeg") || (preset.formats.includes("PDF") && isPdf);
      newRows.push({ label: "File type", status: allowed ? "pass" : "fail", value: next.type || "Unknown" });
      newRows.push({ label: "File size", status: sizeKb <= preset.maxKb && (!preset.minKb || sizeKb >= preset.minKb) ? "pass" : "fail", value: formatBytes(next.size) });

      if (isImage) {
        const info = await loadImage(next);
        const dimsOk = !preset.width || !preset.height || (info.width === preset.width && info.height === preset.height);
        newRows.push({ label: "Dimensions", status: dimsOk ? "pass" : "fail", value: `${info.width}×${info.height}px` });
      } else if (isPdf) {
        newRows.push({ label: "PDF", status: preset.kind === "document" ? "pass" : "warn", value: preset.kind === "document" ? "Document preset" : "Photo preset selected" });
      } else {
        newRows.push({ label: "Readable", status: "fail", value: "Unsupported file" });
      }
      setRows(newRows);
      const failed = newRows.filter((r) => r.status === "fail");
      const warned = newRows.filter((r) => r.status === "warn");
      setSummary(failed.length ? "Needs resize or format fix" : warned.length ? "Check selected preset" : "Passed");
    } catch (err) {
      setSummary(err instanceof Error ? err.message : "File check failed.");
      setRows([]);
    } finally {
      setBusy(false);
    }
  }

  async function oneClickFix() {
    if (!file) return;
    setBusy(true); setResult(null);
    try {
      if (file.type.startsWith("image/")) {
        const info = await loadImage(file);
        const blob = await resizeImageToBlob(info.dataUrl, {
          width: preset.width ?? 300,
          height: preset.height ?? 300,
          targetKb: preset.maxKb,
          format: "image/jpeg",
          background: "white",
          zoom: 1,
          offsetX: 0,
          offsetY: 0
        });
        setResult({ blob, name: cleanFileName(file.name, preset.slug, "jpg") });
      } else if (file.type === "application/pdf") {
        const output = await compressPdfToTarget(file, preset.maxKb);
        setResult({ blob: output.blob, name: cleanFileName(file.name, preset.slug, "pdf") });
      } else {
        setSummary("This file type cannot be auto-fixed yet.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />AI File Checker</CardTitle>
            <CardDescription>Checks file type, file size, image dimensions and whether it matches a selected preset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2"><Label>Select form preset</Label><Select value={presetSlug} onChange={(e) => setPresetSlug(e.target.value)}>{allPresets.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}</Select></div>
            <UploadZone accept="image/jpeg,image/png,image/webp,application/pdf" onFiles={check} title="Upload file to check" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Check result</CardTitle>
            <CardDescription>{preset.title}: max {preset.maxKb}KB {preset.width && preset.height ? `· ${preset.width}×${preset.height}px` : ""}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border bg-muted/20 p-4">
              <div className="flex items-center gap-2 font-semibold">{summary === "Passed" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-amber-500" />}{summary}</div>
              {busy && <p className="mt-2 text-sm text-muted-foreground">Checking...</p>}
            </div>
            <div className="space-y-2">
              {rows.map((row) => <div key={row.label} className="flex items-center justify-between gap-3 rounded-xl border p-3 text-sm"><span>{row.label}</span><span className={row.status === "pass" ? "text-emerald-600" : row.status === "warn" ? "text-amber-600" : "text-red-600"}>{row.value}</span></div>)}
            </div>
            <Button className="w-full" size="lg" onClick={oneClickFix} disabled={!file || busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}One-click fix</Button>
            {result && <Button className="w-full" variant="dark" onClick={() => downloadBlob(result.blob, result.name)}><Download className="mr-2 h-4 w-4" />Download fixed file</Button>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
