import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allPresets } from "@/lib/presets";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function RequirementsTable() {
  return (
    <section className="container-page py-8">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="px-4 py-3">Form type</th><th className="px-4 py-3">Kind</th><th className="px-4 py-3">Dimensions</th><th className="px-4 py-3">Max size</th><th className="px-4 py-3">Formats</th><th className="px-4 py-3">Tool</th></tr>
              </thead>
              <tbody>
                {allPresets.map((preset) => (
                  <tr key={preset.slug} className="border-b last:border-0">
                    <td className="px-4 py-4 font-medium">{preset.name}</td>
                    <td className="px-4 py-4"><Badge>{preset.kind}</Badge></td>
                    <td className="px-4 py-4 text-muted-foreground">{preset.width && preset.height ? `${preset.width}×${preset.height}px` : "Portal dependent"}</td>
                    <td className="px-4 py-4 text-muted-foreground">{preset.minKb ? `${preset.minKb}KB–` : "Under "}{preset.maxKb}KB</td>
                    <td className="px-4 py-4 text-muted-foreground">{preset.formats.join(", ")}</td>
                    <td className="px-4 py-4"><Link className="inline-flex items-center gap-1 font-semibold text-primary" href={`/${preset.slug}`}>Open <ArrowRight className="h-3.5 w-3.5" /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
