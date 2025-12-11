import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { Timeline } from './ui/timeline';

const Experience = () => {
  const sectionRef = useRef(null);
  
  // Premium easing
  const premiumEase = [0.16, 1, 0.3, 1];
  
  const experiences = [
    {
      title: "Nov 2024",
      content: (
        <div>
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2.5 rounded-xl bg-neutral-800 text-teal-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="mb-1 text-xl text-white font-editorial-regular md:text-2xl">
                  Billions Strategies
                </h3>
                <p className="mb-1 text-sm text-teal-400">Full Stack Developer Intern</p>
                <p className="text-xs text-neutral-500">Nov 2024 - Present</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Built an AI-powered "Cosmic Blueprint" experience for a Shopify crystal store using Node.js, Liquid, and Gemini API
                </span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Implemented numerology-driven logic to generate dynamic crystal bracelet formulas with robust server-side validation
                </span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Designed a clean, responsive UI for AI recommendations while optimizing Shopify theme performance and UX
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Feb 2024",
      content: (
        <div>
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2.5 rounded-xl bg-neutral-800 text-teal-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="mb-1 text-xl text-white font-editorial-regular md:text-2xl">
                  Edunet Foundation
                </h3>
                <p className="mb-1 text-sm text-teal-400">MERN Stack Developer Intern</p>
                <p className="text-xs text-neutral-500">Feb 2024 - Mar 2024</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Built a smart food ordering platform with real-time bargaining and weather-based dynamic pricing
                </span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Enabled up to 50% user cost savings via real-time negotiation using Socket.IO
                </span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Integrated Weather API to enable real-time, location-based discounts across 10+ cities
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Jun 2024",
      content: (
        <div>
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2.5 rounded-xl bg-neutral-800 text-teal-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="mb-1 text-xl text-white font-editorial-regular md:text-2xl">
                  IBM SkillsBuild
                </h3>
                <p className="mb-1 text-sm text-teal-400">Front-end Web Developer Intern</p>
                <p className="text-xs text-neutral-500">Jun 2024 - Aug 2024</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Developed a skill exchange platform using React.js with real-time chat and smart skill discovery
                </span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Cut render time by 76% in authentication flow using React Profiler, optimizing UI speed
                </span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-teal-500/50" />
                <span className="text-sm leading-relaxed">
                  Engineered a GitHub-based system to verify user skills and boost profile credibility
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="relative px-4 py-16 overflow-hidden sm:px-6 md:py-32 md:px-8 bg-neutral-900/50">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="block mb-3 text-xs font-medium tracking-wider text-teal-400 uppercase md:text-sm md:mb-4">
            My Journey
          </span>
          <h2 className="text-3xl tracking-tight text-white font-editorial-ultralight sm:text-4xl md:text-6xl lg:text-7xl">
            Experience
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base md:mt-6 md:text-lg text-neutral-500">
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
