"use client";

import { useMemo, useState } from "react";
import { Archive, Download, FileText, Loader2, RefreshCcw, Sparkles, Trash2 } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { downloadBlob, formatBytes } from "@/lib/utils";

type Separator = "dash" | "underscore" | "none";
type CaseMode = "lower" | "upper" | "keep";

type RenameRow = {
  file: File;
  newName: string;
  status: "Ready" | "Shortened" | "Duplicate fixed";
};

function extensionOf(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() ?? "file" : "file";
}

function baseNameOf(name: string) {
  return name.replace(/\.[^/.]+$/, "");
}

function safeName(input: string, separator: Separator, caseMode: CaseMode) {
  const sep = separator === "dash" ? "-" : separator === "underscore" ? "_" : "";
  let name = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, sep)
    .replace(/^[-_]+|[-_]+$/g, "");

  if (sep) {
    name = name.replace(new RegExp(`\\${sep}+`, "g"), sep);
  }

  if (!name) name = "formready-file";
  if (caseMode === "lower") name = name.toLowerCase();
  if (caseMode === "upper") name = name.toUpperCase();
  return name;
}

function buildRows(files: File[], prefix: string, separator: Separator, caseMode: CaseMode, maxLength: number, startNumber: number): RenameRow[] {
  const seen = new Map<string, number>();
  return files.map((file, index) => {
    const ext = extensionOf(file.name);
    const number = String(startNumber + index).padStart(files.length > 99 ? 3 : 2, "0");
    const rawBase = [prefix, number, baseNameOf(file.name)].filter(Boolean).join(separator === "underscore" ? "_" : separator === "none" ? "" : "-");
    let cleanBase = safeName(rawBase, separator, caseMode);
    const limit = Math.max(8, maxLength - ext.length - 1);
    let status: RenameRow["status"] = cleanBase.length > limit ? "Shortened" : "Ready";
    cleanBase = cleanBase.slice(0, limit).replace(/^[-_]+|[-_]+$/g, "") || `file-${number}`;
    let candidate = `${cleanBase}.${ext}`;
    const duplicateCount = seen.get(candidate) ?? 0;
    if (duplicateCount > 0) {
      status = "Duplicate fixed";
      const suffix = `${separator === "underscore" ? "_" : "-"}${duplicateCount + 1}`;
      const shortBase = cleanBase.slice(0, Math.max(4, limit - suffix.length));
      candidate = `${shortBase}${suffix}.${ext}`;
    }
    seen.set(`${cleanBase}.${ext}`, duplicateCount + 1);
    return { file, newName: candidate, status };
  });
}

export function FileNameCleaner() {
  const [files, setFiles] = useState<File[]>([]);
  const [prefix, setPrefix] = useState("formready");
  const [separator, setSeparator] = useState<Separator>("dash");
  const [caseMode, setCaseMode] = useState<CaseMode>("lower");
  const [maxLength, setMaxLength] = useState(60);
  const [startNumber, setStartNumber] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const rows = useMemo(() => buildRows(files, prefix.trim(), separator, caseMode, maxLength, startNumber), [files, prefix, separator, caseMode, maxLength, startNumber]);

  function addFiles(nextFiles: File[]) {
    setError("");
    const accepted = nextFiles.filter((file) => file.size > 0);
    if (!accepted.length) return setError("Upload at least one valid file.");
    setFiles((prev) => [...prev, ...accepted].slice(0, 50));
  }

  async function downloadZip() {
    if (!rows.length) return setError("Upload files first.");
    setBusy(true);
    setError("");
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      rows.forEach((row) => zip.file(row.newName, row.file));
      zip.file("renamed-files-map.csv", ["original_name,new_name,size_bytes", ...rows.map((row) => `"${row.file.name.replace(/"/g, '""')}","${row.newName}",${row.file.size}`)].join("\n"));
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, "formready-renamed-files.zip");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create renamed ZIP.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />File Name Cleaner</CardTitle>
            <CardDescription>Rename files safely before uploading to portals that reject spaces, brackets, Hindi text or special characters.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone multiple accept="image/*,application/pdf" onFiles={addFiles} title="Upload files to rename" description="Photos, signatures, PDFs and scans" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Prefix</Label><Input value={prefix} onChange={(event) => setPrefix(event.target.value)} placeholder="formready" /></div>
              <div className="space-y-2"><Label>Start number</Label><Input type="number" min={1} value={startNumber} onChange={(event) => setStartNumber(Number(event.target.value) || 1)} /></div>
              <div className="space-y-2"><Label>Separator</Label><Select value={separator} onChange={(event) => setSeparator(event.target.value as Separator)}><option value="dash">Dash -</option><option value="underscore">Underscore _</option><option value="none">No separator</option></Select></div>
              <div className="space-y-2"><Label>Case</Label><Select value={caseMode} onChange={(event) => setCaseMode(event.target.value as CaseMode)}><option value="lower">lowercase</option><option value="upper">UPPERCASE</option><option value="keep">Keep letters</option></Select></div>
              <div className="space-y-2 sm:col-span-2"><Label>Maximum filename length</Label><Input type="number" min={20} max={120} value={maxLength} onChange={(event) => setMaxLength(Number(event.target.value) || 60)} /></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" type="button" onClick={() => { setPrefix("photo"); setSeparator("dash"); setCaseMode("lower"); }}><RefreshCcw className="mr-2 h-4 w-4" />Photo upload names</Button>
              <Button variant="secondary" type="button" onClick={() => { setPrefix("document"); setSeparator("underscore"); setCaseMode("lower"); }}>Document names</Button>
              <Button variant="ghost" type="button" onClick={() => setFiles([])}><Trash2 className="mr-2 h-4 w-4" />Clear</Button>
            </div>
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safe filename preview</CardTitle>
            <CardDescription>{rows.length ? `${rows.length} file${rows.length === 1 ? "" : "s"} ready for portal-safe ZIP download.` : "Upload files to see clean names."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!rows.length && <div className="rounded-2xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">Clean file names will appear here.</div>}
            <div className="max-h-[520px] space-y-3 overflow-auto pr-1">
              {rows.map((row, index) => (
                <div key={`${row.file.name}-${index}`} className="rounded-2xl border bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-muted-foreground">Old: {row.file.name}</p>
                      <p className="truncate font-semibold">New: {row.newName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatBytes(row.file.size)} · {row.status}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
            {rows.length > 0 && <Button className="w-full" size="lg" onClick={downloadZip} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Archive className="mr-2 h-4 w-4" />}Download renamed ZIP</Button>}
            {rows.length === 1 && <Button className="w-full" variant="secondary" onClick={() => downloadBlob(rows[0].file, rows[0].newName)}><Download className="mr-2 h-4 w-4" />Download renamed file</Button>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
