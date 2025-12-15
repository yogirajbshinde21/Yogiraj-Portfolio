import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { Timeline } from './ui/timeline';
import { useTheme } from '../context/ThemeContext';

// Experience Item component for theme-aware content
const ExperienceItem = ({ icon: Icon, company, role, period, items }) => {
  const { theme } = useTheme();
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-2.5 rounded-xl transition-colors duration-700 ${
            theme === 'dark' ? 'bg-neutral-800 text-teal-400' : 'bg-stone-200 text-teal-600'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`mb-1 text-xl font-editorial-regular md:text-2xl transition-colors duration-700 ${
              theme === 'dark' ? 'text-white' : 'text-stone-800'
            }`}>
              {company}
            </h3>
            <p className={`mb-1 text-sm transition-colors duration-700 ${
              theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            }`}>{role}</p>
            <p className={`text-xs transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-stone-500'
            }`}>{period}</p>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-3 transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-stone-600'
            }`}>
              <span className={`flex-shrink-0 w-1 h-1 mt-2 rounded-full transition-colors duration-700 ${
                theme === 'dark' ? 'bg-teal-500/50' : 'bg-teal-500/50'
              }`} />
              <span className="text-sm leading-relaxed">{item}</span>
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
      icon: Briefcase,
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
      icon: Award,
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
      icon: Briefcase,
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
    content: <ExperienceItem icon={exp.icon} company={exp.company} role={exp.role} period={exp.period} items={exp.items} />
  }));

  return (
    <section ref={sectionRef} id="experience" className={`relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-900/50' : 'bg-amber-50/50'
    }`}>
      {/* Subtle background */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950'
          : 'bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50'
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
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}>
            My Journey
          </span>
          <h2 className={`text-3xl tracking-tight font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl transition-colors duration-700 ${
            theme === 'dark' ? 'text-white' : 'text-stone-800'
          }`}>
            Experience
          </h2>
          <p className={`max-w-xl mx-auto mt-4 text-base md:mt-6 md:text-lg transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-500' : 'text-stone-500'
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
