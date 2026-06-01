import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { FileSizeConverter } from "@/components/tools/file-size-converter";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Is 1MB equal to 1024KB?", a: "Most browser file tools show binary size where 1MB is 1024KB. Some portals use decimal size, so keeping the file slightly below the limit is safer." },
  { q: "Can I check my real photo or PDF size?", a: "Yes. Drop the file into the checker and it will show the actual size without uploading it to a server." },
  { q: "What size should I use for online forms?", a: "Use the exact limit mentioned on the official form page. Common limits are 20KB, 50KB, 100KB, 200KB, 500KB and 1MB." }
];

export const metadata = buildMetadata("KB MB File Size Converter", "Convert KB, MB and bytes for online form upload limits and check real file size privately.", "/file-size-converter");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="KB, MB & Bytes File Size Converter" description="Convert file size limits and check whether your photo, signature or PDF is small enough for online form upload." ctaHref="/file-size-converter" ctaLabel="Check file size" /><FileSizeConverter /><div className="container-page"><AdSlot label="Ad slot before file size FAQ" /></div><SeoSection title="Why file size conversion matters"><p>Many upload errors happen because users confuse KB, MB and bytes. This page helps users understand exact limits before they resize images, signatures or PDFs for government, school, admission and job portals.</p></SeoSection><FAQ items={faqs} /></>;
}
