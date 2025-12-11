import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const { scrollYProgress: contentScrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(contentScrollYProgress, [0, 1], [0, -300]);

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow: "0px 0px 0px 4px rgba(168, 85, 247, 0.1), 0px 0px 0px 8px rgba(6, 182, 212, 0.1)",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm dark:border-neutral-700"
        />
        <svg
          viewBox="0 0 20 20"
          width="20"
          height="20"
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d="M 1 0V -36 l 18 24 V 0 Z"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#a855f7" stopOpacity="0"></stop>
              <stop stopColor="#a855f7"></stop>
              <stop offset="0.325" stopColor="#06b6d4"></stop>
              <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
