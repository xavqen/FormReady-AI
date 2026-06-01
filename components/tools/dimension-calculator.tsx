"use client";

import { useMemo, useState } from "react";
import { Ruler, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type Unit = "cm" | "mm" | "inch";

const quickPresets = [
  { label: "Passport print 3.5×4.5 cm", width: 3.5, height: 4.5, unit: "cm" as Unit, dpi: 300 },
  { label: "Square profile 2×2 inch", width: 2, height: 2, unit: "inch" as Unit, dpi: 300 },
  { label: "Small signature 6×2 cm", width: 6, height: 2, unit: "cm" as Unit, dpi: 200 },
  { label: "A4 page 21×29.7 cm", width: 21, height: 29.7, unit: "cm" as Unit, dpi: 150 }
];

function toInches(value: number, unit: Unit) {
  if (unit === "inch") return value;
  if (unit === "cm") return value / 2.54;
  return value / 25.4;
}

export function DimensionCalculator() {
  const [width, setWidth] = useState(3.5);
  const [height, setHeight] = useState(4.5);
  const [unit, setUnit] = useState<Unit>("cm");
  const [dpi, setDpi] = useState(300);

  const result = useMemo(() => {
    const safeDpi = Math.max(1, dpi || 1);
    const pixelWidth = Math.round(toInches(width || 0, unit) * safeDpi);
    const pixelHeight = Math.round(toInches(height || 0, unit) * safeDpi);
    const ratio = pixelHeight ? `${(pixelWidth / pixelHeight).toFixed(2)}:1` : "—";
    return { pixelWidth, pixelHeight, ratio };
  }, [width, height, unit, dpi]);

  function applyPreset(label: string) {
    const preset = quickPresets.find((item) => item.label === label);
    if (!preset) return;
    setWidth(preset.width);
    setHeight(preset.height);
    setUnit(preset.unit);
    setDpi(preset.dpi);
  }

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5 text-primary" />CM/MM/Inch to Pixel Calculator</CardTitle>
            <CardDescription>Convert physical photo or document sizes into pixel width and height for online uploads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2"><Label>Width</Label><Input type="number" step="0.1" min={0} value={width} onChange={(event) => setWidth(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Height</Label><Input type="number" step="0.1" min={0} value={height} onChange={(event) => setHeight(Number(event.target.value))} /></div>
              <div className="space-y-2"><Label>Unit</Label><Select value={unit} onChange={(event) => setUnit(event.target.value as Unit)}><option value="cm">Centimeter</option><option value="mm">Millimeter</option><option value="inch">Inch</option></Select></div>
              <div className="space-y-2"><Label>DPI</Label><Select value={dpi} onChange={(event) => setDpi(Number(event.target.value))}><option value={72}>72 DPI web</option><option value={150}>150 DPI scan</option><option value={200}>200 DPI form</option><option value={300}>300 DPI print</option><option value={600}>600 DPI high print</option></Select></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPresets.map((preset) => <Button key={preset.label} type="button" size="sm" variant="secondary" onClick={() => applyPreset(preset.label)}>{preset.label}</Button>)}
              <Button type="button" size="sm" variant="ghost" onClick={() => { setWidth(3.5); setHeight(4.5); setUnit("cm"); setDpi(300); }}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pixel output</CardTitle>
            <CardDescription>Paste these values in the photo resize tool when a form gives physical dimensions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border bg-muted/20 p-5 text-center">
              <p className="text-sm text-muted-foreground">Pixel dimensions</p>
              <p className="mt-2 text-4xl font-black tracking-tight">{result.pixelWidth} × {result.pixelHeight}</p>
              <p className="mt-2 text-sm text-muted-foreground">Aspect ratio: {result.ratio}</p>
            </div>
            <div className="rounded-2xl border bg-primary/10 p-4 text-sm leading-6 text-muted-foreground">For most online forms, pixel size and KB limit matter more than print DPI. Use this calculator, then resize the final image under the required KB size.</div>
            <Button asChild variant="dark" className="w-full"><a href={`/photo-resize?width=${result.pixelWidth}&height=${result.pixelHeight}`}>Open photo resize tool</a></Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
