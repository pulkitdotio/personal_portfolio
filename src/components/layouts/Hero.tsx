import { profile } from '@/config/site';

import Container from './Container';
import BioText from '../landing/BioText';
import SocialLinks from '../landing/SocialLinks';
import RepeatSeparator from '../ui/repeat-separator';
import Image from 'next/image';
import { sirinStencil } from '@/lib/fonts';
import { MapPin } from 'lucide-react';
import { RotatingText } from '../ui/rotating-text';
import IndiaClock from '../landing/IndiaClock';
import { GlareHover } from '../ui/glare-hover';

const roles = ['Full Stack Developer', 'Software Engineer', 'MERN Stack Builder'];

const Hero = () => {
  return (
    <Container className={`flex flex-col items-start justify-center`}>
      <div className="flex h-full w-full">
        <div className="p-5 max-sm:pl-2">
          <GlareHover
            duration={1400}
            color="#ffffff"
            opacity={0.2}
            angle={-45}
            size={250}
            background="transparent"
            playOnce
            className="block cursor-default rounded-[9px] before:ease-in-out motion-reduce:before:hidden [@media(hover:none)]:before:hidden"
          >
            <div className="w-fit rounded-[9px] border p-[3.8px] dark:border-neutral-700">
              <div className="h-[92px] w-[92px] overflow-hidden rounded-[8px] select-none md:h-[108px] md:w-[108px]">
                <Image
                  src="/identity/file_00000000e05c8208a0e8984bb4619186.png"
                  alt="Pulkit Sharma's profile picture"
                  height={1254}
                  width={1254}
                  sizes="(min-width: 768px) 108px, 92px"
                  preload
                  className="block aspect-square h-full w-full object-cover object-center transition-none"
                />
              </div>
            </div>
          </GlareHover>
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
