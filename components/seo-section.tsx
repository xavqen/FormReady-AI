import { Card, CardContent } from "@/components/ui/card";

export function SeoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="container-page py-12">
      <Card className="bg-muted/20">
        <CardContent className="prose prose-zinc max-w-none p-6 text-sm leading-7 text-muted-foreground dark:prose-invert sm:p-8">
          <h2 className="mb-3 text-2xl font-bold text-foreground">{title}</h2>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
