import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Count-up animation hook
const useCountUp = (end, duration = 2000, start = 0, isActive = false) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!isActive) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Elastic easing
      const elasticProgress = progress === 1 
        ? 1 
        : Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
      
      setCount(Math.floor(elasticProgress * (end - start) + start));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isActive]);
  
  return count;
};

const Skills = () => {
  const { theme } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2, margin: "-50px" });
  
  // Premium easing - smooth and subtle
  const premiumEase = [0.16, 1, 0.3, 1];
  
  const skillCategories = [
    {
      icon: <Monitor className="w-5 h-5" />,
      title: 'Frontend',
      skills: [
        { name: 'React.js', level: 'Expert' },
        { name: 'JavaScript', level: 'Expert' },
        { name: 'HTML5/CSS3', level: 'Expert' },
        { name: 'TailwindCSS', level: 'Advanced' },
        { name: 'Bootstrap', level: 'Advanced' },
      ]
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 'Expert' },
        { name: 'Express.js', level: 'Expert' },
        { name: 'Python', level: 'Advanced' },
        { name: 'Flask', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Expert' },
      ]
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Database',
      skills: [
        { name: 'MongoDB', level: 'Expert' },
        { name: 'MySQL', level: 'Advanced' },
        { name: 'SQLite', level: 'Intermediate' },
      ]
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      title: 'Cloud',
      skills: [
        { name: 'Azure', level: 'Intermediate' },
        { name: 'AWS', level: 'Learning' },
        { name: 'Google Cloud', level: 'Learning' },
      ]
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: 'Tools',
      skills: [
        { name: 'Git & GitHub', level: 'Expert' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Postman', level: 'Advanced' },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  // Card entrance - simple opacity and y transform only
  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: i * 0.06,
        ease: premiumEase 
      },
    }),
  };

  // Skill level to percentage mapping
  const levelToPercent = {
    'Expert': 95,
    'Advanced': 80,
    'Intermediate': 65,
    'Learning': 40,
  };

  // Progress bar component with animation
  const ProgressBar = ({ level, delay, isActive, theme }) => {
    const percent = levelToPercent[level] || 50;
    const animatedPercent = useCountUp(percent, 1500, 0, isActive);
    
    return (
      <div className={`relative h-1 overflow-hidden rounded-full transition-colors duration-700 ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-stone-300'
      }`}>
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-teal-500 to-cyan-400'
              : 'bg-gradient-to-r from-teal-500 to-cyan-500'
          }`}
          initial={{ width: 0 }}
          animate={isActive ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: premiumEase }}
        />
        <motion.span
          className={`absolute right-0 text-xs font-medium -top-6 transition-colors duration-700 ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
        >
          {animatedPercent}%
        </motion.span>
      </div>
    );
  };

  return (
    <section ref={ref} id="skills" className={`relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-950' : 'bg-stone-50'
    }`}>
      {/* Subtle background */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-neutral-900/50 via-neutral-950 to-neutral-950'
          : 'bg-gradient-to-b from-amber-50/30 via-stone-50 to-stone-50'
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
            Technical Expertise
          </span>
          <h2 className={`text-3xl tracking-tight font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl transition-colors duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-stone-800'
          }`}>
            Skills
          </h2>
          <p className={`max-w-xl mx-auto mt-4 text-base md:mt-6 md:text-lg transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-500' : 'text-stone-500'
          }`}>
            Technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ 
                y: -4, 
                transition: { duration: 0.3, ease: premiumEase }
              }}
              className={`${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <motion.div 
                className={`h-full p-6 transition-all border duration-400 rounded-2xl group hover:shadow-lg ${
                  theme === 'dark'
                    ? 'border-neutral-800 bg-neutral-900/30 hover:border-teal-500/20 hover:bg-neutral-900/50 hover:shadow-teal-500/5'
                    : 'border-stone-300 bg-stone-100/80 hover:border-teal-400/50 hover:bg-stone-100 hover:shadow-teal-500/10'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className={`p-2.5 rounded-xl transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-neutral-800 text-teal-400 group-hover:bg-teal-500/10'
                        : 'bg-stone-200 text-teal-600 group-hover:bg-teal-500/10'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: premiumEase }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className={`text-xl font-editorial-regular transition-colors duration-700 ${
                    theme === 'dark' ? 'text-white' : 'text-stone-800'
                  }`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills List with progress bars */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1 + skillIndex * 0.05,
                        ease: premiumEase 
                      }}
                      className="group/skill"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm transition-colors duration-300 ${
                          theme === 'dark' 
                            ? 'text-neutral-300 group-hover/skill:text-teal-400'
                            : 'text-stone-600 group-hover/skill:text-teal-600'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full transition-all duration-300 ${
                          theme === 'dark'
                            ? 'text-neutral-500 bg-neutral-800 group-hover/skill:bg-teal-500/10 group-hover/skill:text-teal-400'
                            : 'text-stone-500 bg-stone-200 group-hover/skill:bg-teal-500/10 group-hover/skill:text-teal-600'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                      <ProgressBar 
                        level={skill.level} 
                        delay={index * 0.1 + skillIndex * 0.08}
                        isActive={isInView}
                        theme={theme}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;