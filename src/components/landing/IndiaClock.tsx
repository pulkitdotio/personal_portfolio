'use client';

import { useEffect, useState } from 'react';
import { Geist_Pixel } from 'next/font/google';
import { Clock } from 'lucide-react';

const geistPixel = Geist_Pixel({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const indiaTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const IndiaClock = () => {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const updateTime = () => setTime(indiaTime.format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <Clock className="size-3 shrink-0" aria-hidden="true" />
      <time
        className={`${geistPixel.className} inline-block w-[8ch] shrink-0 tabular-nums`}
        aria-live="off"
      >
        {time}
      </time>
    </>
  );
};

export default IndiaClock;
