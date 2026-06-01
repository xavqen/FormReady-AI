import { cn } from "@/lib/utils";

export function AdSlot({ label = "Ad space", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-dashed bg-muted/35 p-4 text-center text-xs text-muted-foreground", className)}>
      <span className="font-medium">{label}</span> · reserved for clean AdSense placement
    </div>
  );
}
