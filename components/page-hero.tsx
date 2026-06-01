import Link from "next/link";
import { ArrowRight, Lock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PageHero({ title, description, ctaHref = "/photo-resize", ctaLabel = "Upload file" }: { title: string; description: string; ctaHref?: string; ctaLabel?: string }) {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Badge className="mb-4">Private · Fast · Browser-safe</Badge>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg"><Link href={ctaHref}>{ctaLabel}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="secondary"><Link href="/ai-file-checker">Check file first</Link></Button>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="flex items-center justify-center gap-2"><Lock className="h-4 w-4 text-primary" />No forced upload</div>
          <div className="flex items-center justify-center gap-2"><Zap className="h-4 w-4 text-primary" />Works on weak phones</div>
          <div className="flex items-center justify-center gap-2"><Shield className="h-4 w-4 text-primary" />Clean downloads</div>
        </div>
      </div>
    </section>
  );
}
