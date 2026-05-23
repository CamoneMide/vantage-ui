import { useEffect, useState } from 'react';

export function useCountUp(targetValue: number, duration = 400): number {
  const [count, setCount] = useState(targetValue);

  useEffect(() => {
    const start = count;
    const end = targetValue;
    const frameId = { current: 0 };

    if (start !== end) {
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = progress * (2 - progress);
        const currentValue = Math.round(start + (end - start) * easedProgress);

        setCount(currentValue);

        if (progress < 1) {
          frameId.current = requestAnimationFrame(updateCount);
        }
      };

      frameId.current = requestAnimationFrame(updateCount);
    }

    return () => cancelAnimationFrame(frameId.current);
  }, [targetValue, duration]);

  return count;
}
