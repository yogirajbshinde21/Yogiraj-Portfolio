import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BackgroundLines = ({ children, className, svgOptions }) => {
  return (
    <div className={cn("relative flex items-center justify-center w-full", className)}>
      <div className="absolute h-full w-full inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <GridLineHorizontal />
        <GridLineVertical />
      </div>
      {children}
    </div>
  );
};

const GridLineHorizontal = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-500 to-transparent"
          style={{
            top: `${i * 5}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

const GridLineVertical = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent"
          style={{
            left: `${i * 5}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};
