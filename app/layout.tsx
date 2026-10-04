import type { Metadata } from 'next';
import { Geist, Pixelify_Sans } from 'next/font/google';
import Script from 'next/script';
import '@/index.css';
import { ThemeProvider } from '@/components/landing/theme-provider';
import Container from '@/components/layouts/Container';
import Layout from '@/components/common/Layout';
import { Quote } from '@/components/common/Quote';
import Footer from '@/components/common/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const pixelifySans = Pixelify_Sans({
  variable: '--font-pixelify',
  subsets: ['latin'],
  display: 'swap',
});

import { siteUrl, siteTitle, siteDescription, profile } from '@/config/site';

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
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
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Full Stack Development',
        'Backend Systems',
        'System Design',
        'APIs',
        'Databases',
        'Artificial Intelligence',
        'Machine Learning',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Pulkit Sharma Portfolio',
      description: siteDescription,
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Pulkit Sharma',
  },
  description:
    siteDescription,
  keywords: [
    'Pulkit Sharma',
    'Full Stack Developer',
    'AI/ML Enthusiast',
    'React Developer',
    'Next.js Developer',
    'Full Stack Engineer',
    'JavaScript',
    'TypeScript',
    'Web Developer Portfolio',
  ],
  authors: [{ name: profile.name, url: profile.githubUrl }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: siteTitle,
    description:
      siteDescription,
    siteName: 'Pulkit Sharma Portfolio',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Pulkit Sharma | Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description:
      siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: profile.xHandle,
  },

  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${pixelifySans.variable} min-h-screen font-sans antialiased`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var key = "vite-ui-theme";
                  var theme = localStorage.getItem(key);
                  if (theme !== "light" && theme !== "system") {
                    document.documentElement.classList.add("dark");
                  } else if (theme === "light") {
                    document.documentElement.classList.add("light");
                  } else if (theme === "system") {
                    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    document.documentElement.classList.add(dark ? "dark" : "light");
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:bg-background focus:p-3">Skip to content</a>
          <ScrollToTop />
          <Analytics />
          <div className="min-h-screen dark:bg-black/50">
          <Container>
              <Layout>
                <main id="main-content">{children}</main>
                <Quote />
                <Footer />
              </Layout>
            </Container>
            <div className="from-background pointer-events-none fixed inset-x-0 bottom-0 z-40 h-10 bg-linear-to-t to-transparent [mask-image:linear-gradient(to_top,black_10%,transparent)] opacity-100 backdrop-blur-[5px] select-none dark:[mask-image:linear-gradient(to_top,black_20%,transparent)]" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
