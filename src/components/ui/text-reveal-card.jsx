import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextRevealCard = ({ text, revealText, className }) => {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-8", className)}>
      <div className="relative z-20">
        <motion.h2
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
        >
          {text}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-lg text-neutral-300"
        >
          {revealText}
        </motion.p>
      </div>
    </div>
  );
};
