"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function UploadZone({
  accept,
  multiple = false,
  onFiles,
  title = "Drop files here",
  description = "or click to browse from your device"
}: {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  title?: string;
  description?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [active, setActive] = useState(false);

  function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    onFiles(Array.from(list));
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setActive(true); }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => { e.preventDefault(); setActive(false); handleFiles(e.dataTransfer.files); }}
      className={cn("upload-grid-bg cursor-pointer rounded-3xl border border-dashed p-8 text-center transition", active ? "border-primary bg-primary/10" : "bg-muted/25 hover:bg-muted/40")}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary"><UploadCloud className="h-7 w-7" /></div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Button className="mt-5" type="button">Choose file</Button>
    </div>
  );
}
