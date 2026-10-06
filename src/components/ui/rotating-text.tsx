'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion as Motion, type Variants } from 'motion/react';

import { cn } from '@/lib/utils';

const displayDuration = 2000;
const letterStagger = 0.08;
const enterDelay = 0.34;
const enterDuration = 0.38;

// Letter-flip sequence adapted from https://codepen.io/pamelaszymaniec/pen/NWKxRjN.
const letterVariants: Variants = {
  behind: { rotateX: -90 },
  visible: (index: number) => ({
    rotateX: 0,
    transition: {
      duration: enterDuration,
      delay: enterDelay + index * letterStagger,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  }),
  out: (index: number) => ({
    rotateX: 90,
    transition: {
      duration: 0.32,
      delay: index * letterStagger,
      ease: [0.55, 0.055, 0.675, 0.19],
    },
  }),
};

const motionQuery = '(prefers-reduced-motion: reduce)';

const subscribeToMotionPreference = (notify: () => void) => {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener('change', notify);
  return () => preference.removeEventListener('change', notify);
};

const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => false;

interface RotatingTextProps {
  texts: string[];
  className?: string;
}

export const RotatingText = ({ texts, className }: RotatingTextProps) => {
  const [index, setIndex] = useState(0);
  const longestText = Math.max(0, ...texts.map((text) => Array.from(text).length));
  const transitionDuration =
    enterDelay + Math.max(0, longestText - 1) * letterStagger + enterDuration;
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

  useEffect(() => {
    if (reducedMotion || texts.length < 2) return;

    let timeout: number;
    const rotate = () => {
      setIndex((current) => (current + 1) % texts.length);
      timeout = window.setTimeout(rotate, displayDuration + transitionDuration * 1000);
    };

    timeout = window.setTimeout(rotate, displayDuration);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, texts.length, transitionDuration]);

  return (
    <div className={cn('relative h-lh w-full text-left whitespace-nowrap', className)}>
      <span className="sr-only">{texts.join(', ')}</span>
      <div className="absolute inset-0" aria-hidden="true">
        {reducedMotion ? (
          <span className="absolute inset-x-0 top-0 inline-block w-full">{texts[0]}</span>
        ) : (
          <AnimatePresence initial={false} mode="sync">
            <Motion.span
              key={index}
              className="absolute inset-x-0 top-0 inline-block w-full"
              initial="behind"
              animate="visible"
              exit="out"
            >
              {Array.from(texts[index] ?? '').map((letter, letterIndex) => (
                <Motion.span
                  key={letterIndex}
                  className="inline-block"
                  style={{ transformOrigin: '50% 50% 0.625em', backfaceVisibility: 'hidden' }}
                  custom={letterIndex}
                  variants={letterVariants}
                >
                  {letter === ' ' ? '\u00a0' : letter}
                </Motion.span>
              ))}
            </Motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
