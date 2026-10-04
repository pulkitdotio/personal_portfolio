import Hero from '@/components/layouts/Hero';
import Project from '@/components/projects/Project';
import AboutMe from '@/components/landing/TechSkills';
import Featured from '@/components/landing/Featured';
import CTA from '@/components/landing/CTA';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';
import TopBanner from '@/components/ui/top-banner';

const sectionIds = {
  projects: 'featured-projects',
  skills: 'skills',
  featured: 'featured',
  cta: 'contact',
};

export default async function Home() {
  // Load the three projects from the existing local Markdown content.
  const { ProjectCardData } = await import('@/config/projects/ProjectCardData');
  const projectSlugs = await getMarkdownSlugs('projects');
  const projects = await Promise.all(
    projectSlugs.map(async (slug) => {
      const content = await getMarkdownContent('projects', slug);
      const staticData = ProjectCardData.find(
        (p) => p.projectDetailsPageSlug?.endsWith(slug) || p.links?.details?.endsWith(slug)
      );

      return {
        id: slug,
        title: staticData?.title || content?.meta.title || slug,
        subheading: staticData?.subheading || null,
        description: content?.meta.description || '',
        img: {
          src: content?.meta.image || '',
          alt: content?.meta.title || slug,
        },
        links: {
          website: content?.meta.live || '',
          github: content?.meta.github || '',
          details: `/projects/${slug}`,
        },
        technologies: (content?.meta.technologies || []).map((name: string) => ({ name })),
        status: content?.meta.status || '',
        isWorking: content?.meta.status?.toLowerCase() === 'live',
        isBuilding:
          content?.meta.status?.toLowerCase() === 'in-progress' ||
          content?.meta.status?.toLowerCase() === 'building',
        details: true,
      };
    })
  );

  // Sort projects ascendingly by their ID in ProjectCardData so that reverse() in ProjectCard renders newest first
  projects.sort((a, b) => {
    const aData = ProjectCardData.find(
      (p) => p.projectDetailsPageSlug?.endsWith(a.id) || p.links?.details?.endsWith(a.id)
    );
    const bData = ProjectCardData.find(
      (p) => p.projectDetailsPageSlug?.endsWith(b.id) || p.links?.details?.endsWith(b.id)
    );
    return (aData?.id ?? 0) - (bData?.id ?? 0);
  });

  return (
    <div className="min-h-screen">
      <TopBanner />

      <Hero />

      <section id={sectionIds.projects} aria-label="Projects">
        <Project projects={projects} />
      </section>

      <section id={sectionIds.skills} aria-label="Tech Stack">
        <AboutMe />
      </section>

      <section id={sectionIds.featured} aria-label="GitHub Activity">
        <Featured />
      </section>

      <section id={sectionIds.cta} aria-label="Contact">
        <CTA />
      </section>

    </div>
  );
}
