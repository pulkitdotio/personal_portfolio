import { profile } from '@/config/site';

import Container from './Container';
import BioText from '../landing/BioText';
import SocialLinks from '../landing/SocialLinks';
import RepeatSeparator from '../ui/repeat-separator';
import Image from 'next/image';

const Hero = () => {
  return (
    <Container className={`flex flex-col items-start justify-center`}>
      <div className="flex h-full w-full">
        <div className="p-5">
          <div className="w-fit rounded-[9px] border p-[3.8px] dark:border-neutral-700">
            <div className="box-border h-25 w-25 overflow-hidden rounded-[8px] border bg-neutral-200 select-none md:h-30 md:w-30 dark:bg-white">
              <Image
                src="/identity/feather-profile.png"
                alt="Pulkit Sharma's feather identity mark"
                height={1254}
                width={1254}
                sizes="(min-width: 768px) 118px, 98px"
                preload
                className="box-border aspect-square h-full w-full object-cover object-center transition-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center md:gap-1">
          <h1 className="flex w-full flex-col text-2xl font-medium text-neutral-700 md:pb-0.5 md:text-3xl dark:text-neutral-50">
            {profile.name}
          </h1>
          <span className="flex items-center gap-2 text-sm font-medium text-neutral-500 md:text-base dark:text-neutral-400">
            {profile.role}
          </span>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {profile.location}
          </p>
        </div>
      </div>
      <RepeatSeparator />
      <BioText />
      <RepeatSeparator />
      <SocialLinks />
    </Container>
  );
};

export default Hero;
