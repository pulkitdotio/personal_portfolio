import Image from 'next/image';

// Match the reference banner's narrow 16px feather on all four edges.
const bannerMask = [
  'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)',
  'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
].join(', ');

const TopBanner = () => {
  return (
    <div className="after:z relative h-40 w-full max-w-screen items-center justify-between gap-2 overflow-visible p-1 transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-neutral-100 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 sm:h-50 dark:after:bg-neutral-900 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src="/waterfall-banner.gif.gif"
          alt="Animated waterfall flowing over rocks"
          fill
          sizes="(min-width: 1024px) 800px, (min-width: 768px) 715px, 100vw"
          unoptimized
          loading="eager"
          className="object-cover object-bottom"
          style={{
            WebkitMaskImage: bannerMask,
            WebkitMaskComposite: 'destination-in',
            maskImage: bannerMask,
            maskComposite: 'intersect',
          }}
        />
      </div>
    </div>
  );
};

export default TopBanner;
