import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BackgroundBeamsWithCollision = ({ children, className }) => {
  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
