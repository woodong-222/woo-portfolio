import type { Variants } from 'framer-motion';

export const createVariants = <T extends Record<string, any>>(variants: T): Variants => {
  return variants as Variants;
};
