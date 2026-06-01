import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  ["Tools", "/tools"],
  ["Photo", "/photo-resize"],
  ["Size", "/file-size-converter"],
  ["Pixels", "/cm-to-pixel"],
  ["Image KB", "/compress-image"],
  ["White BG", "/white-background-photo"],
  ["Crop", "/photo-crop-resize"],
  ["Convert", "/convert-to-jpg"],
  ["Privacy", "/image-metadata-cleaner"],
  ["Rotate PDF", "/pdf-rotate"],
  ["Watermark", "/pdf-watermark"],
  ["Print Calc", "/photo-print-size-calculator"],
  ["Photo Sheet", "/passport-photo-sheet"],
  ["Scanner", "/document-scanner"],
  ["Admit Card", "/admit-card-photo-signature"],
  ["CUET", "/cuet-photo-resize"],
  ["UPSC", "/upsc-photo-signature-resize"],
  ["IBPS", "/ibps-photo-signature-resize"],
  ["PSC", "/state-psc-photo-signature-resize"],
  ["Checklist", "/form-upload-checklist"],
  ["Batch", "/batch-photo-resize"],
  ["Signature", "/signature-resize"],
  ["PDF", "/pdf-compress"],
  ["Bulk PDF", "/bulk-pdf-compress"],
  ["PDF Privacy", "/pdf-metadata-cleaner"],
  ["Checker", "/ai-file-checker"],
  ["Names", "/file-name-cleaner"],
  ["PDF Count", "/pdf-page-counter"],
  ["Guides", "/guides"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><FileCheck2 className="h-5 w-5" /></span>
          <span>FormReady AI</span>
        </Link>
        <nav className="hidden max-w-[68vw] items-center gap-1 overflow-x-auto lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="shrink-0 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex"><Link href="/photo-resize">Upload now</Link></Button>
        </div>
      </div>
      <nav className="container-page flex gap-2 overflow-x-auto pb-2 lg:hidden">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-full border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
