import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("About", "About FormReady AI and its browser-safe file tools.", "/about");
export default function Page() { return <><PageHero title="About FormReady AI" description="A practical file fixing website for students, job seekers and online form users." /><SeoSection title="What we solve"><p>FormReady AI helps users fix rejected photo, signature and PDF uploads by resizing, cropping, converting and checking files against common online form limits. The product is built browser-first so most files are processed locally on the user device.</p><p>The goal is simple: make online form filling less stressful, especially for scholarship, exam, admission, PAN, passport and job application workflows.</p></SeoSection></>; }
