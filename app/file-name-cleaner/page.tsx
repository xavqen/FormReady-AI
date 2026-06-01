import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { FileNameCleaner } from "@/components/tools/file-name-cleaner";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Why do online forms reject file names?", a: "Some portals fail when file names contain spaces, brackets, commas, Hindi/Urdu characters or very long names. Clean names improve compatibility." },
  { q: "Does this change my file content?", a: "No. It only packages the same files with safer names. Photos, PDFs and signatures are not uploaded to a server." }
];

export const metadata = buildMetadata("File Name Cleaner for Online Forms", "Clean file names by removing spaces, brackets and special characters before uploading to government, exam and job portals.", "/file-name-cleaner");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="File Name Cleaner for Online Forms" description="Rename photos, signatures and PDFs into safe portal-friendly names without changing the actual file content." /><FileNameCleaner /><SeoSection title="Fix file name upload errors"><p>Many form portals are strict about file names. Use simple English letters, numbers, dash or underscore. Avoid spaces, brackets, apostrophes, emojis and very long names when uploading documents.</p></SeoSection><FAQ items={faqs} /></>;
}
