import type { Metadata } from "next";

export const siteConfig = {
  name: "FormReady AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://formready-ai.vercel.app",
  description: "Fix photo, signature and PDF size for scholarship, exam, passport, PAN, admission and job forms. Browser-safe file tools for Indian users.",
  keywords: [
    "photo resize for online form",
    "signature resize 20kb",
    "pdf compress 100kb",
    "scholarship photo resize",
    "exam form photo resize",
    "PAN card photo resize",
    "passport photo resize",
    "image to pdf online",
    "convert png to jpg",
    "passport photo sheet maker",
    "government exam photo size",
    "kb mb file size converter",
    "cm to pixel photo size",
    "resume pdf compress",
    "certificate pdf compress",
    "aadhaar pan document compress",
    "admit card photo signature resize",
    "ssc photo signature resize",
    "railway photo signature resize",
    "neet photo resize",
    "jee photo resize",
    "online form upload checklist",
    "file name cleaner for online form",
    "image dimension checker",
    "pdf page counter online",
    "online form file upload error",
    "white background photo maker",
    "bulk pdf compress online",
    "pdf metadata cleaner",
    "photo crop resize online",
    "cuet photo resize",
    "upsc photo signature resize",
    "police recruitment photo signature resize",
    "teacher exam photo signature resize",
    "image metadata cleaner online",
    "remove exif from photo online",
    "rotate pdf online",
    "add watermark to pdf online",
    "photo print size calculator",
    "ibps photo signature resize",
    "state psc photo signature resize",
    "army rally photo signature resize",
    "nursing admission photo resize"
  ]
};

export function buildMetadata(title: string, description = siteConfig.description, path = "/"): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website"
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description },
    robots: { index: true, follow: true }
  };
}

export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }))
});

