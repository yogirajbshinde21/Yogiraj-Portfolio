import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const WobbleCard = ({ children, containerClassName, className }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration: 0.3,
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        containerClassName
      )}
    >
      <div
        className={cn(
          "relative h-full w-full",
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
