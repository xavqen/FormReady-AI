import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileCTA() {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t bg-background/92 p-3 backdrop-blur-xl sm:hidden">
      <Button asChild className="w-full"><Link href="/photo-resize"><UploadCloud className="mr-2 h-4 w-4" />Upload file now</Link></Button>
    </div>
  );
}
