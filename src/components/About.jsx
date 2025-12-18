import React, { useRef, useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AboutCarousel from './ui/AboutCarousel';

// Lazy load the Lanyard component for performance
const Lanyard = lazy(() => import('./ui/Lanyard'));

const About = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const lanyardRef = useRef(null);
  
  // State to track if lanyard should be mounted (first time in view)
  const [shouldMountLanyard, setShouldMountLanyard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // State for drag hint visibility - only show once per page load when section comes into view
  const [showDragHint, setShowDragHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasShownHint, setHasShownHint] = useState(false);
  
  // Handle when user drags the lanyard
  const handleLanyardDrag = useCallback(() => {
    setShowDragHint(false);
    setHasInteracted(true);
  }, []);
  
  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Intersection Observer to mount lanyard only once when About section is first visible
  useEffect(() => {
    // Check if already mounted from sessionStorage
    const alreadyMounted = sessionStorage.getItem('lanyardMounted');
    if (alreadyMounted === 'true') {
      setShouldMountLanyard(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldMountLanyard) {
            // Small delay to prioritize initial page render
            setTimeout(() => {
              setShouldMountLanyard(true);
              sessionStorage.setItem('lanyardMounted', 'true');
            }, 300);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: '100px' } // More aggressive: load only when closer
    );
    
    if (lanyardRef.current) {
      observer.observe(lanyardRef.current);
    }
    
    return () => observer.disconnect();
  }, [shouldMountLanyard]);
  
  // Show drag hint when lanyard is mounted and section is first viewed
  useEffect(() => {
    if (shouldMountLanyard && !hasInteracted && !hasShownHint) {
      // Delay showing hint to let lanyard load first
      const timer = setTimeout(() => {
        setShowDragHint(true);
        setHasShownHint(true);
        
        // Auto-hide after 5 seconds if user hasn't interacted
        const hideTimer = setTimeout(() => {
          setShowDragHint(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldMountLanyard, hasInteracted, hasShownHint]);
  
  // Premium easing
  const premiumEase = [0.16, 1, 0.3, 1];
  
  const tags = ["MERN", "Cloud", "Data Science", "Mumbai"];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "jobsforyogiraj21@gmail.com",
      link: "mailto:jobsforyogiraj21@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91-9137450935",
      link: "tel:+919137450935",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Mumbai, Maharashtra, India",
      link: null,
    },
  ];



  return (
    <section ref={sectionRef} id="about" className={`relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-950' : 'bg-[#FAF6F1]'
    }`}>
      {/* Subtle background gradient */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${
        theme === 'dark' ? 'bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950' : 'bg-gradient-to-b from-transparent via-[#F3EDE4]/30 to-transparent'
      }`} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-10 text-center md:mb-12"
        >
          <span className={`block mb-3 text-xs font-medium tracking-wider uppercase md:text-sm md:mb-4 transition-colors duration-700 ${
            theme === 'dark' ? 'text-teal-400' : 'text-[#B8704B]'
          }`}>
            Get to know me
          </span>
          <h2 className={`text-3xl tracking-tight font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl transition-colors duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-[#3D3229]'
          }`}>
            About Me
          </h2>
          
          {/* Tags Row */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
          >
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                className={`px-3 py-1 text-xs font-medium tracking-wider border rounded-full transition-colors duration-700 ${
                  theme === 'dark' 
                    ? 'text-neutral-400 border-neutral-800 bg-neutral-900/50' 
                    : 'text-[#6B5D4D] border-[#E5DCD1] bg-[#F3EDE4]/50'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05, ease: premiumEase }}
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: theme === 'dark' ? 'rgba(45, 212, 191, 0.3)' : 'rgba(184, 112, 75, 0.4)' 
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Thin horizontal divider */}
          <motion.div 
            className={`w-24 h-px mx-auto mt-8 transition-all duration-700 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-transparent via-neutral-700 to-transparent'
                : 'bg-gradient-to-r from-transparent via-[#C4B5A5] to-transparent'
            }`}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid items-center grid-cols-1 gap-8 mb-20 lg:grid-cols-12 lg:gap-12">
          {/* Lanyard 3D Card */}
          <motion.div 
            ref={lanyardRef}
            className="flex justify-center lg:col-span-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div 
              className="relative w-full"
              style={{
                height: isMobile ? '320px' : '400px',
                maxWidth: isMobile ? '100%' : '100%'
              }}
            >
              {/* Radial gradient glow behind lanyard */}
              <div 
                className="absolute inset-0 transition-all duration-500 rounded-full pointer-events-none opacity-30 blur-3xl"
                style={{
                  background: theme === 'dark'
                    ? 'radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(45, 212, 191, 0) 70%)'
                    : 'radial-gradient(circle, rgba(184, 112, 75, 0.25) 0%, rgba(184, 112, 75, 0) 70%)',
                  transform: 'scale(1.2)',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  marginTop: '-50%',
                  marginLeft: '-50%'
                }}
              />
              
              {/* Lanyard Component with lazy loading */}
              <Suspense fallback={
                <div className="flex items-center justify-center w-full h-full">
                  <div className={`w-8 h-8 border-2 rounded-full animate-spin transition-colors duration-500 ${
                    theme === 'dark' ? 'border-teal-400 border-t-transparent' : 'border-[#B8704B] border-t-transparent'
                  }`}></div>
                </div>
              }>
                {shouldMountLanyard && (
                  <Lanyard 
                    isMobile={isMobile}
                    transparent={true}
                    onDrag={handleLanyardDrag}
                  />
                )}
              </Suspense>
              
              {/* Animated drag hint - shows only on first view */}
              <AnimatePresence>
                {showDragHint && !hasInteracted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1],
                      exit: { duration: 0.3 }
                    }}
                    className="absolute inset-x-0 z-10 flex justify-center pointer-events-none buttom-4 bottom-4"
                  >
                    <div className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-md transition-colors duration-500 ${
                      theme === 'dark' 
                        ? 'bg-neutral-900/80 border border-neutral-700/50' 
                        : 'bg-[#F3EDE4]/80 border border-[#E5DCD1]/50'
                    }`}>
                      {/* Animated downward arrow */}
                      <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className={`text-2xl transition-colors duration-500 ${
                          theme === 'dark' ? 'text-teal-400' : 'text-[#B8704B]'
                        }`}
                      >
                        ↓
                      </motion.div>
                      
                      {/* Hint text */}
                      <span 
                        className={`text-xs font-medium tracking-wide transition-colors duration-500 ${
                          theme === 'dark' ? 'text-neutral-300' : 'text-[#6B5D4D]'
                        }`}
                      >
                        Drag down for a surprise
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* About Carousel */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
          >
            <AboutCarousel />
          </motion.div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: premiumEase 
              }}
              whileHover={{ 
                y: -6, 
                transition: { duration: 0.3, ease: premiumEase }
              }}
            >
              {contact.link ? (
                <a 
                  href={contact.link} 
                  className={`block p-6 transition-all duration-500 border rounded-2xl group ${
                    theme === 'dark'
                      ? 'border-neutral-800 bg-neutral-900/50 hover:border-teal-500/30 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-teal-500/5'
                      : 'border-[#E5DCD1] bg-[#F3EDE4]/50 hover:border-[#B8704B]/40 hover:bg-[#F3EDE4]/80 hover:shadow-lg hover:shadow-[#B8704B]/10'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`p-3 transition-colors duration-500 rounded-xl group-hover:bg-opacity-10 ${
                        theme === 'dark'
                          ? 'text-teal-400 bg-neutral-800 group-hover:bg-teal-500/10'
                          : 'text-[#B8704B] bg-[#EBE3D9] group-hover:bg-[#B8704B]/10'
                      }`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className={`mb-1 text-xs tracking-wider uppercase transition-colors duration-700 ${
                        theme === 'dark' ? 'text-neutral-500' : 'text-[#8C7B6B]'
                      }`}>{contact.label}</p>
                      <p className={`text-sm font-medium truncate transition-colors duration-700 ${
                        theme === 'dark' ? 'text-neutral-200' : 'text-[#3D3229]'
                      }`}>{contact.value}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className={`p-6 border rounded-2xl transition-colors duration-700 ${
                  theme === 'dark' ? 'border-neutral-800 bg-neutral-900/50' : 'border-[#E5DCD1] bg-[#F3EDE4]/50'
                }`}>
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`p-3 rounded-xl transition-colors duration-700 ${
                        theme === 'dark' ? 'text-teal-400 bg-neutral-800' : 'text-[#B8704B] bg-[#EBE3D9]'
                      }`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className={`mb-1 text-xs tracking-wider uppercase transition-colors duration-700 ${
                        theme === 'dark' ? 'text-neutral-500' : 'text-[#8C7B6B]'
                      }`}>{contact.label}</p>
                      <p className={`text-sm font-medium transition-colors duration-700 ${
                        theme === 'dark' ? 'text-neutral-200' : 'text-[#3D3229]'
                      }`}>{contact.value}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
