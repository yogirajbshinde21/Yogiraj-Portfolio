import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/yogirajbshinde21" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/yogirajshinde" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/yogirajshinde21" },
    { name: "Email", icon: <Mail className="w-5 h-5" />, href: "mailto:jobsforyogiraj21@gmail.com" },
  ];

  const navLinks = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

  return (
    <footer className={`relative border-t transition-colors duration-700 ${
      theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-stone-50 border-stone-300'
    }`}>
      <div className="max-w-5xl px-6 py-16 mx-auto md:px-8">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={`mb-4 text-2xl font-editorial-ultralight transition-colors duration-700 ${
              theme === 'dark' ? 'text-white' : 'text-stone-800'
            }`}>
              Yogiraj Shinde
            </h3>
            <p className={`text-sm leading-relaxed transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-stone-500'
            }`}>
              MERN Stack Developer & Data Science Enthusiast. Building the future, one line of code at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={`mb-4 text-sm font-medium tracking-wider uppercase transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-stone-500'
            }`}>Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`text-sm transition-colors duration-300 ${
                      theme === 'dark' ? 'text-neutral-500 hover:text-teal-400' : 'text-stone-500 hover:text-teal-600'
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={`mb-4 text-sm font-medium tracking-wider uppercase transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-stone-500'
            }`}>Get In Touch</h4>
            <div className={`space-y-2 text-sm transition-colors duration-700 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-stone-500'
            }`}>
              <p>jobsforyogiraj21@gmail.com</p>
              <p>Mumbai, Maharashtra, India</p>
              <p>BS Data Science @ IITM</p>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Yogiraj's ${link.name} profile`}
              className={`p-3 transition-all duration-300 border rounded-full ${
                theme === 'dark'
                  ? 'border-neutral-800 text-neutral-500 hover:text-teal-400 hover:border-teal-500/30'
                  : 'border-stone-300 text-stone-500 hover:text-teal-600 hover:border-teal-500/30'
              }`}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={`pt-8 text-center border-t transition-colors duration-700 ${
            theme === 'dark' ? 'border-neutral-800' : 'border-stone-300'
          }`}
        >
          <p className={`flex items-center justify-center gap-2 text-sm transition-colors duration-700 ${
            theme === 'dark' ? 'text-neutral-600' : 'text-stone-500'
          }`}>
            © 2025 Yogiraj Shinde. Built with{' '}
            <Heart className={`w-3.5 h-3.5 transition-colors duration-700 ${
              theme === 'dark' ? 'text-teal-500' : 'text-teal-600'
            }`} />{' '}
            using React
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
