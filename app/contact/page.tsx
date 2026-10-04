import type { Metadata } from "next";
import Contact from "@/components/contact/ContactPage";

import { siteUrl, profile } from '@/config/site';

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description: "Contact Pulkit Sharma, a full stack developer and AI/ML enthusiast. Open to opportunities; reach out by email or LinkedIn.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact — Get in Touch with Pulkit Sharma",
    description: "Contact Pulkit Sharma, a full stack developer and AI/ML enthusiast. Open to opportunities; reach out by email or LinkedIn.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Pulkit Sharma | Contact Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Get in Touch with Pulkit Sharma",
    description: "Contact Pulkit Sharma, a full stack developer and AI/ML enthusiast. Open to opportunities; reach out by email or LinkedIn.",
    images: [`${siteUrl}/og-image.png`],
    creator: profile.xHandle,
  },
};

export default function ContactPage() {
  return <Contact />;
}
