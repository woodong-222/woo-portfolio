import { useEffect, useRef, useState } from 'react';

interface UseAutoScaleOptions {
  headerOffset?: number;
  minScale?: number;
}

export const useAutoScale = (options: UseAutoScaleOptions = {}) => {
  const {
    headerOffset = 100,
    minScale = 0.5,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - headerOffset;
      
      const contentHeight = containerRef.current.scrollHeight;

      if (contentHeight > availableHeight) {
        const calculatedScale = availableHeight / contentHeight;
        const finalScale = Math.max(calculatedScale, minScale);
        setScale(finalScale);
      } else {
        setScale(1);
      }
    };

    setTimeout(calculateScale, 0);
    
    setTimeout(calculateScale, 100);
    setTimeout(calculateScale, 300);

    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [headerOffset, minScale]);

  return { containerRef, scale };
};
