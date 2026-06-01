import { CheckCircle2, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const benefits = ["Batch resize", "No ads", "Faster processing", "More presets", "Unlimited downloads"];

export function PremiumSection() {
  return (
    <section className="container-page py-12">
      <Card className="overflow-hidden border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm"><Crown className="h-4 w-4 text-primary" /> Premium ready</div>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Upgrade path built for monetization</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Use the free tools to grow traffic, then add paid batch processing and no-ad plans when your audience starts returning daily.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 md:min-w-80 md:grid-cols-1">
            {benefits.map((benefit) => <div key={benefit} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" />{benefit}</div>)}
            <Button asChild variant="dark" className="mt-2"><Link href="/contact">Request premium access</Link></Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
