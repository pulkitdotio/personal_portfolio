import { profile } from '@/config/site';

import Container from './Container';
import BioText from '../landing/BioText';
import SocialLinks from '../landing/SocialLinks';
import RepeatSeparator from '../ui/repeat-separator';
import Image from 'next/image';
import { Sirin_Stencil } from 'next/font/google';
import { MapPin } from 'lucide-react';
import { RotatingText } from '../ui/rotating-text';
import IndiaClock from '../landing/IndiaClock';

const sirinStencil = Sirin_Stencil({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const roles = ['Full Stack Developer', 'Software Engineer', 'MERN Stack Builder'];

const Hero = () => {
  return (
    <Container className={`flex flex-col items-start justify-center`}>
      <div className="flex h-full w-full">
        <div className="p-5">
          <div className="w-fit rounded-[9px] border p-[3.8px] dark:border-neutral-700">
            <div className="box-border h-[92px] w-[92px] overflow-hidden rounded-[8px] border bg-neutral-200 select-none md:h-[108px] md:w-[108px] dark:bg-white">
              <Image
                src="/identity/feather-profile.png"
                alt="Pulkit Sharma's feather identity mark"
                height={1254}
                width={1254}
                sizes="(min-width: 768px) 106px, 90px"
                preload
                className="box-border aspect-square h-full w-full object-cover object-center transition-none"
              />
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center md:gap-1">
          <h1
            className={`${sirinStencil.className} flex w-full flex-col text-2xl font-normal text-neutral-700 md:pb-0.5 md:text-3xl dark:text-neutral-50`}
          >
            {profile.name}
          </h1>
          <RotatingText
            texts={roles}
            className="h-5 text-sm leading-5 font-medium text-neutral-500 md:h-6 md:text-base md:leading-6 dark:text-neutral-400"
          />
          <p className="flex items-center gap-1.5 text-xs font-light whitespace-nowrap text-neutral-500 dark:text-neutral-400">
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            <span>India</span>
            <span aria-hidden="true">•</span>
            <IndiaClock />
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
