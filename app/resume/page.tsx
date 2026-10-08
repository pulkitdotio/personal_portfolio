import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { resumeConfig } from "@/config/resume";

import { siteUrl, profile } from '@/config/site';

export const metadata: Metadata = {
  title: "Resume — Pulkit Sharma",
  description: "View Pulkit Sharma’s supplied resume and technical skills.",
  alternates: {
    canonical: `${siteUrl}/resume`,
  },
  openGraph: {
    title: "Resume — Pulkit Sharma | Professional Profile",
    description: "View Pulkit Sharma’s supplied resume and technical skills.",
    url: `${siteUrl}/resume`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Pulkit Sharma | Resume & Qualifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume — Pulkit Sharma | Professional Profile",
    description: "View Pulkit Sharma’s supplied resume and technical skills.",
    images: [`${siteUrl}/og-image.png`],
    creator: profile.xHandle,
  },
};

export default function ResumePage() {
  redirect(resumeConfig.url);
}
