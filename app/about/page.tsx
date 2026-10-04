import type { Metadata } from 'next';
import Script from 'next/script';
import Container from '@/components/layouts/Container';
import SectionHeading from '@/components/common/SectionHeading';

import { siteUrl, profile } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Pulkit Sharma — Full Stack Developer',
  description:
    'About Pulkit Sharma, a full stack developer and AI/ML enthusiast based in India who builds web applications, backend systems, and practical AI-powered products.',
  keywords: [
    'About Pulkit Sharma',
    'Full Stack Developer',
    'AI/ML Enthusiast',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About Pulkit Sharma',
    description:
      'Pulkit Sharma builds modern web applications, backend systems, and practical AI-powered products.',
    url: `${siteUrl}/about`,
    type: 'profile',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'About Pulkit Sharma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Pulkit Sharma',
    description:
      'Pulkit Sharma is a full stack developer and AI/ML enthusiast based in India.',
    images: [`${siteUrl}/og-image.png`],
    creator: profile.xHandle,
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${siteUrl}/about`,
  name: 'About Pulkit Sharma',
  description:
    'About Pulkit Sharma, a full stack developer and AI/ML enthusiast based in India.',
  mainEntity: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    sameAs: [
      profile.githubUrl,
      profile.xUrl,
      profile.linkedinUrl,
    ],
  },
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <Script
        id="about-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="mx-auto max-w-3xl space-y-10">
        {/* Profile identity */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About Pulkit Sharma
          </h1>
          <p className="text-muted-foreground text-lg">
            <strong>Pulkit Sharma</strong> is a Full Stack Developer and AI/ML Enthusiast
            based in India, building modern web applications, backend systems, and practical AI-powered products.
          </p>
        </header>

        <section className="space-y-4">
          <SectionHeading heading="Who I Am" />
          <p className="text-base leading-relaxed">
            I&apos;m <strong>Pulkit Sharma</strong>. I build products end to end with React,
            Next.js, TypeScript, and Node.js, from data and API design to the interface people use.
            On the backend, I work with Express, MongoDB, PostgreSQL, Supabase, and Redis.
          </p>
          <p className="text-base leading-relaxed">
            I use projects to understand how systems connect, scale, and fail. My current
            learning focus is System Design and Advanced Backend Development.
          </p>
        </section>

        <section className="space-y-4">
          <SectionHeading heading="What I Build" />
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
            <li>Modern web applications with Next.js and React.</li>
            <li>Practical AI-powered products and integrations.</li>
            <li>APIs, databases, and scalable backend systems.</li>
            <li>Sentinel, PrepRole AI, and ledger-api.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <SectionHeading heading="Connect" />
          <p className="text-base leading-relaxed">
            Open to opportunities. Reach me by email or LinkedIn:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                github.com/pulkitdotio
              </a>
            </li>
            <li>
              <a
                href={profile.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                x.com/pulkitdotdev
              </a>
            </li>
            <li>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                linkedin.com/in/pulkit-sharma-691909384
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="underline underline-offset-2"
              >
                pulkit1865@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
