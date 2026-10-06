import { sirinStencil } from '@/lib/fonts';

const stencilHeadings = new Set([
  'About',
  'Projects',
  'Tech Stack',
  'GitHub Activity',
  'Contact',
  'Connect',
]);

const SectionHeading = ({ heading = '', classname = '', as: Tag = 'h2' }: { heading?: string; classname?: string; as?: 'h2' | 'p' }) => {
  return (
    <div className={`after:z relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-1 text-3xl font-normal transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-neutral-200/60 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:after:bg-neutral-800/80 dark:data-[affix=true]:shadow-[0_0_16px_0_black] px-5 ${classname}`}>
      <Tag className={stencilHeadings.has(heading) ? `${sirinStencil.className} text-3xl leading-9 font-normal` : undefined}>{heading}</Tag>
    </div>
  );
};

export default SectionHeading;
