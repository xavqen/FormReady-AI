import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-16 text-center">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary"><FileQuestion className="h-8 w-8" /></div>
        <h1 className="mt-6 text-3xl font-black sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">The tool or guide you opened does not exist. Use the tools library to continue fixing your file.</p>
        <div className="mt-8 flex justify-center gap-3"><Button asChild><Link href="/tools">Open tools</Link></Button><Button asChild variant="secondary"><Link href="/">Go home</Link></Button></div>
      </div>
    </section>
  );
}
