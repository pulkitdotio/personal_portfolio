import Container from '../layouts/Container';
import SectionHeading from '../common/SectionHeading';
import {
  ReactIcon, NodeJs, JavaScript, MongoDB, ExpressJs, NextJS, PostgreSQL,
  TailwindCss, TypeScript, Shadcn, Git, Docker, Python, Css, Html, Github,
} from '@/lib/techIcons';
import { Supabase } from '@/components/icons/tech/Supabase';
import RepeatSeparator from '../ui/repeat-separator';

const TechSkills = () => {
  return (
    <>
      <RepeatSeparator />
      <SectionHeading heading={'Tech Stack'} />
      <Container className="py-">
        <div className="mx-auto w-full max-w-5xl border-y border-neutral-200 dark:border-neutral-800">
          {StackCategories.map((category, index) => {
            return (
              <div
                key={category.id}
                className={`flex flex-col sm:flex-row ${
                  index !== StackCategories.length - 1
                    ? 'border-b border-neutral-200/80 dark:border-neutral-800'
                    : ''
                }`}
              >
                {/* Category Column with Dotted Right Border */}
                <div className="flex w-full shrink-0 items-center gap-3.5 border-b border-neutral-200/60 px-5 py-4 sm:w-64 sm:border-r sm:border-b-0 sm:border-dashed sm:border-neutral-300 sm:py-6 dark:sm:border-neutral-800">
                  <span className="font-mono text-sm font-medium text-neutral-400 dark:text-neutral-500">
                    {category.id}
                  </span>
                  <span className="text-sm font-medium text-neutral-600 md:text-base dark:text-neutral-300">
                    {category.category}
                  </span>
                </div>

                {/* Badges Column */}
                <div className="flex grow flex-wrap items-center gap-2 px-5 py-4 sm:gap-2.5 sm:px-6 sm:py-5">
                  {category.skills.map((skill) => (
                    <a
                      key={skill.title}
                      href={skill.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200/90 bg-neutral-50/90 px-3 py-1.5 font-mono text-xs text-neutral-700 shadow-2xs  select-none hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
                    >
                      {/* Monochrome icon with color on hover */}
                      {skill.icon && (
                        <span className="flex size-4 shrink-0 items-center justify-center opacity-70 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0 [&_svg]:size-3.5">
                          {skill.icon}
                        </span>
                      )}
                      <span className="font-medium tracking-tight whitespace-nowrap">
                        {skill.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default TechSkills;

const StackCategories = [
  {
    id: '01',
    category: 'Languages',
    skills: [
      { title: 'TypeScript', icon: <TypeScript />, href: 'https://www.typescriptlang.org/' },
      { title: 'JavaScript', icon: <JavaScript />, href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { title: 'Python', icon: <Python />, href: 'https://www.python.org/' },
      { title: 'Java', icon: null, href: 'https://dev.java/' },
      { title: 'HTML', icon: <Html />, href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { title: 'CSS', icon: <Css />, href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    ],
  },
  {
    id: '02',
    category: 'Frontend',
    skills: [
      { title: 'React.js', icon: <ReactIcon />, href: 'https://react.dev/' },
      { title: 'Next.js', icon: <NextJS />, href: 'https://nextjs.org/' },
      { title: 'Tailwind CSS', icon: <TailwindCss />, href: 'https://tailwindcss.com/' },
      { title: 'shadcn/ui', icon: <Shadcn />, href: 'https://ui.shadcn.com/' },
    ],
  },
  {
    id: '03',
    category: 'Backend & APIs',
    skills: [
      { title: 'Node.js', icon: <NodeJs />, href: 'https://nodejs.org/' },
      { title: 'Express.js', icon: <ExpressJs />, href: 'https://expressjs.com/' },
      { title: 'REST APIs', icon: null, href: 'https://developer.mozilla.org/en-US/docs/Glossary/REST' },
    ],
  },
  {
    id: '04',
    category: 'Databases / Infrastructure',
    skills: [
      { title: 'PostgreSQL', icon: <PostgreSQL />, href: 'https://www.postgresql.org/' },
      { title: 'MongoDB', icon: <MongoDB />, href: 'https://www.mongodb.com/' },
      { title: 'Redis', icon: null, href: 'https://redis.io/' },
      { title: 'Supabase', icon: <Supabase />, href: 'https://supabase.com/' },
    ],
  },
  {
    id: '05',
    category: 'AI / ML',
    skills: [
      { title: 'TensorFlow', icon: null, href: 'https://www.tensorflow.org/' },
      { title: 'Pandas', icon: null, href: 'https://pandas.pydata.org/' },
      { title: 'scikit-learn', icon: null, href: 'https://scikit-learn.org/' },
    ],
  },
  {
    id: '06',
    category: 'Tools & Workflow',
    skills: [
      { title: 'Git', icon: <Git />, href: 'https://git-scm.com/' },
      { title: 'GitHub', icon: <Github />, href: 'https://github.com/' },
      { title: 'Docker', icon: <Docker />, href: 'https://www.docker.com/' },
      { title: 'Postman', icon: null, href: 'https://www.postman.com/' },
      { title: 'VS Code', icon: null, href: 'https://code.visualstudio.com/' },
      { title: 'Vercel', icon: null, href: 'https://vercel.com/' },
    ],
  },
];
