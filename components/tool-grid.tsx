import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { popularTools } from "@/lib/presets";

export function ToolGrid() {
  return (
    <section className="container-page py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Popular tools</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Fix files for any online form</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popularTools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3"><Badge>{tool.badge}</Badge><ArrowRight className="h-4 w-4 text-muted-foreground" /></div>
                <h3 className="mt-5 text-lg font-semibold">{tool.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tool.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
