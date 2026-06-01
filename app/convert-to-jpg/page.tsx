import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I convert PNG to JPG for online forms?", a: "Yes. Upload PNG or WebP images, choose JPG, white background and target KB, then download the converted file." },
  { q: "Will transparent PNG backgrounds stay transparent?", a: "JPG does not support transparency, so transparent areas become white. Choose WebP or PNG if transparency is required." },
  { q: "Can I batch convert images?", a: "Yes. Upload multiple images and download converted files one by one or as a ZIP." }
];

export const metadata = buildMetadata("Convert Image to JPG Online", "Convert PNG, WebP and image files to JPG, PNG or WebP with target KB for online forms.", "/convert-to-jpg");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <PageHero title="Convert Image to JPG for Online Forms" description="Batch convert PNG, WebP and browser-readable images into JPG with white background and target KB size." ctaHref="/convert-to-jpg" ctaLabel="Convert image" />
      <ImageFormatConverter />
      <div className="container-page"><AdSlot label="Ad slot after image converter" /></div>
      <SeoSection title="Why JPG works best for form uploads"><p>Many scholarship, exam and government portals accept JPG first because it is small, compatible and easy to validate. This converter creates form-friendly JPG files while keeping the image private in your browser.</p></SeoSection>
      <FAQ items={faqs} />
    </>
  );
}
