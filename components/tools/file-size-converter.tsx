"use client";

import { useMemo, useState } from "react";
import { Calculator, FileSearch, RotateCcw } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatBytes } from "@/lib/utils";

const targets = [10, 20, 50, 100, 200, 500, 1024];

function safeNumber(value: number) {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

export function FileSizeConverter() {
  const [bytes, setBytes] = useState(50 * 1024);
  const [file, setFile] = useState<File | null>(null);

  const values = useMemo(() => {
    const safeBytes = safeNumber(bytes);
    return {
      bytes: Math.round(safeBytes),
      kb: safeBytes / 1024,
      mb: safeBytes / (1024 * 1024),
      decimalKb: safeBytes / 1000,
      decimalMb: safeBytes / 1000000
    };
  }, [bytes]);

  function fromFile(files: File[]) {
    const selected = files[0];
    if (!selected) return;
    setFile(selected);
    setBytes(selected.size);
  }

  function setFromKb(kb: number) {
    setBytes(safeNumber(kb) * 1024);
  }

  function setFromMb(mb: number) {
    setBytes(safeNumber(mb) * 1024 * 1024);
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />KB, MB & Bytes Converter</CardTitle>
            <CardDescription>Convert form upload limits like 20KB, 50KB, 100KB, 200KB, 500KB and 1MB into exact bytes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadZone accept="image/*,application/pdf" onFiles={fromFile} title="Check a file size" description="Drop photo, signature or PDF to read its real file size" />
            {file && <div className="rounded-2xl border bg-muted/20 p-4 text-sm"><strong>{file.name}</strong><p className="mt-1 text-muted-foreground">Actual size: {formatBytes(file.size)}</p></div>}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-2"><Label>Bytes</Label><Input type="number" min={0} value={Math.round(values.bytes)} onChange={(event) => setBytes(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>KB</Label><Input type="number" min={0} step="0.01" value={Number(values.kb.toFixed(2))} onChange={(event) => setFromKb(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>MB</Label><Input type="number" min={0} step="0.001" value={Number(values.mb.toFixed(3))} onChange={(event) => setFromMb(Number(event.target.value))} /></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {targets.map((kb) => <Button key={kb} type="button" variant="secondary" size="sm" onClick={() => setFromKb(kb)}>{kb === 1024 ? "1MB" : `${kb}KB`}</Button>)}
              <Button type="button" variant="ghost" size="sm" onClick={() => { setFile(null); setBytes(50 * 1024); }}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Readable result</CardTitle>
            <CardDescription>Most government and exam portals show KB/MB, while browsers measure bytes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border bg-muted/20 p-4"><p className="text-sm text-muted-foreground">Binary size</p><p className="mt-1 text-2xl font-black">{values.kb.toFixed(2)} KB</p><p className="text-sm text-muted-foreground">{values.mb.toFixed(4)} MB · {values.bytes.toLocaleString()} bytes</p></div>
            <div className="rounded-2xl border bg-muted/20 p-4"><p className="text-sm text-muted-foreground">Decimal size</p><p className="mt-1 text-xl font-bold">{values.decimalKb.toFixed(2)} KB</p><p className="text-sm text-muted-foreground">{values.decimalMb.toFixed(4)} MB · used by some portals</p></div>
            <div className="rounded-2xl border bg-primary/10 p-4 text-sm text-muted-foreground"><FileSearch className="mb-2 h-5 w-5 text-primary" />Tip: if a portal says “under 50KB”, keep your final file slightly below the limit, for example 48KB.</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
