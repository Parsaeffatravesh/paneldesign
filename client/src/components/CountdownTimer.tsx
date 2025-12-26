import { useState, useEffect } from "react";

interface CountdownTimerProps {
  startAt: string; // ISO string
  onExpired?: () => void;
}

export function CountdownTimer({ startAt, onExpired }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interval = prefersReducedMotion ? 60000 : 1000; // Update per minute if reduced motion, else per second

    const calculateTime = () => {
      const now = Date.now();
      const startTime = new Date(startAt).getTime();
      const remaining = Math.max(0, startTime - now);

      if (remaining === 0) {
        setIsExpired(true);
        onExpired?.();
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, interval);

    return () => clearInterval(timer);
  }, [startAt, onExpired]);

  const { hours, minutes, seconds } = timeRemaining;

  if (isExpired) {
    return <span aria-live="polite">شروع شده</span>;
  }

  if (hours === 0 && minutes === 0) {
    return <span aria-live="polite">{seconds}s</span>;
  }

  if (hours === 0) {
    return <span aria-live="polite">{minutes}m {seconds}s</span>;
  }

  return (
    <span aria-live="polite" role="timer">
      {hours}h {minutes}m
    </span>
  );
}
