"use client";

import { useState } from "react";
import { Archive, BadgeCheck, Download, FileImage, IdCard, Loader2, PenLine, Wand2, X } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { loadImage, resizeImageToBlob, trimWhitespace, compressImageToTarget } from "@/lib/image";
import { cleanFileName, downloadBlob, formatBytes } from "@/lib/utils";

type OutputFile = { label: string; name: string; blob: Blob; before: number; after: number; note: string };

const examProfiles = [
  { slug: "generic", label: "Generic exam portal", photoW: 300, photoH: 400, photoKb: 100, signW: 300, signH: 100, signKb: 20 },
  { slug: "ssc", label: "SSC / Railway style", photoW: 300, photoH: 400, photoKb: 50, signW: 300, signH: 100, signKb: 20 },
  { slug: "neet-jee", label: "NEET / JEE style", photoW: 600, photoH: 800, photoKb: 200, signW: 400, signH: 150, signKb: 50 },
  { slug: "school", label: "School / college exam", photoW: 240, photoH: 320, photoKb: 50, signW: 300, signH: 100, signKb: 20 }
];

export function AdmitCardPrep() {
  const [profileSlug, setProfileSlug] = useState(examProfiles[0].slug);
  const [photo, setPhoto] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [idImage, setIdImage] = useState<File | null>(null);
  const [photoKb, setPhotoKb] = useState(examProfiles[0].photoKb);
  const [signatureKb, setSignatureKb] = useState(examProfiles[0].signKb);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outputs, setOutputs] = useState<OutputFile[]>([]);

  const profile = examProfiles.find((item) => item.slug === profileSlug) ?? examProfiles[0];

  function selectProfile(slug: string) {
    const next = examProfiles.find((item) => item.slug === slug) ?? examProfiles[0];
    setProfileSlug(slug);
    setPhotoKb(next.photoKb);
    setSignatureKb(next.signKb);
    setOutputs([]);
  }

  function acceptImage(files: File[], setter: (file: File) => void, message: string) {
    const file = files[0];
    setOutputs([]);
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError(message);
    setter(file);
  }

  async function processFiles() {
    if (!photo && !signature && !idImage) return setError("Upload at least one photo, signature or ID scan first.");
    setBusy(true);
    setError("");
    setOutputs([]);
    try {
      const next: OutputFile[] = [];

      if (photo) {
        const image = await loadImage(photo);
        const blob = await resizeImageToBlob(image.dataUrl, {
          width: profile.photoW,
          height: profile.photoH,
          targetKb: photoKb,
          format: "image/jpeg",
          background: "white",
          zoom: 1,
          offsetX: 0,
          offsetY: 0
        });
        next.push({
          label: "Exam photo",
          name: cleanFileName(photo.name, `${profile.slug}-photo-${photoKb}kb`, "jpg"),
          blob,
          before: photo.size,
          after: blob.size,
          note: `${profile.photoW}×${profile.photoH}px · target ${photoKb}KB`
        });
      }

      if (signature) {
        const image = await loadImage(signature);
        const trimmed = await trimWhitespace(image.dataUrl);
        const blob = await resizeImageToBlob(trimmed, {
          width: profile.signW,
          height: profile.signH,
          targetKb: signatureKb,
          format: "image/jpeg",
          background: "white",
          zoom: 1,
          offsetX: 0,
          offsetY: 0
        });
        next.push({
          label: "Exam signature",
          name: cleanFileName(signature.name, `${profile.slug}-signature-${signatureKb}kb`, "jpg"),
          blob,
          before: signature.size,
          after: blob.size,
          note: `${profile.signW}×${profile.signH}px · target ${signatureKb}KB`
        });
      }

      if (idImage) {
        const result = await compressImageToTarget(idImage, { targetKb: 300, maxSide: 1400, format: "image/jpeg", background: "white" });
        next.push({
          label: "ID document scan",
          name: cleanFileName(idImage.name, "id-scan-300kb", "jpg"),
          blob: result.blob,
          before: idImage.size,
          after: result.blob.size,
          note: result.hitTarget ? "Compressed under 300KB" : "Best compressed version generated"
        });
      }

      setOutputs(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not prepare exam upload files.");
    } finally {
      setBusy(false);
    }
  }

  async function downloadZip() {
    if (!outputs.length) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    outputs.forEach((item) => zip.file(item.name, item.blob));
    zip.file("upload-checklist.txt", [
      "FormReady AI exam upload pack",
      `Profile: ${profile.label}`,
      "Open every generated file once before final upload.",
      "Compare final portal instructions because official limits can change."
    ].join("\n"));
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `formready-${profile.slug}-exam-pack.zip`);
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />Admit Card / Exam Upload Pack</CardTitle>
            <CardDescription>Prepare photo, signature and optional ID scan in one clean pack for exam forms and admit-card portals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Exam profile</Label>
              <Select value={profileSlug} onChange={(event) => selectProfile(event.target.value)}>
                {examProfiles.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={(files) => acceptImage(files, setPhoto, "Upload a JPG, PNG or WebP photo.")} title="Upload photo" description={photo ? `${photo.name} · ${formatBytes(photo.size)}` : "Candidate photo"} />
              <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={(files) => acceptImage(files, setSignature, "Upload a JPG, PNG or WebP signature.")} title="Upload signature" description={signature ? `${signature.name} · ${formatBytes(signature.size)}` : "Signature scan"} />
              <UploadZone accept="image/jpeg,image/png,image/webp" onFiles={(files) => acceptImage(files, setIdImage, "Upload a JPG, PNG or WebP ID scan.")} title="Optional ID scan" description={idImage ? `${idImage.name} · ${formatBytes(idImage.size)}` : "Aadhaar/PAN/marksheet image"} />
            </div>
            <div className="grid gap-3 rounded-2xl border p-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Photo target KB</Label><Input type="number" min={10} value={photoKb} onChange={(event) => setPhotoKb(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Signature target KB</Label><Input type="number" min={5} value={signatureKb} onChange={(event) => setSignatureKb(Number(event.target.value))} /></div>
            </div>
            <div className="rounded-2xl border bg-muted/20 p-4 text-sm text-muted-foreground">
              Output defaults: photo {profile.photoW}×{profile.photoH}px, signature {profile.signW}×{profile.signH}px, white background, JPG export.
            </div>
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</div>}
            <Button className="w-full" size="lg" onClick={processFiles} disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}Prepare exam upload pack</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prepared files</CardTitle>
            <CardDescription>Download files one by one or save the full exam upload ZIP.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!outputs.length && <div className="rounded-2xl border border-dashed bg-muted/20 p-8 text-center text-sm text-muted-foreground">Your generated exam files will appear here.</div>}
            {outputs.map((item) => (
              <div key={item.name} className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-semibold">{item.label.includes("signature") ? <PenLine className="h-4 w-4 text-primary" /> : item.label.includes("ID") ? <IdCard className="h-4 w-4 text-primary" /> : <FileImage className="h-4 w-4 text-primary" />}{item.label}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Before {formatBytes(item.before)} → After {formatBytes(item.after)}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setOutputs((prev) => prev.filter((out) => out.name !== item.name))}><X className="h-4 w-4" /></Button>
                </div>
                <Button className="mt-4 w-full" variant="secondary" onClick={() => downloadBlob(item.blob, item.name)}><Download className="mr-2 h-4 w-4" />Download</Button>
              </div>
            ))}
            {outputs.length > 1 && <Button className="w-full" variant="dark" onClick={downloadZip}><Archive className="mr-2 h-4 w-4" />Download ZIP pack</Button>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
