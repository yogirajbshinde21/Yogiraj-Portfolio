import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

// Lazy load the Lanyard component for performance
const Lanyard = lazy(() => import('./ui/Lanyard'));

const About = () => {
  const sectionRef = useRef(null);
  const lanyardRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2, margin: "-50px" });
  
  // State to track if lanyard should be mounted (first time in view)
  const [shouldMountLanyard, setShouldMountLanyard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Intersection Observer to mount lanyard only once when About section is first visible
  useEffect(() => {
    // Check if already mounted from localStorage
    const alreadyMounted = sessionStorage.getItem('lanyardMounted');
    if (alreadyMounted === 'true') {
      setShouldMountLanyard(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldMountLanyard) {
            setShouldMountLanyard(true);
            sessionStorage.setItem('lanyardMounted', 'true');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (lanyardRef.current) {
      observer.observe(lanyardRef.current);
    }
    
    return () => observer.disconnect();
  }, [shouldMountLanyard]);
  
  // Premium easing
  const premiumEase = [0.16, 1, 0.3, 1];
  
  // Split bio into structured blocks
  const bioBlocks = [
    {
      heading: "Who I am",
      text: "I'm Yogiraj, a final‑year IT engineering student and MERN stack developer who loves turning ideas into polished web experiences. Alongside my dual degree in Data Science from IITM."
    },
    {
      heading: "What I've done",
      text: "I've worked with IBM SkillsBuild and Edunet on projects that actually ship and solve real problems. My experience spans full-stack development, cloud technologies, and AI integration."
    },
    {
      heading: "What I'm excited about",
      text: "Right now, I'm excited about roles where I can write meaningful code, learn from sharp people, and keep exploring what's possible with cloud and AI."
    }
  ];

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
    <section ref={sectionRef} id="about" className="relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 bg-neutral-950">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-10 text-center md:mb-12"
        >
          <span className="block mb-3 text-xs font-medium tracking-wider text-teal-400 uppercase md:text-sm md:mb-4">
            Get to know me
          </span>
          <h2 className="text-3xl tracking-tight text-white font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl">
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
                className="px-3 py-1 text-xs font-medium tracking-wider text-neutral-400 border rounded-full border-neutral-800 bg-neutral-900/50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05, ease: premiumEase }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(45, 212, 191, 0.3)' }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Thin horizontal divider */}
          <motion.div 
            className="w-24 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-neutral-700 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid items-start grid-cols-1 gap-12 mb-20 lg:grid-cols-12 lg:gap-16">
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
                height: isMobile ? '300px' : '400px',
                maxWidth: isMobile ? '100%' : '100%'
              }}
            >
              {/* Radial gradient glow behind lanyard */}
              <div 
                className="absolute inset-0 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(45, 212, 191, 0) 70%)',
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
                  <div className="w-8 h-8 border-2 rounded-full animate-spin border-teal-400 border-t-transparent"></div>
                </div>
              }>
                {shouldMountLanyard && (
                  <Lanyard 
                    isMobile={isMobile}
                    transparent={true}
                  />
                )}
              </Suspense>
            </div>
          </motion.div>

          {/* Bio Text Blocks */}
          <div className="space-y-8 lg:col-span-7">
            {bioBlocks.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.12,
                  ease: premiumEase 
                }}
                className="space-y-3"
              >
                <h3 className="text-xs font-medium tracking-widest uppercase text-neutral-500">
                  {block.heading}
                </h3>
                <p className="text-base leading-relaxed text-neutral-300 md:text-lg" style={{ lineHeight: '1.8' }}>
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
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
                  className="block p-6 transition-all duration-500 border rounded-2xl border-neutral-800 bg-neutral-900/50 hover:border-teal-500/30 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-teal-500/5 group"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="p-3 text-teal-400 transition-colors duration-500 rounded-xl bg-neutral-800 group-hover:bg-teal-500/10"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 text-xs tracking-wider uppercase text-neutral-500">{contact.label}</p>
                      <p className="text-sm font-medium truncate text-neutral-200">{contact.value}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="p-6 border rounded-2xl border-neutral-800 bg-neutral-900/50">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="p-3 text-teal-400 rounded-xl bg-neutral-800"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 text-xs tracking-wider uppercase text-neutral-500">{contact.label}</p>
                      <p className="text-sm font-medium text-neutral-200">{contact.value}</p>
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
