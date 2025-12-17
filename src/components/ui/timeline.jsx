"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const Timeline = ({ data }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-16 md:pt-44 md:gap-10"
          >
            {/* Left side - Sticky container for dot and title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline dot */}
              <div className={`h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-neutral-950' : 'bg-[#F3EDE4]'
              }`}>
                <div className={`h-4 w-4 rounded-full border-4 p-2 ${
                  theme === 'dark' 
                    ? 'bg-neutral-800 border-neutral-700' 
                    : 'bg-[#EBE3D9] border-[#E5DCD1]'
                }`} />
              </div>
              {/* Date title - sticky alongside the dot */}
              <h3 className={`hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-editorial-regular ${
                theme === 'dark' ? 'text-neutral-500' : 'text-[#C4B5A5]'
              }`}>
                {item.title}
              </h3>
            </div>

            {/* Right side - Content area */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Mobile date */}
              <h3 className={`md:hidden block text-xl mb-4 text-left font-editorial-regular ${
                theme === 'dark' ? 'text-neutral-500' : 'text-[#C4B5A5]'
              }`}>
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        {/* Timeline line background */}
        <div
          style={{
            height: height + "px",
          }}
          className={`absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ${
            theme === 'dark' ? 'via-neutral-700' : 'via-[#E5DCD1]'
          }`}
        >
          {/* Animated beam that follows scroll */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={`absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t ${
              theme === 'dark' 
                ? 'from-teal-500 via-teal-400 to-transparent shadow-[0_0_10px_rgba(45,212,191,0.5)]'
                : 'from-[#B8704B] via-[#D4A574] to-transparent shadow-[0_0_10px_rgba(184,112,75,0.5)]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
