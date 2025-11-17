import { useEffect, useRef, useState } from 'react';

interface UseAutoScaleOptions {
  headerOffset?: number; // 헤더 영역 (기본값: 100px)
  minScale?: number; // 최소 스케일 (기본값: 0.5)
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

      // 가용 높이: 100vh에서 헤더 영역 제외
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - headerOffset;
      
      // 실제 콘텐츠 높이 측정
      const contentHeight = containerRef.current.scrollHeight;

      // 스케일 계산: 콘텐츠가 가용 높이보다 크면 축소
      if (contentHeight > availableHeight) {
        const calculatedScale = availableHeight / contentHeight;
        const finalScale = Math.max(calculatedScale, minScale);
        setScale(finalScale);
      } else {
        setScale(1);
      }
    };

    // 초기 계산
    setTimeout(calculateScale, 0);
    
    // 약간의 지연 후 재계산 (폰트/이미지 로드 대기)
    setTimeout(calculateScale, 100);
    setTimeout(calculateScale, 300);

    // 창 크기 변경시 재계산
    window.addEventListener('resize', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
    };
  }, [headerOffset, minScale]);

  return { containerRef, scale };
};
