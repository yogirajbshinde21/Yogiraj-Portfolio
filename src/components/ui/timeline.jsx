import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const Timeline = ({ data }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      className={`w-full font-sans md:px-10 transition-colors duration-700 ${
        theme === 'dark' ? 'bg-neutral-950' : 'bg-transparent'
      }`}
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-10 md:pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} isMobile={isMobile} theme={theme} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className={`absolute left-[14px] md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ${
            theme === 'dark' ? 'via-neutral-800' : 'via-stone-400'
          }`}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={`absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[0%] via-[10%] rounded-full ${
              theme === 'dark' 
                ? 'from-teal-500 via-teal-400 to-transparent shadow-[0_0_10px_rgba(45,212,191,0.5)]'
                : 'from-teal-500 via-teal-400 to-transparent shadow-[0_0_10px_rgba(20,184,166,0.5)]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index, isMobile, theme }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false, amount: isMobile ? 0.2 : 0.3, margin: isMobile ? "-50px" : "-100px" });
  const premiumEase = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: premiumEase
      }}
      className="flex justify-start pt-8 md:pt-40 md:gap-10"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-24 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <motion.div 
          className={`h-8 w-8 md:h-10 md:w-10 absolute left-0 md:left-3 rounded-full flex items-center justify-center transition-colors duration-700 ${
            theme === 'dark' ? 'bg-neutral-950' : 'bg-amber-50'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2, ease: premiumEase }}
        >
          <motion.div 
            className={`h-3 w-3 md:h-4 md:w-4 rounded-full border-[3px] md:border-4 transition-colors duration-700 ${
              theme === 'dark' 
                ? 'bg-teal-500 border-neutral-950'
                : 'bg-teal-500 border-amber-50'
            }`}
            animate={isInView ? { 
              boxShadow: theme === 'dark' 
                ? '0 0 15px rgba(45, 212, 191, 0.6)'
                : '0 0 15px rgba(20, 184, 166, 0.6)'
            } : {
              boxShadow: '0 0 0px rgba(45, 212, 191, 0)'
            }}
          />
        </motion.div>
        <h3 className={`hidden md:block text-xl md:pl-20 md:text-5xl font-editorial-regular transition-colors duration-700 ${
          theme === 'dark' ? 'text-neutral-500' : 'text-stone-400'
        }`}>
          {item.title}
        </h3>
      </div>

      <div className="relative pl-12 pr-2 md:pl-4 md:pr-4 w-full">
        <h3 className={`md:hidden block text-xl sm:text-2xl mb-3 text-left font-editorial-regular transition-colors duration-700 ${
          theme === 'dark' ? 'text-neutral-500' : 'text-stone-400'
        }`}>
          {item.title}
        </h3>
        {item.content}
      </div>
    </motion.div>
  );
};
