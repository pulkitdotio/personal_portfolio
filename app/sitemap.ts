import type { MetadataRoute } from 'next';
import { getMarkdownSlugs } from '@/lib/markdown';
import { siteUrl } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/projects', '/contact', '/resume'];
  const projectSlugs = await getMarkdownSlugs('projects');
  return [
    ...staticRoutes.map((route) => ({
      url: siteUrl + route,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: siteUrl + '/projects/' + slug,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
