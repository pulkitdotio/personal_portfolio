import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/layouts/Container";
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
  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Resume
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            <a href={resumeConfig.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Open Pulkit Sharma’s resume</a>
            <span className="block text-sm">If the preview is blocked or requires sign-in, use the link above to open the supplied file in Google Drive.</span>
          </p>
        </div>
        <Separator />
        <div className="mx-auto max-w-2xl">
          <iframe
            src={resumeConfig.url}
            title="Pulkit Sharma’s resume"
            className="min-h-screen w-full"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
