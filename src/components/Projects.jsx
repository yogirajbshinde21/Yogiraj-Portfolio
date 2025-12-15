import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card-effect';
import ProjectReactionBar from './ui/ProjectReactionBar';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { theme } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-20px" });
  
  // Detect mobile devices for performance optimization
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Premium easing - smooth and subtle
  const premiumEase = [0.16, 1, 0.3, 1];
  
  const projects = [
    {
      title: "Stockest",
      subtitle: "AI-Powered Stock Market Simulator",
      description: "A MERN stack platform for rural education with real-time stock trading simulation. Features ₹100,000 virtual money, live Upstox API data, and Socket.io updates.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "Gemini API"],
      github: "https://github.com/yogirajbshinde21/StockEst",
      live: "https://stockest-frontend.onrender.com/",
      youtubeEmbed: "kvKPFyMe1ok",
      youtubeDemo: "https://youtu.be/LsR1mf4Yy5I",
    },
    {
      title: "ChatWise",
      subtitle: "Smart Real-Time Chat Application",
      description: "Full-stack MERN chat app with real-time Socket.io messaging and AI-powered summaries via Google Gemini.",
      tech: ["React", "Node.js", "Socket.io", "Gemini API", "Cloudinary"],
      github: "https://github.com/yogirajbshinde21/ChatWise",
      live: "https://frontend-chatwise.onrender.com",
      youtubeEmbed: "cCt4OlcW4kE",
      youtubeDemo: "https://youtu.be/_jCPL32TysE",
    },
    {
      title: "MealMatch",
      subtitle: "Smart Food Delivery Platform",
      description: "A modern MERN food delivery app with real-time price negotiation via Socket.IO and weather-based dynamic pricing.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "Weather API"],
      github: "https://github.com/yogirajbshinde21/MealMatch",
      live: "https://mealmatch-frontend.onrender.com",
      youtubeEmbed: "cXCVoJwat38",
      youtubeDemo: "https://youtu.be/lsf5adyrRJs",
    },
    {
      title: "HomeDecore",
      subtitle: "Flask Home Decor Platform",
      description: "A Flask web application for home decor solutions with SQLite database and data visualization using Matplotlib.",
      tech: ["Python", "Flask", "SQLAlchemy", "Bootstrap", "Matplotlib"],
      github: "https://github.com/yogirajbshinde21/Home-Decore-Flask-Application",
      live: "https://household-service-app-u1os.onrender.com/",
      youtubeEmbed: "OS0eZOurWDk",
      youtubeDemo: "https://youtu.be/3XePJHlE6Cc",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  // Generate randomized delays for masonry effect (80-140ms)
  const randomDelays = useMemo(() => 
    projects.map(() => 0.08 + Math.random() * 0.06), 
    [projects.length]
  );

  // Masonry-style card entrance - simple opacity and transform only (GPU accelerated)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: randomDelays[i] + i * 0.06,
        ease: premiumEase 
      },
    }),
  };

  return (
    <section ref={ref} id="projects" className={`relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-900/50' : 'bg-amber-50/50'
    }`}>
      {/* Subtle background */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950'
          : 'bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50'
      }`} />
      
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "-20px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-10 text-center md:mb-16">
          <span className={`block mb-3 text-xs font-medium tracking-wider uppercase md:text-sm md:mb-4 transition-colors duration-700 ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}>
            Portfolio
          </span>
          <h2 className={`text-3xl tracking-tight font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl transition-colors duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-stone-800'
          }`}>
            Featured Projects
          </h2>
          <p className={`max-w-xl mx-auto mt-4 text-base md:mt-6 md:text-lg transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-500' : 'text-stone-500'
          }`}>
            A selection of my recent work
          </p>
        </motion.div>

        {/* Projects Grid - Single column on mobile for better visibility */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((project, idx) => {
            // Wrap with 3D card only on desktop
            const ProjectCard = () => (
              <motion.div
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileTap={isMobile ? { scale: 0.98 } : undefined}
                className="group h-full"
              >
                <div 
                  className={`h-full overflow-hidden transition-all border rounded-xl md:rounded-2xl duration-400 hover:shadow-lg ${
                    theme === 'dark'
                      ? 'border-neutral-800 bg-neutral-900/30 hover:border-teal-500/20 hover:shadow-teal-500/5'
                      : 'border-stone-300 bg-stone-100/90 hover:border-teal-400/50 hover:shadow-teal-500/10'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  {/* Video/Thumbnail Preview */}
                  <a 
                    href={project.youtubeDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden aspect-video bg-neutral-800"
                  >
                    {project.youtubeEmbed ? (
                      isMobile ? (
                        // Mobile: Show YouTube thumbnail instead of iframe for performance
                        <div className="relative w-full h-full">
                          <img
                            src={`https://img.youtube.com/vi/${project.youtubeEmbed}/maxresdefault.jpg`}
                            alt={project.title}
                            className="object-cover w-full h-full"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to hqdefault if maxres not available
                              e.target.src = `https://img.youtube.com/vi/${project.youtubeEmbed}/hqdefault.jpg`;
                            }}
                          />
                          {/* Play button overlay for mobile */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-500/90 backdrop-blur-sm">
                              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Desktop: Show iframe video
                        <div className="w-full h-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${project.youtubeEmbed}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeEmbed}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`}
                            className="object-cover w-full h-full"
                            allow="autoplay; encrypted-media"
                            loading="lazy"
                            style={{ border: 'none', pointerEvents: 'none' }}
                            title={project.title}
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-neutral-800">
                        <Play className="w-12 h-12 text-neutral-600" />
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none bg-gradient-to-t via-30% to-transparent ${
                        theme === 'dark' 
                          ? 'from-neutral-900 via-neutral-900/30 opacity-60 group-hover:opacity-80'
                          : 'from-stone-100 via-stone-100/30 opacity-50 group-hover:opacity-70'
                      }`}
                    />
                    {/* Hover overlay with view text - Desktop only */}
                    {!isMobile && (
                      <motion.div
                        className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm ${
                          theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-500/10'
                        }`}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className={`px-4 py-2 text-sm font-medium border rounded-full ${
                          theme === 'dark'
                            ? 'text-white bg-neutral-900/80 border-neutral-700'
                            : 'text-stone-800 bg-stone-50/90 border-stone-400'
                        }`}>
                          Watch Demo
                        </span>
                      </motion.div>
                    )}
                  </a>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    {/* Title with hover animation */}
                    <h3 
                      className={`mb-1 text-xl transition-colors duration-300 md:text-2xl font-editorial-regular ${
                        theme === 'dark' 
                          ? 'text-white group-hover:text-teal-400'
                          : 'text-stone-800 group-hover:text-teal-600'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className={`mb-2 text-xs md:text-sm md:mb-3 transition-colors duration-700 ${
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                    }`}>
                      {project.subtitle}
                    </p>
                    
                    {/* Description */}
                    <p className={`mb-3 text-xs leading-relaxed md:text-sm md:mb-4 line-clamp-2 transition-colors duration-700 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-stone-500'
                    }`}>
                      {project.description}
                    </p>

                    {/* Tech Stack - Horizontal scroll on mobile */}
                    <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 overflow-x-auto pb-1 scrollbar-hide md:flex-wrap md:overflow-visible">
                      {project.tech.map((tech, techIdx) => (
                        <motion.span
                          key={techIdx}
                          className={`flex-shrink-0 px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs rounded-full border transition-all duration-300 ${
                            theme === 'dark'
                              ? 'text-neutral-400 bg-neutral-800/50 border-neutral-700/50 hover:border-teal-500/30 hover:text-teal-400'
                              : 'text-stone-500 bg-stone-200/80 border-stone-300 hover:border-teal-400/50 hover:text-teal-600'
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            duration: 0.4, 
                            delay: randomDelays[idx] + idx * 0.1 + techIdx * 0.03,
                            ease: premiumEase 
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons - Full width on mobile */}
                    <div className="grid grid-cols-2 gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className={`flex items-center justify-center gap-1 md:gap-1.5 px-2 md:px-3 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-white text-neutral-900 hover:bg-teal-400'
                            : 'bg-stone-800 text-stone-50 hover:bg-teal-600'
                        }`}
                        whileHover={!isMobile ? { scale: 1.03, y: -2 } : undefined}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Code</span>
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} live demo`}
                        className={`flex items-center justify-center gap-1 md:gap-1.5 px-2 md:px-3 py-2 md:py-2.5 border rounded-full text-xs md:text-sm font-medium transition-all duration-300 active:scale-95 ${
                          theme === 'dark'
                            ? 'border-neutral-700 text-neutral-300 hover:border-teal-500/50 hover:text-teal-400'
                            : 'border-stone-400 text-stone-600 hover:border-teal-500/50 hover:text-teal-600'
                        }`}
                        whileHover={!isMobile ? { scale: 1.03, y: -2 } : undefined}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Live</span>
                      </motion.a>
                    </div>

                    {/* Project Reactions */}
                    <div className={`pt-4 mt-4 border-t md:pt-5 md:mt-5 transition-colors duration-700 ${
                      theme === 'dark' ? 'border-neutral-800/50' : 'border-stone-300/80'
                    }`}>
                      <ProjectReactionBar 
                        projectId={project.title.toLowerCase().replace(/\s+/g, '-')}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );

            return isMobile ? (
              <ProjectCard key={idx} />
            ) : (
              <CardContainer key={idx} className="py-0">
                <CardBody>
                  <ProjectCard />
                </CardBody>
              </CardContainer>
            );
          })}
        </div>

        {/* View More CTA with hover animation */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/yogirajbshinde21"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 transition-colors duration-300 group/link ${
              theme === 'dark' ? 'text-neutral-400 hover:text-teal-400' : 'text-stone-500 hover:text-teal-600'
            }`}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm">View more on GitHub</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
