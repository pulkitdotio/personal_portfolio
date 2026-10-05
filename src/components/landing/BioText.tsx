import SectionHeading from '../common/SectionHeading';

const BioText = () => {
  return (
    <>
      <SectionHeading heading="About" />
      <div className="space-y-5 p-8 lg:mx-auto lg:w-full lg:max-w-[715px]">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-base font-normal whitespace-pre-wrap text-neutral-800 md:text-base dark:text-neutral-300">
          <ul className="list-disc space-y-2">
            <li>
              I'm a{' '}
              <b className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100">
                Full Stack Developer
              </b>{' '}
              focused on modern web applications, backend systems, and practical AI-powered products.
            </li>

            <li>
              I build products end to end with{' '}
              <b className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100">
                React, Next.js, TypeScript, and Node.js
              </b>
              , from data and API design to the interface people use.
            </li>

            <li>
              On the backend, I work with{' '}
              <b className="font-medium text-neutral-950 underline underline-offset-2 dark:text-neutral-100">
                Express, MongoDB, PostgreSQL, Supabase, Redis, and APIs
              </b>{' '}
              with a focus on clear architecture, validation, correctness, and predictable failures.
            </li>

            <li>
              I use projects to explore system design, scalability, backend systems, and failure
              behavior. I’m currently learning System Design and Advanced Backend Development.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BioText;
