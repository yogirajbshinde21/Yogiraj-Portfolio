import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timeline } from './ui/timeline';
import { useTheme } from '../context/ThemeContext';

// Experience Item component for theme-aware content
const ExperienceItem = ({ logo, company, role, period, items }) => {
  const { theme } = useTheme();
  
  return (
    <div>
      <div className="mb-10 pb-6">
        <div className="flex items-start gap-5 mb-5">
          <div className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-700 shadow-lg ${
            theme === 'dark' 
              ? 'bg-white/95 shadow-white/10' 
              : 'bg-white shadow-[#3D3229]/10 border border-[#EBE3D9]'
          }`}>
            <img 
              src={logo} 
              alt={`${company} logo`}
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
            />
          </div>
          <div className="pt-1">
            <h3 className={`mb-1.5 text-lg font-editorial-regular sm:text-xl md:text-2xl transition-colors duration-700 ${
              theme === 'dark' ? 'text-white' : 'text-[#3D3229]'
            }`}>
              {company}
            </h3>
            <p className={`mb-1 text-sm md:text-base font-medium transition-colors duration-700 ${
              theme === 'dark' ? 'text-teal-400' : 'text-[#B8704B]'
            }`}>{role}</p>
            <p className={`text-xs md:text-sm transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-[#8C7B6B]'
            }`}>{period}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-5 md:space-y-6">
          {items.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-3 transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-300' : 'text-[#6B5D4D]'
            }`}>
              <span className={`flex-shrink-0 w-1.5 h-1.5 mt-3 rounded-full transition-colors duration-700 ${
                theme === 'dark' ? 'bg-teal-500/60' : 'bg-[#B8704B]/60'
              }`} />
              <span className="text-base md:text-lg leading-[1.8] md:leading-[1.9]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  
  // Premium easing
  const premiumEase = [0.16, 1, 0.3, 1];
  
  const experienceData = [
    {
      title: "Nov 2025",
      logo: "/billion-strategies-logo.png",
      company: "Billions Strategies",
      role: "Full Stack Developer Intern",
      period: "Nov 2025 - Present",
      items: [
        "Built an AI-powered \"Cosmic Blueprint\" experience for a Shopify crystal store using Node.js, Liquid, and Gemini API",
        "Implemented numerology-driven logic to generate dynamic crystal bracelet formulas with robust server-side validation",
        "Designed a clean, responsive UI for AI recommendations while optimizing Shopify theme performance and UX"
      ]
    },
    {
      title: "Feb 2025",
      logo: "/edunet-logo.png",
      company: "Edunet Foundation",
      role: "MERN Stack Developer Intern",
      period: "Feb 2025 - Mar 2025",
      items: [
        "Built a smart food ordering platform with real-time bargaining and weather-based dynamic pricing",
        "Enabled up to 50% user cost savings via real-time negotiation using Socket.IO",
        "Integrated Weather API to enable real-time, location-based discounts across 10+ cities"
      ]
    },
    {
      title: "Jun 2024",
      logo: "/IBM-logo.jpg",
      company: "IBM SkillsBuild",
      role: "Front-end Web Developer Intern",
      period: "Jun 2024 - Aug 2024",
      items: [
        "Developed a skill exchange platform using React.js with real-time chat and smart skill discovery",
        "Cut render time by 76% in authentication flow using React Profiler, optimizing UI speed",
        "Engineered a GitHub-based system to verify user skills and boost profile credibility"
      ]
    }
  ];
  
  const experiences = experienceData.map(exp => ({
    title: exp.title,
    content: <ExperienceItem logo={exp.logo} company={exp.company} role={exp.role} period={exp.period} items={exp.items} />
  }));

  return (
    <section ref={sectionRef} id="experience" className={`relative px-4 py-16 sm:px-6 md:py-32 md:px-8 transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-900/50' : 'bg-[#F3EDE4]/50'
    }`}>
      {/* Subtle background */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950'
          : 'bg-gradient-to-b from-[#FAF6F1] via-[#F3EDE4]/30 to-[#FAF6F1]'
      }`} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-10 text-center md:mb-16"
        >
          <span className={`block mb-3 text-xs font-medium tracking-wider uppercase md:text-sm md:mb-4 transition-colors duration-700 ${
            theme === 'dark' ? 'text-teal-400' : 'text-[#B8704B]'
          }`}>
            My Journey
          </span>
          <h2 className={`text-3xl tracking-tight font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl transition-colors duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-[#3D3229]'
          }`}>
            Experience
          </h2>
          <p className={`max-w-xl mx-auto mt-4 text-base md:mt-6 md:text-lg transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-500' : 'text-[#8C7B6B]'
          }`}>
            Professional growth through internships and continuous learning
          </p>
        </motion.div>

        {/* Timeline */}
        <Timeline data={experiences} />
      </div>
    </section>
  );
};

export default Experience;
