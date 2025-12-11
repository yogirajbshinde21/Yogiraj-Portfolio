import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Sparkles = ({ className, size = 1.2, color = "#FFC107", ...props }) => {
  return (
    <svg
      className={cn("animate-pulse", className)}
      width={size * 24}
      height={size * 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
        fill={color}
      />
    </svg>
  );
};

export const SparklesCore = ({ className, particleColor = "#FFC107" }) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Sparkles size={0.5} color={particleColor} />
        </motion.div>
      ))}
    </div>
  );
};
