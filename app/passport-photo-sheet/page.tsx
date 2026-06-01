import { AdSlot } from "@/components/ad-slot";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SeoSection } from "@/components/seo-section";
import { PassportPhotoSheet } from "@/components/tools/passport-photo-sheet";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

const faqs = [
  { q: "Can I make passport photo sheet on A4 paper?", a: "Yes. Upload one photo, choose the photo size and A4 page, then download a printable JPG or PDF sheet." },
  { q: "Does this replace official passport photo rules?", a: "No. It helps create a sheet layout. Always follow the exact size, face, background and dress rules from the official portal or studio requirement." },
  { q: "Can I use this for school or exam form photos?", a: "Yes. Choose a smaller custom millimeter size and generate many copies on one page." }
];

export const metadata = buildMetadata("Passport Photo Sheet Maker", "Create printable passport size photo sheets on A4 or 4x6 paper and download JPG or PDF.", "/passport-photo-sheet");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <PageHero title="Passport Photo Sheet Maker" description="Create printable A4 or 4×6 sheets with passport, visa, school and form photos from one uploaded image." ctaHref="/passport-photo-sheet" ctaLabel="Make photo sheet" />
      <PassportPhotoSheet />
      <div className="container-page"><AdSlot label="Ad slot after photo sheet maker" /></div>
      <SeoSection title="Print multiple photos from one upload"><p>Instead of editing photos manually in office software, use a fixed-size sheet generator. It places copies evenly on A4 or 4×6 paper and exports both JPG and PDF for easy printing.</p></SeoSection>
      <FAQ items={faqs} />
    </>
  );
}
