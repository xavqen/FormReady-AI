import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("Contact", "Contact FormReady AI support.", "/contact");
export default function Page() { return <><PageHero title="Contact FormReady AI" description="Need help with a form preset or file upload problem? Contact support." /><section className="container-page pb-12"><div className="rounded-3xl border bg-card p-6"><h2 className="text-xl font-bold">Support</h2><p className="mt-2 text-sm text-muted-foreground">Email us with the form name, required file size and allowed format. Do not send private documents unless required.</p><Button asChild className="mt-5"><Link href="mailto:support@formready.ai"><Mail className="mr-2 h-4 w-4" />support@formready.ai</Link></Button></div></section><SeoSection title="Contact policy"><p>For privacy, describe the issue first. The website is designed to process files locally in the browser whenever possible.</p></SeoSection></>; }
