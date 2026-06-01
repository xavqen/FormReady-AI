import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { FileChecker } from "@/components/tools/file-checker";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("AI File Checker", "Check file type, size, image dimensions and PDF size against common form presets.", "/ai-file-checker");
export default function Page() { return <><PageHero title="AI File Checker for Online Forms" description="Upload a photo, signature or PDF and instantly see if it passes selected form requirements." /><FileChecker /><SeoSection title="Check before uploading to a portal"><p>The checker helps avoid rejected uploads by validating file type, KB size and image dimensions before you submit an online form.</p></SeoSection></>; }
