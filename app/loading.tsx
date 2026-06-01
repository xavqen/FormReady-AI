export default function Loading() {
  return (
    <div className="container-page py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-2/3 rounded-2xl bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="grid gap-4 md:grid-cols-2"><div className="h-72 rounded-3xl bg-muted" /><div className="h-72 rounded-3xl bg-muted" /></div>
      </div>
    </div>
  );
}
