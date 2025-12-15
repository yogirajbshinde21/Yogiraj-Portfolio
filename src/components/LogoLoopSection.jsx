import React from 'react';
import { LogoLoop } from './ui/LogoLoop';
import { useTheme } from '../context/ThemeContext';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiFlask,
  SiMysql,
  SiGit,
  SiGooglecloud,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { FaAws } from 'react-icons/fa';

const LogoLoopSection = () => {
  const { theme } = useTheme();
  
  const logos = [
    { name: 'React', icon: <SiReact size={48} className={`transition-colors duration-300 hover:text-[#61DAFB] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Node.js', icon: <SiNodedotjs size={48} className={`transition-colors duration-300 hover:text-[#339933] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Express', icon: <SiExpress size={48} className={`transition-colors duration-300 ${theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`} /> },
    { name: 'MongoDB', icon: <SiMongodb size={48} className={`transition-colors duration-300 hover:text-[#47A248] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'JavaScript', icon: <SiJavascript size={48} className={`transition-colors duration-300 hover:text-[#F7DF1E] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss size={48} className={`transition-colors duration-300 hover:text-[#06B6D4] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Python', icon: <SiPython size={48} className={`transition-colors duration-300 hover:text-[#3776AB] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Flask', icon: <SiFlask size={48} className={`transition-colors duration-300 ${theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`} /> },
    { name: 'MySQL', icon: <SiMysql size={48} className={`transition-colors duration-300 hover:text-[#4479A1] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Git', icon: <SiGit size={48} className={`transition-colors duration-300 hover:text-[#F05032] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Azure', icon: <VscAzure size={48} className={`transition-colors duration-300 hover:text-[#0078D4] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'AWS', icon: <FaAws size={48} className={`transition-colors duration-300 hover:text-[#FF9900] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
    { name: 'Google Cloud', icon: <SiGooglecloud size={48} className={`transition-colors duration-300 hover:text-[#4285F4] ${theme === 'dark' ? 'text-neutral-400' : 'text-stone-400'}`} /> },
  ];

  return (
    <section className={`py-10 overflow-hidden transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-950' : 'bg-amber-50/30'
    }`}>
      <LogoLoop
        logos={logos}
        speed={60}
        direction="left"
        logoHeight={52}
        gap={56}
        fadeOut={true}
        fadeOutColor={theme === 'dark' ? '#0a0a0a' : '#fef6e4'}
        scaleOnHover={true}
      />
    </section>
  );
};

export default LogoLoopSection;
