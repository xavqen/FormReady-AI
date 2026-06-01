import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, ScanSearch, ShieldCheck, Zap } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { PremiumSection } from "@/components/premium-section";
import { SeoSection } from "@/components/seo-section";
import { ToolGrid } from "@/components/tool-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { allPresets } from "@/lib/presets";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata("Fix Your Photo, Signature & PDF for Any Online Form", "Resize photos, signatures and PDFs for scholarship, exam, PAN, passport, admission and job forms with browser-safe tools.");

const faqs = [
  { q: "Are files uploaded to your server?", a: "The main tools process files inside your browser, so photos, signatures and PDFs do not need to leave your device." },
  { q: "Can I resize a photo to 20KB or 50KB?", a: "Yes. Use Photo Resize, select a target KB and download the optimized JPG/WebP file." },
  { q: "Can every PDF be compressed under 100KB?", a: "Scanned PDFs usually compress well. Some PDFs cannot hit exact limits without making pages unreadable, so the tool shows the best result clearly." },
  { q: "Is this useful for government forms?", a: "Yes. It includes presets for scholarship, exam, PAN, passport, admission and job application uploads." }
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <PageHero title="Fix Your Photo, Signature & PDF for Any Online Form" description="Instantly resize photos, crop signatures, compress PDFs and check upload requirements for Indian scholarship, exam, admission, PAN, passport and job forms." />
      <div className="container-page"><AdSlot label="Premium ad slot below hero" /></div>
      <ToolGrid />
      <section className="container-page py-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div><p className="text-sm font-semibold text-primary">Sarkari form presets</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">One-click settings for common forms</h2></div>
          <Badge>SEO pages included</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allPresets.map((preset) => (
            <Link href={`/${preset.slug}`} key={preset.slug}>
              <Card className="h-full transition hover:-translate-y-1 hover:border-primary/40">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3"><h3 className="font-semibold">{preset.name}</h3><ArrowRight className="h-4 w-4 text-muted-foreground" /></div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{preset.description}</p>
                  <div className="mt-4 text-xs text-muted-foreground">Max {preset.maxKb}KB {preset.width && preset.height ? `· ${preset.width}×${preset.height}px` : ""}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <section className="container-page py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[{ icon: Lock, title: "Private", text: "Browser-side processing keeps personal documents safer." }, { icon: Zap, title: "Fast", text: "Designed for weak phones and slow networks." }, { icon: ShieldCheck, title: "Form-ready", text: "Clear pass/fail checks before final upload." }].map((item) => <Card key={item.title}><CardContent className="p-5"><item.icon className="h-6 w-6 text-primary" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></CardContent></Card>)}
        </div>
      </section>
      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <Card className="bg-gradient-to-br from-primary/10 to-card">
            <CardContent className="p-6 sm:p-8">
              <Badge>Before / After</Badge>
              <h2 className="mt-4 text-2xl font-bold">From rejected upload to accepted file</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-background p-4"><ScanSearch className="h-5 w-5 text-amber-500" /><h3 className="mt-3 font-semibold">Before</h3><p className="mt-2 text-sm text-muted-foreground">Wrong KB, unsupported format, extra white space, or incorrect dimensions.</p></div>
                <div className="rounded-2xl border bg-background p-4"><CheckCircle2 className="h-5 w-5 text-emerald-500" /><h3 className="mt-3 font-semibold">After</h3><p className="mt-2 text-sm text-muted-foreground">Compressed, cropped, resized and ready for the selected online form.</p></div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild><Link href="/ai-file-checker">Check my file</Link></Button><Button asChild variant="secondary"><Link href="/form-requirements">View size requirements</Link></Button></div>
            </CardContent>
          </Card>
          <AdSlot label="Desktop sidebar ad" className="hidden lg:block" />
        </div>
      </section>
      <PremiumSection />
      <div className="container-page"><AdSlot label="Ad slot before FAQ" /></div>
      <FAQ items={faqs} />
      <SeoSection title="Why FormReady AI can get search traffic">
        <p>Millions of users search for file resize help while filling online forms. FormReady AI targets urgent search intent such as photo resize for scholarship form, signature resize 20KB, PDF compress under 200KB, passport photo resize and PAN card photo resize.</p>
        <p>The website is structured with dedicated SEO pages, reusable presets, FAQ schema, sitemap, robots file and fast client-side processing. This makes it useful for real users and easier for search engines to understand.</p>
      </SeoSection>
    </>
  );
}
