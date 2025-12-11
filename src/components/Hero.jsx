import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Particles from './ui/Particles';

const Hero = () => {
  const titles = ["MERN Stack Developer", "Full Stack Engineer", "Data Science Enthusiast", "Problem Solver"];
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Parallax effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 50 : 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? 30 : 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Premium easing
  const premiumEase = [0.16, 1, 0.3, 1];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setIsTyping(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-neutral-950">
      {/* Particles Background - Optimized for mobile, full interactivity on desktop */}
      <div className="absolute inset-0 z-[1]">
        <Particles
          particleColors={['#ffffff', '#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1']}
          particleCount={isMobile ? 80 : 250}
          particleSpread={isMobile ? 8 : 10}
          speed={isMobile ? 0.05 : 0.1}
          particleBaseSize={isMobile ? 80 : 120}
          moveParticlesOnHover={isMobile ? false : true}
          particleHoverFactor={1.5}
          alphaParticles={false}
          disableRotation={isMobile ? true : false}
          sizeRandomness={1.2}
          cameraDistance={20}
          pixelRatio={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        />
      </div>

      {/* Very subtle gradient overlay - minimal to keep particles bright */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/10 to-neutral-950/40 z-[2] pointer-events-none" />
      
      {/* Subtle dot pattern with parallax */}
      <motion.div 
        className="absolute inset-0 bg-dot-pattern opacity-10 z-[3] pointer-events-none" 
        style={{ y: y2 }}
      />
      
      <motion.div 
        className="relative z-[10] flex items-center justify-center min-h-screen px-6 lg:px-12 pointer-events-none"
        style={{ opacity }}
      >
        {/* Main Content with parallax */}
        <motion.div 
          className="relative z-[20] w-full max-w-6xl mx-auto text-center pointer-events-none"
          style={{ y: y1 }}
        >
          
          {/* Main Heading with Editorial Font - Subtle fade up from 20px */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="mb-6 pointer-events-none md:mb-8"
          >
            <motion.h1 
              className="mb-4 text-4xl leading-none tracking-tight text-white pointer-events-none select-none font-editorial-ultralight sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: premiumEase }}
            >
              Yogiraj Shinde
            </motion.h1>
            
            <motion.div 
              className="w-16 h-px mx-auto mb-6 pointer-events-none md:w-24 md:mb-8 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: premiumEase }}
            />
            
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-2 text-base font-light pointer-events-none select-none sm:gap-3 md:text-xl lg:text-2xl text-neutral-400"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: premiumEase }}
            >
              <span>A</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitle}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: premiumEase }}
                  className="font-normal text-teal-400"
                >
                  {titles[currentTitle]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Subtitle - Staggered fade-in */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: premiumEase }}
            className="max-w-md px-4 mx-auto mb-8 text-sm leading-relaxed pointer-events-none select-none sm:px-0 md:mb-12 md:text-lg text-neutral-500"
          >
            3+ Years Building Web Apps · 10+ Projects Shipped
          </motion.p>

          {/* CTA Buttons - Smooth stagger, optimized for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: premiumEase }}
            className="flex flex-col items-center justify-center w-full gap-3 px-4 pointer-events-auto sm:flex-row sm:gap-4 sm:px-0"
          >
            <motion.button
              onClick={() => scrollToSection('#projects')}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 bg-white rounded-full pointer-events-auto sm:w-auto sm:px-8 group text-neutral-900 hover:bg-teal-400 hover:text-neutral-900 hover:shadow-lg hover:shadow-teal-500/20 active:scale-95"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : undefined}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              View Projects
            </motion.button>
            <motion.a
              href="https://drive.google.com/file/d/1uD8iXf21kDryKG5SruDaWzWuUxWCqNTc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-center transition-all duration-300 border rounded-full pointer-events-auto sm:w-auto sm:px-8 border-neutral-700 text-neutral-300 hover:border-teal-500/50 hover:text-teal-400 active:scale-95"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : undefined}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              View Resume
            </motion.a>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 border rounded-full pointer-events-auto sm:w-auto sm:px-8 border-neutral-700 text-neutral-300 hover:border-teal-500/50 hover:text-teal-400 active:scale-95"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : undefined}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with float animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1, ease: premiumEase }}
          className="absolute transform -translate-x-1/2 pointer-events-none bottom-12 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center w-5 h-8 pt-2 border rounded-full border-neutral-600"
          >
            <motion.div 
              className="w-0.5 h-2 bg-neutral-500 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
