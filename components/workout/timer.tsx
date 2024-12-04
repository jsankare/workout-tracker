'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 text-lg font-mono">
      <Clock className="h-5 w-5" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}