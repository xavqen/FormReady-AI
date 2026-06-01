import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("Terms", "Terms of use for FormReady AI.", "/terms");
export default function Page() { return <><PageHero title="Terms of Use" description="Rules for using FormReady AI tools." /><SeoSection title="Use responsibly"><p>FormReady AI provides file resizing, converting and checking tools for convenience. It does not guarantee acceptance by every official portal because requirements may change and each form may have its own rules.</p><p>Users are responsible for checking official form instructions, reviewing downloaded files and submitting accurate documents. Do not use the website for illegal, fraudulent or harmful activity.</p></SeoSection></>; }
