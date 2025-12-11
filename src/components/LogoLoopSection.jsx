import React from 'react';
import { LogoLoop } from './ui/LogoLoop';
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
  const logos = [
    { name: 'React', icon: <SiReact size={48} className="text-neutral-400 hover:text-[#61DAFB] transition-colors duration-300" /> },
    { name: 'Node.js', icon: <SiNodedotjs size={48} className="text-neutral-400 hover:text-[#339933] transition-colors duration-300" /> },
    { name: 'Express', icon: <SiExpress size={48} className="text-neutral-400 hover:text-white transition-colors duration-300" /> },
    { name: 'MongoDB', icon: <SiMongodb size={48} className="text-neutral-400 hover:text-[#47A248] transition-colors duration-300" /> },
    { name: 'JavaScript', icon: <SiJavascript size={48} className="text-neutral-400 hover:text-[#F7DF1E] transition-colors duration-300" /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss size={48} className="text-neutral-400 hover:text-[#06B6D4] transition-colors duration-300" /> },
    { name: 'Python', icon: <SiPython size={48} className="text-neutral-400 hover:text-[#3776AB] transition-colors duration-300" /> },
    { name: 'Flask', icon: <SiFlask size={48} className="text-neutral-400 hover:text-white transition-colors duration-300" /> },
    { name: 'MySQL', icon: <SiMysql size={48} className="text-neutral-400 hover:text-[#4479A1] transition-colors duration-300" /> },
    { name: 'Git', icon: <SiGit size={48} className="text-neutral-400 hover:text-[#F05032] transition-colors duration-300" /> },
    { name: 'Azure', icon: <VscAzure size={48} className="text-neutral-400 hover:text-[#0078D4] transition-colors duration-300" /> },
    { name: 'AWS', icon: <FaAws size={48} className="text-neutral-400 hover:text-[#FF9900] transition-colors duration-300" /> },
    { name: 'Google Cloud', icon: <SiGooglecloud size={48} className="text-neutral-400 hover:text-[#4285F4] transition-colors duration-300" /> },
  ];

  return (
    <section className="py-10 bg-neutral-950 overflow-hidden">
      <LogoLoop
        logos={logos}
        speed={60}
        direction="left"
        logoHeight={52}
        gap={56}
        fadeOut={true}
        fadeOutColor="#0a0a0a"
        scaleOnHover={true}
      />
    </section>
  );
};

export default LogoLoopSection;
