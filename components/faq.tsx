import { Card, CardContent } from "@/components/ui/card";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="container-page py-12">
      <div className="mb-6 max-w-2xl">
        <p className="text-sm font-semibold text-primary">FAQ</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Common questions</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.q}>
            <CardContent className="p-5">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
