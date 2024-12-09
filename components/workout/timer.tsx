"use client";

import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  onToggle: () => void;
}

export function Timer({ seconds, isRunning, onToggle }: TimerProps) {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    return hours > 0
      ? `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
      : `${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  return (
    <div className="flex items-center gap-2 text-2xl font-mono">
      <span>{formatTime(seconds)}</span>
      <Button variant="ghost" size="icon" onClick={onToggle}>
        {isRunning ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}