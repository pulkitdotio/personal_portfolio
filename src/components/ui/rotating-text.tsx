import { cn } from '@/lib/utils';

import styles from './rotating-text.module.css';

interface RotatingTextProps {
  texts: string[];
  className?: string;
}

export const RotatingText = ({ texts, className }: RotatingTextProps) => {
  return (
    <div className={cn('relative h-lh w-full text-left whitespace-nowrap', className)}>
      <span className="sr-only">{texts[0]}</span>
      <div className="absolute inset-0" aria-hidden="true">
        {texts.map((text, index) => (
          <span key={text} className={styles.word} style={{ animationDelay: `${index * 2.5}s` }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
