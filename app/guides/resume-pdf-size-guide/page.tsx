import Link from "next/link";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Why is my resume PDF too large?", a: "Large embedded images, high-resolution scans and design-heavy templates can make a resume PDF too big." },
  { q: "What is a safe resume PDF size?", a: "Many portals accept 500KB to 1MB. Always follow the limit shown on the job portal." },
  { q: "Can I compress without losing text?", a: "Text-based PDFs usually compress better than scanned PDFs. Check the final PDF before submitting." }
];

export const metadata = buildMetadata("Resume PDF Size Guide", "Compress resume PDF for job portals, internship forms and campus hiring upload limits.", "/guides/resume-pdf-size-guide");

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} /><PageHero title="Resume PDF Size Guide" description="Make your resume small enough for job portals without making it unreadable." ctaHref="/resume-pdf-compress" ctaLabel="Compress resume" /><SeoSection title="Resume PDF upload tips"><p>Use a clean PDF, avoid unnecessary high-resolution images and keep the final resume readable. If the portal asks for 1MB, target around 900KB. If it asks for 500KB, target around 450KB.</p><Button asChild className="mt-6"><Link href="/resume-pdf-compress">Open resume PDF compressor</Link></Button></SeoSection><FAQ items={faqs} /></>;
}
