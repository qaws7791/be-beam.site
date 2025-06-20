// 대량 렌더링 최적화: 점진적 렌더링(500 - 2,000)

import { useEffect, useState, useTransition } from 'react';

export default function useProgressiveRender<T>(
  items: T[],
  initialCount = 12,
  chunkSize = 24,
  intervalMs = 30,
) {
  const [renderedItems, setRenderedItems] = useState<T[]>([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!items.length) return;

    const latestChunk = items.slice(0, initialCount);
    const remaining = items.slice(initialCount);

    setRenderedItems(latestChunk);

    let i = 0;
    const interval = setInterval(() => {
      startTransition(() => {
        const nextChunk = remaining.slice(i, i + chunkSize);
        setRenderedItems((prev) => [...prev, ...nextChunk]);
        i += chunkSize;

        if (i >= remaining.length) {
          clearInterval(interval);
        }
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [items, initialCount, chunkSize, intervalMs]);

  return { renderedItems };
}
