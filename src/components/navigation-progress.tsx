import { useEffect, useRef, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';

import { Progress } from '@/components/ui/progress';

export function NavigationProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' });
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTicker() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(10);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearTicker(); // slow crawl stops at 85, never reaches 100
            return prev;
          }
          // slows down as it approaches 85
          return prev + (85 - prev) * 0.08;
        });
      }, 150);
    } else {
      clearTicker();
      setProgress(100); // navigation done — complete it
      const reset = setTimeout(() => setProgress(0), 400); // then hide
      return () => clearTimeout(reset);
    }

    return clearTicker;
  }, [isLoading]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  );
}
