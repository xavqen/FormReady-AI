import { FormPreset } from "@/lib/presets";
import { ImageResizer } from "@/components/tools/image-resizer";
import { PdfTool } from "@/components/tools/pdf-tool";

export function PresetTool({ preset }: { preset: FormPreset }) {
  if (preset.kind === "document") return <PdfTool mode="compress" />;
  return <ImageResizer title={preset.title} defaultWidth={preset.width ?? 300} defaultHeight={preset.height ?? 300} defaultKb={preset.maxKb} />;
}
