'use client';

import { useEffect, useState } from 'react';
import { Doto } from 'next/font/google';

const doto = Doto({
  weight: '600',
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
    <time
      className={`${doto.className} inline-block w-[8ch] shrink-0 tabular-nums`}
      aria-live="off"
    >
      {time}
    </time>
  );
};

export default IndiaClock;
