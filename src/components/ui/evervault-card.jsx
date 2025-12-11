import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const EvervaultCard = ({ text, className }) => {
  return (
    <div
      className={cn(
        "relative h-full w-full rounded-3xl border border-white/[0.2] bg-black p-4",
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-white font-bold text-4xl">{text}</p>
      </div>
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-cyan-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
