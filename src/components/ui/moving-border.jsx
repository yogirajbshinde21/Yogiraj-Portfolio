import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Button = ({ children, className, containerClassName, borderClassName, duration = 2000, ...props }) => {
  return (
    <button
      className={cn(
        "relative text-xl p-[1px] overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-lg">
        <motion.div
          className={cn(
            "h-full w-full",
            borderClassName
          )}
          style={{
            background: `linear-gradient(90deg, #a855f7, #06b6d4, #ec4899, #a855f7)`,
            backgroundSize: "400% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <span
        className={cn(
          "relative z-10 block px-8 py-3 rounded-lg bg-black text-white font-semibold",
          className
        )}
      >
        {children}
      </span>
    </button>
  );
};
