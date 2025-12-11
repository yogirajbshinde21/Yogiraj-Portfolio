import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ShootingStars = ({ starColor = "#9E00FF", trailColor = "#2EB9DF", starWidth = 10, starHeight = 1, ...props }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: [0, -300],
            y: [0, 300],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${starWidth}px`,
              height: `${starHeight}px`,
              backgroundColor: starColor,
              boxShadow: `0 0 10px ${starColor}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
