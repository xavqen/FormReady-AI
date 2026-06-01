import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Should I upload personal documents to random websites?", a: "Prefer browser-side tools that do not need server upload, and avoid sharing sensitive documents unless the portal is official and trusted." },
  { q: "How do I keep ID documents readable after compression?", a: "Use a clean scan, keep all corners visible, avoid over-compression and open the final file before upload." },
  { q: "PDF or JPG: which is better?", a: "Use the format requested by the official portal. PDF is useful for multi-page documents; JPG is usually smaller for single images." }
];

export const metadata = buildMetadata("Aadhaar PAN Document Upload Size Guide", "Prepare Aadhaar, PAN and ID document PDFs for online upload size limits with privacy-focused tools.", "/guides/aadhaar-pan-document-upload-size");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Aadhaar, PAN & ID Document Upload Size Guide" description="Compress personal document PDFs while keeping important details readable." ctaHref="/aadhaar-pan-document-compress" ctaLabel="Compress document" /><SeoSection title="Private document upload checklist"><p>Before uploading ID documents, make sure the file is in the accepted format, under the size limit, readable, and not cropped incorrectly. Browser-side compression is useful because it avoids storing files on a server.</p><Button asChild className="mt-6"><Link href="/aadhaar-pan-document-compress">Open document compressor</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
