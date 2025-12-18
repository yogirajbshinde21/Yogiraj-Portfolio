import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { OrbitingCircles } from './ui/orbiting-circles';

const Skills = () => {
  const { theme } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hoveredSkillName, setHoveredSkillName] = useState(null);
  const [hoveredOrbit, setHoveredOrbit] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  // Show labels when section comes into view, then fade after 4 seconds
  React.useEffect(() => {
    if (isInView) {
      setShowLabels(true);
      const timer = setTimeout(() => {
        setShowLabels(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Skill data with experience and projects
  const skillsData = {
    // Inner Orbit - Expert
    react: { name: 'React.js', level: 'Expert', experience: '3+ years', projects: 15, orbit: 'inner', icon: 'react-svgrepo-com.svg', invertInDark: false },
    javascript: { name: 'JavaScript', level: 'Expert', experience: '4+ years', projects: 20, orbit: 'inner', icon: 'javascript-svgrepo-com.svg', invertInDark: false },
    nodejs: { name: 'Node.js', level: 'Expert', experience: '3+ years', projects: 12, orbit: 'inner', icon: 'nodejs-icon-logo-svgrepo-com.svg', invertInDark: false },
    html: { name: 'HTML5', level: 'Expert', experience: '4+ years', projects: 25, orbit: 'inner', icon: 'html-5-svgrepo-com.svg', invertInDark: false },
    css: { name: 'CSS3', level: 'Expert', experience: '4+ years', projects: 25, orbit: 'inner', icon: 'css-3-svgrepo-com.svg', invertInDark: false },
    git: { name: 'Git', level: 'Expert', experience: '4+ years', projects: 30, orbit: 'inner', icon: 'git-svgrepo-com.svg', invertInDark: false },

    // Middle Orbit - Advanced
    express: { name: 'Express.js', level: 'Advanced', experience: '2+ years', projects: 10, orbit: 'middle', icon: 'express-svgrepo-com.svg', invertInDark: true },
    mongodb: { name: 'MongoDB', level: 'Advanced', experience: '2+ years', projects: 8, orbit: 'middle', icon: 'mongodb-svgrepo-com.svg', invertInDark: false },
    tailwind: { name: 'TailwindCSS', level: 'Advanced', experience: '2+ years', projects: 12, orbit: 'middle', icon: 'tailwindcss-icon-svgrepo-com.svg', invertInDark: false },
    mysql: { name: 'MySQL', level: 'Advanced', experience: '2+ years', projects: 9, orbit: 'middle', icon: 'mysql-svgrepo-com.svg', invertInDark: true },
    vscode: { name: 'VS Code', level: 'Advanced', experience: '4+ years', projects: 30, orbit: 'middle', icon: 'vs-code-svgrepo-com.svg', invertInDark: false },
    postman: { name: 'Postman', level: 'Advanced', experience: '3+ years', projects: 15, orbit: 'middle', icon: 'postman-icon-svgrepo-com.svg', invertInDark: false },
    github: { name: 'GitHub', level: 'Advanced', experience: '4+ years', projects: 30, orbit: 'middle', icon: 'github-color-svgrepo-com.svg', invertInDark: false },

    // Outer Orbit - Intermediate
    flask: { name: 'Flask', level: 'Intermediate', experience: '1+ year', projects: 4, orbit: 'outer', icon: 'flask-svgrepo-com.svg', invertInDark: true },
    sqlite: { name: 'SQLite', level: 'Intermediate', experience: '1+ year', projects: 5, orbit: 'outer', icon: 'sqlite-svgrepo-com.svg', invertInDark: true },
    azure: { name: 'Azure', level: 'Intermediate', experience: '1+ year', projects: 3, orbit: 'outer', icon: 'azure-v2-svgrepo-com.svg', invertInDark: false },
    bootstrap: { name: 'Bootstrap', level: 'Intermediate', experience: '2+ years', projects: 8, orbit: 'outer', icon: 'bootstrap-svgrepo-com.svg', invertInDark: false },
  };

  // Reusable SkillIcon component with size variant
  const SkillIcon = ({ skill, size = "default", className = "" }) => {
    const handleMouseEnter = () => {
      setHoveredSkillName(skill.name);
      setHoveredOrbit(skill.orbit);
    };

    const handleMouseLeave = () => {
      setHoveredSkillName(null);
      setHoveredOrbit(null);
    };

    const handleTouchStart = (e) => {
      e.stopPropagation();
      setHoveredSkillName(skill.name);
      setHoveredOrbit(skill.orbit);
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        setHoveredSkillName(null);
        setHoveredOrbit(null);
      }, 2000);
    };

    const isHovered = hoveredSkillName === skill.name;

    // Size variants for icons - just the icon size, no background
    const sizeClasses = {
      small: "w-9 h-9",
      medium: "w-10 h-10",
      default: "w-12 h-12",
      large: "w-14 h-14"
    };
    
    return (
      <div
        className={`relative cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
          className={`${sizeClasses[size]} transition-all duration-300 ${
            theme === 'dark'
              ? 'drop-shadow-[0_0_8px_rgba(20,184,166,0.5)] hover:drop-shadow-[0_0_12px_rgba(20,184,166,0.8)]'
              : 'drop-shadow-[0_0_8px_rgba(184,112,75,0.4)] hover:drop-shadow-[0_0_12px_rgba(184,112,75,0.6)]'
          }`}
        >
          <img 
            src={`/Orbit Icons/${skill.icon}`} 
            alt={skill.name}
            className={`w-full h-full object-contain transition-all duration-300 pointer-events-none ${
              theme === 'dark' && skill.invertInDark ? 'brightness-0 invert' : ''
            }`}
          />
        </motion.div>
        
        {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`absolute -bottom-20 left-1/2 -translate-x-1/2 z-[99999] px-4 py-2.5 rounded-lg whitespace-nowrap pointer-events-none ${
              theme === 'dark'
                ? 'bg-neutral-900/95 border border-teal-500/30 text-white shadow-2xl backdrop-blur-sm'
                : 'bg-white/95 border border-[#B8704B]/30 text-[#3D3229] shadow-2xl backdrop-blur-sm'
            }`}
          >
            {/* Tooltip arrow */}
            <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
              theme === 'dark' ? 'bg-neutral-900/95 border-l border-t border-teal-500/30' : 'bg-white/95 border-l border-t border-[#B8704B]/30'
            }`} />
            <div className="relative z-10">
              <div className="text-sm font-semibold">{skill.name}</div>
              <div className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-teal-400' : 'text-[#B8704B]'}`}>
                {skill.level} • {skill.experience}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={ref}
      id="skills"
      className={`relative px-4 py-12 overflow-hidden sm:px-6 md:py-15 md:px-8 transition-colors duration-700 ${
        theme === 'dark' ? 'bg-neutral-950' : 'bg-[#FAF6F1]'
      }`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950'
          : 'bg-gradient-to-b from-[#F3EDE4]/30 via-[#FAF6F1] to-[#FAF6F1]'
      }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center md:mb-12"
        >
          <span className={`block mb-2 text-xs font-medium tracking-wider uppercase md:text-sm md:mb-4 transition-colors duration-700 ${
            theme === 'dark' ? 'text-teal-400' : 'text-[#B8704B]'
          }`}>
            Technical Expertise
          </span>
          <h2 className={`text-3xl tracking-tight font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl transition-colors duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-[#3D3229]'
          }`}>
            Skills
          </h2>
          <p className={`max-w-xl mx-auto mt-3 text-sm md:mt-6 md:text-lg transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-400' : 'text-[#8C7B6B]'
          }`}>
            A constellation of technologies powering innovative solutions
          </p>
        </motion.div>

        {/* Orbiting Circles Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center w-full h-[500px] sm:h-[550px] md:h-[980px] lg:h-[1050px]"
        >
          {/* Pulse Waves - Desktop */}
          <div className="absolute z-[35] hidden md:block pointer-events-none">
            <div className={`w-[800px] h-[800px] rounded-full animate-pulse-wave ${
              theme === 'dark'
                ? 'border-[3px] border-teal-400/50'
                : 'border-[3px] border-[#B8704B]/50'
            }`} style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute z-[35] hidden md:block pointer-events-none">
            <div className={`w-[800px] h-[800px] rounded-full animate-pulse-wave ${
              theme === 'dark'
                ? 'border-[3px] border-teal-400/30'
                : 'border-[3px] border-[#B8704B]/30'
            }`} style={{ animationDelay: '5s' }} />
          </div>

          {/* Pulse Waves - Mobile */}
          <div className="absolute z-[35] md:hidden pointer-events-none">
            <div className={`w-[450px] h-[450px] rounded-full animate-pulse-wave ${
              theme === 'dark'
                ? 'border-[2px] border-teal-400/50'
                : 'border-[2px] border-[#B8704B]/50'
            }`} style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute z-[35] md:hidden pointer-events-none">
            <div className={`w-[450px] h-[450px] rounded-full animate-pulse-wave ${
              theme === 'dark'
                ? 'border-[2px] border-teal-400/30'
                : 'border-[2px] border-[#B8704B]/30'
            }`} style={{ animationDelay: '5s' }} />
          </div>

          {/* Center Element - Code Symbol */}
          <div className={`absolute z-[40] flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full transition-all duration-700 animate-pulse-center ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-teal-500 to-cyan-400 shadow-[0_0_40px_rgba(20,184,166,0.5)]'
              : 'bg-gradient-to-br from-[#B8704B] to-[#D4A574] shadow-[0_0_40px_rgba(184,112,75,0.4)]'
          }`}>
            <span className="font-mono text-xl font-bold text-white sm:text-2xl md:text-4xl lg:text-5xl">&lt;/&gt;</span>
          </div>

          {/* ============ DESKTOP ORBITS ============ */}
          
          {/* Inner Orbit - Desktop */}
          <div className="absolute z-[45] hidden md:block">
            <OrbitingCircles
              radius={125}
              duration={40}
              iconSize={80}
              paused={hoveredOrbit === 'inner'}
              path={true}
              showLabels={showLabels}
              labelOffset={55}
            >
              <SkillIcon skill={skillsData.react} size="default" />
              <SkillIcon skill={skillsData.javascript} size="default" />
              <SkillIcon skill={skillsData.nodejs} size="default" />
              <SkillIcon skill={skillsData.html} size="default" />
              <SkillIcon skill={skillsData.css} size="default" />
              <SkillIcon skill={skillsData.git} size="default" />
            </OrbitingCircles>
          </div>

          {/* Middle Orbit - Desktop */}
          <div className="absolute z-[44] hidden md:block">
            <OrbitingCircles
              radius={215}
              duration={50}
              reverse
              iconSize={80}
              paused={hoveredOrbit === 'middle'}
              path={true}
              showLabels={showLabels}
              labelOffset={55}
            >
              <SkillIcon skill={skillsData.express} size="default" />
              <SkillIcon skill={skillsData.mongodb} size="default" />
              <SkillIcon skill={skillsData.tailwind} size="default" />
              <SkillIcon skill={skillsData.mysql} size="default" />
              <SkillIcon skill={skillsData.vscode} size="default" />
              <SkillIcon skill={skillsData.postman} size="default" />
              <SkillIcon skill={skillsData.github} size="default" />
            </OrbitingCircles>
          </div>

          {/* Outer Orbit - Desktop */}
          <div className="absolute z-[43] hidden md:block">
            <OrbitingCircles
              radius={345}
              duration={60}
              iconSize={80}
              paused={hoveredOrbit === 'outer'}
              path={true}
              showLabels={showLabels}
              labelOffset={55}
            >
              <SkillIcon skill={skillsData.flask} size="default" />
              <SkillIcon skill={skillsData.sqlite} size="default" />
              <SkillIcon skill={skillsData.azure} size="default" />
              <SkillIcon skill={skillsData.bootstrap} size="default" />
            </OrbitingCircles>
          </div>

          {/* ============ MOBILE ORBITS ============ */}
          
          {/* Inner Orbit - Mobile */}
          <div className="absolute z-[45] md:hidden">
            <OrbitingCircles
              radius={60}
              duration={35}
              iconSize={40}
              paused={hoveredOrbit === 'inner'}
              path={true}
              showLabels={showLabels}
              labelOffset={35}
            >
              <SkillIcon skill={skillsData.react} size="small" />
              <SkillIcon skill={skillsData.javascript} size="small" />
              <SkillIcon skill={skillsData.nodejs} size="small" />
              <SkillIcon skill={skillsData.html} size="small" />
              <SkillIcon skill={skillsData.css} size="small" />
              <SkillIcon skill={skillsData.git} size="small" />
            </OrbitingCircles>
          </div>

          {/* Middle Orbit - Mobile */}
          <div className="absolute z-[44] md:hidden">
            <OrbitingCircles
              radius={120}
              duration={45}
              reverse
              iconSize={40}
              paused={hoveredOrbit === 'middle'}
              path={true}
              showLabels={showLabels}
              labelOffset={35}
            >
              <SkillIcon skill={skillsData.express} size="small" />
              <SkillIcon skill={skillsData.mongodb} size="small" />
              <SkillIcon skill={skillsData.tailwind} size="small" />
              <SkillIcon skill={skillsData.mysql} size="small" />
              <SkillIcon skill={skillsData.vscode} size="small" />
              <SkillIcon skill={skillsData.postman} size="small" />
              <SkillIcon skill={skillsData.github} size="small" />
            </OrbitingCircles>
          </div>

          {/* Outer Orbit - Mobile */}
          <div className="absolute z-[43] md:hidden">
            <OrbitingCircles
              radius={185}
              duration={55}
              iconSize={40}
              paused={hoveredOrbit === 'outer'}
              path={true}
              showLabels={showLabels}
              labelOffset={35}
            >
              <SkillIcon skill={skillsData.flask} size="small" />
              <SkillIcon skill={skillsData.sqlite} size="small" />
              <SkillIcon skill={skillsData.azure} size="small" />
              <SkillIcon skill={skillsData.bootstrap} size="small" />
            </OrbitingCircles>
          </div>
        </motion.div>

        {/* Interactive Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 text-center md:mt-6"
        >
          <p className={`text-xs md:text-sm transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-500' : 'text-[#8C7B6B]'
          }`}>
           
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-3 md:gap-8 md:mt-4"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${
              theme === 'dark' ? 'bg-teal-400' : 'bg-[#B8704B]'
            }`} />
            <span className={`text-xs md:text-sm ${
              theme === 'dark' ? 'text-neutral-400' : 'text-[#8C7B6B]'
            }`}>
              Inner: Expert
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${
              theme === 'dark' ? 'bg-teal-400/70' : 'bg-[#D4A574]'
            }`} />
            <span className={`text-xs md:text-sm ${
              theme === 'dark' ? 'text-neutral-400' : 'text-[#8C7B6B]'
            }`}>
              Middle: Advanced
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${
              theme === 'dark' ? 'bg-teal-400/40' : 'bg-[#E5DCD1]'
            }`} />
            <span className={`text-xs md:text-sm ${
              theme === 'dark' ? 'text-neutral-400' : 'text-[#8C7B6B]'
            }`}>
              Outer: Intermediate
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;