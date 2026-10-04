import { profile } from '@/config/site';

import Container from './Container';
import BioText from '../landing/BioText';
import SocialLinks from '../landing/SocialLinks';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GitHubLogo } from '../icons/tech/GithubLogo';
import RepeatSeparator from '../ui/repeat-separator';
import Image from 'next/image';

const Hero = () => {
  return (
    <Container className={`flex flex-col items-start justify-center`}>
      <div className="flex h-full w-full">
        <div className="p-5">
          <div className="w-fit rounded-[9px] border p-[3.8px] dark:border-neutral-700">
            <div className="box-border h-25 w-25 overflow-hidden rounded-[8px] border bg-neutral-200 object-cover p-1 select-none md:h-30 md:w-30 dark:bg-white">
              <Image
                src="/identity/feather.webp"
                alt="Pulkit Sharma's feather identity mark"
                height={120}
                width={120}
                priority
                className="box-border h-full w-full object-contain transition-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center md:gap-1">
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="custom" asChild>
                  <a
                    href={profile.githubUrl}
                    aria-label="Pulkit Sharma on GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>
                        <GitHubLogo />
                      </span>
                      GitHub
                    </div>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View GitHub profile</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <h1 className="flex w-full flex-col text-2xl font-medium text-neutral-700 md:pb-0.5 md:text-3xl dark:text-neutral-50">
            {profile.name}
          </h1>
          <span className="flex items-center gap-2 text-sm font-medium text-neutral-500/70 md:text-base dark:text-neutral-400">
            {profile.role}
          </span>
          <p className="text-xs font-medium text-neutral-500/70 dark:text-neutral-400">
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
