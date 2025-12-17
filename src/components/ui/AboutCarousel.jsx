import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AboutCarousel = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const SLIDE_DURATION = 6000; // 6 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms
  
  const slides = [
    {
      label: "WHO I AM",
      lines: [
        "I'm Yogiraj, a developer from Mumbai.",
        "Final-year IT engineering student pursuing a parallel BS in Data Science from IIT Madras.",
        "I chose both paths because real problems need both logic and insight to solve."
      ]
    },
    {
      label: "WHAT I DO",
      lines: [
        "I build full-stack web applications with a focus on real-time experiences.",
        "From live stock trading simulations to AI-powered chat summaries,",
        "I create features that respond instantly and solve real problems."
      ]
    },
    {
      label: "WHAT DRIVES ME",
      lines: [
        "I've failed more times than I'd like to admit.",
        "But every setback became a lesson, pushing me to think sharper and build better.",
        "Growth always lives outside the comfort zone."
      ]
    },
    {
      label: "MY APPROACH",
      lines: [
        "I value clarity over complexity.",
        "Understanding the problem matters more than rushing to code.",
        "Simple, thoughtful solutions always outperform over-engineered ones.",
        "That's the mindset I bring to every project."
      ]
    },
    {
      label: "BEYOND CODE",
      lines: [
        "Recognized as LinkedIn Top Voice 2024 for authentic tech perspectives.",
        "My toolkit: React, Node.js, MongoDB, Socket.io, and AI integrations.",
        "I'm passionate about building tech that creates real impact for communities."
      ]
    }
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside carousel on mobile to resume
  useEffect(() => {
    if (!isMobile) return;
    
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsPaused(false);
      }
    };
    
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile]);

  // Navigate to specific slide
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  // Auto-play logic with progress
  useEffect(() => {
    if (isPaused || reduceMotion) {
      clearInterval(progressIntervalRef.current);
      clearTimeout(autoPlayTimeoutRef.current);
      return;
    }

    // Progress bar update
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (SLIDE_DURATION / PROGRESS_INTERVAL));
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, PROGRESS_INTERVAL);

    // Auto advance slide
    autoPlayTimeoutRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearTimeout(autoPlayTimeoutRef.current);
    };
  }, [currentSlide, isPaused, nextSlide, reduceMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    // On mobile, pause when user touches the carousel
    if (isMobile) {
      setIsPaused(true);
    }
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    // On mobile, keep paused after swipe - user needs to tap outside to resume
  };

  // Handle click/tap on carousel to pause (mobile)
  const handleCarouselClick = (e) => {
    if (isMobile) {
      // Don't pause if clicking navigation buttons
      if (e.target.closest('button')) return;
      setIsPaused(true);
    }
  };

  // Pause handlers - only for desktop (mouse events)
  const handleMouseEnter = () => {
    if (!isMobile) setIsPaused(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsPaused(false);
  };
  const handleFocus = () => setIsPaused(true);
  const handleBlur = (e) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsPaused(false);
    }
  };

  // Animation variants
  const slideVariants = reduceMotion 
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        enter: (direction) => ({
          x: direction > 0 ? 50 : -50,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (direction) => ({
          x: direction < 0 ? 50 : -50,
          opacity: 0,
        }),
      };

  const [[page, direction], setPage] = useState([0, 0]);

  // Update page with direction for animations
  const paginate = useCallback((newDirection) => {
    const newIndex = (currentSlide + newDirection + slides.length) % slides.length;
    setPage([newIndex, newDirection]);
    setCurrentSlide(newIndex);
    setProgress(0);
  }, [currentSlide, slides.length]);

  // Sync page state with currentSlide
  useEffect(() => {
    setPage([currentSlide, 0]);
  }, [currentSlide]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleCarouselClick}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="About me carousel"
    >
      {/* Main Carousel Content - Square-like card */}
      <div className={`relative overflow-hidden rounded-2xl border transition-colors duration-500 h-[380px] sm:h-[380px] md:h-[400px] flex flex-col ${
        theme === 'dark'
          ? 'bg-neutral-900/60 border-neutral-800 backdrop-blur-sm'
          : 'bg-[#F3EDE4]/60 border-[#E5DCD1] backdrop-blur-sm'
      }`}>
        {/* Slide Content */}
        <div className="relative flex flex-col justify-center flex-1 p-5 overflow-hidden sm:p-6 md:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: reduceMotion ? 0.1 : 0.3 },
              }}
              className="space-y-3 sm:space-y-4"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Slide Label */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.1, duration: reduceMotion ? 0.1 : 0.3 }}
                className={`inline-block px-3 py-1.5 text-xs font-semibold tracking-widest rounded-full transition-colors duration-500 ${
                  theme === 'dark'
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                    : 'bg-[#B8704B]/10 text-[#B8704B] border border-[#B8704B]/30'
                }`}
              >
                {slides[currentSlide].label}
              </motion.span>

              {/* Slide Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0.1 : 0.4 }}
                className="space-y-2 sm:space-y-3"
              >
                {slides[currentSlide].lines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: reduceMotion ? 0 : 0.15 + (index * 0.08),
                      duration: reduceMotion ? 0.1 : 0.3 
                    }}
                    className={`text-[15px] sm:text-lg md:text-xl leading-relaxed transition-colors duration-500 ${
                      index === 0 
                        ? theme === 'dark' ? 'text-neutral-100 font-normal' : 'text-[#3D3229] font-normal'
                        : theme === 'dark' ? 'text-neutral-300 font-light' : 'text-[#6B5D4D] font-light'
                    }`}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section - Navigation & Progress inside card */}
        <div className={`px-5 sm:px-6 md:px-8 pb-4 sm:pb-5 pt-3 border-t flex-shrink-0 transition-colors duration-500 ${
          theme === 'dark' ? 'border-neutral-800/50' : 'border-[#E5DCD1]/50'
        }`}>
          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => {
                  prevSlide();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  theme === 'dark'
                    ? 'border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-teal-500/30 focus:ring-teal-500 focus:ring-offset-neutral-900'
                    : 'border-[#E5DCD1] bg-[#EBE3D9]/80 text-[#6B5D4D] hover:bg-[#E5DCD1] hover:text-[#3D3229] hover:border-[#B8704B]/30 focus:ring-[#B8704B] focus:ring-offset-[#FAF6F1]'
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={() => {
                  nextSlide();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  theme === 'dark'
                    ? 'border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-teal-500/30 focus:ring-teal-500 focus:ring-offset-neutral-900'
                    : 'border-[#E5DCD1] bg-[#EBE3D9]/80 text-[#6B5D4D] hover:bg-[#E5DCD1] hover:text-[#3D3229] hover:border-[#B8704B]/30 focus:ring-[#B8704B] focus:ring-offset-[#FAF6F1]'
                }`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>

              {/* Slide Counter */}
              <span className={`ml-3 text-sm font-mono transition-colors duration-500 ${
                theme === 'dark' ? 'text-neutral-500' : 'text-[#8C7B6B]'
              }`}>
                {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Dot Indicators */}
            <div 
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Carousel navigation"
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 rounded-full ${
                    theme === 'dark' 
                      ? 'focus:ring-teal-500 focus:ring-offset-neutral-900' 
                      : 'focus:ring-[#B8704B] focus:ring-offset-[#FAF6F1]'
                  }`}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Go to slide ${index + 1}: ${slides[index].label}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? `w-6 h-2 ${theme === 'dark' ? 'bg-teal-400' : 'bg-[#B8704B]'}`
                        : `w-2 h-2 ${theme === 'dark' ? 'bg-neutral-600 hover:bg-neutral-500' : 'bg-[#C4B5A5] hover:bg-[#A89888]'}`
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`mt-3 h-1 w-full rounded-full overflow-hidden transition-colors duration-500 ${
            theme === 'dark' ? 'bg-neutral-800' : 'bg-[#E5DCD1]'
          }`}>
            <motion.div
              className={`h-full rounded-full transition-colors duration-500 ${
                theme === 'dark' ? 'bg-teal-400' : 'bg-[#B8704B]'
              }`}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Pause Indicator */}
      <AnimatePresence>
        {isPaused && !reduceMotion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded transition-colors duration-500 ${
              theme === 'dark'
                ? 'bg-neutral-800/90 text-neutral-400'
                : 'bg-[#EBE3D9]/90 text-[#6B5D4D]'
            }`}
          >
            Paused
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutCarousel;
