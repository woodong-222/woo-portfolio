import type { Variants } from 'framer-motion';

// Framer Motion variants 타입 헬퍼
export const createVariants = <T extends Record<string, any>>(variants: T): Variants => {
  return variants as Variants;
};
