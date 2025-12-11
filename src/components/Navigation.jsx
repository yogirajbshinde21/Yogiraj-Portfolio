import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, FolderOpen, Mail } from 'lucide-react';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);

  // Premium easing - Apple-like smoothness
  const premiumEase = [0.16, 1, 0.3, 1];

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate blur amount based on scroll (0-20px blur)
      const maxBlur = 20;
      const scrollThreshold = 200;
      const calculatedBlur = Math.min((currentScrollY / scrollThreshold) * maxBlur, maxBlur);
      setBlurAmount(calculatedBlur);
      
      // Set scrolled state for background opacity
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { title: "Home", href: "#home", icon: <Home className="h-4 w-4" /> },
    { title: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { title: "Experience", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
    { title: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
    { title: "Projects", href: "#projects", icon: <FolderOpen className="h-4 w-4" /> },
    { title: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
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

  // Navigation item hover animation
  const navItemVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: premiumEase }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0,
        x: '-50%'
      }}
      transition={{ duration: 0.4, ease: premiumEase }}
      className="fixed top-6 left-1/2 z-50"
    >
      <motion.div 
        className="px-3 py-2.5 rounded-full border"
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.5)',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
          boxShadow: scrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06) inset' 
            : '0 4px 16px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        animate={{
          scale: scrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.3, ease: premiumEase }}
      >
        <ul className="flex items-center gap-1 relative overflow-hidden">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <motion.li 
                key={item.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: premiumEase 
                }}
                className="relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 380, 
                      damping: 30,
                      mass: 0.8
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.15) 0%, rgba(45, 212, 191, 0.05) 100%)',
                      border: '1px solid rgba(45, 212, 191, 0.3)',
                      boxShadow: '0 0 20px rgba(45, 212, 191, 0.1)',
                      zIndex: 0
                    }}
                  />
                )}
                <motion.button
                  onClick={() => scrollToSection(item.href)}
                  variants={navItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2
                    ${isActive 
                      ? 'text-teal-400' 
                      : 'text-neutral-400 hover:text-neutral-200'
                    }
                  `}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <span className="relative z-10 hidden sm:inline">{item.title}</span>
                  <motion.span 
                    className="relative z-10 sm:hidden"
                    animate={{ 
                      rotate: isActive ? [0, -10, 10, 0] : 0 
                    }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                  >
                    {item.icon}
                  </motion.span>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
      
      {/* Subtle glow under nav when scrolled */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
          filter: 'blur(10px)'
        }}
        animate={{
          opacity: scrolled ? 0.6 : 0,
          scale: scrolled ? 1 : 0.8
        }}
        transition={{ duration: 0.4, ease: premiumEase }}
      />
    </motion.nav>
  );
};

export default Navigation;
