import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const AnimatedThemeToggler = memo(({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className={`fixed bottom-8 right-8 z-50 pointer-events-auto ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        onClick={toggleTheme}
        className={`
          px-4 py-2 rounded-full text-sm font-medium
          backdrop-blur-sm border
          ${theme === 'dark' 
            ? 'bg-neutral-900/80 border-neutral-700/50 text-neutral-200 hover:bg-neutral-800/80' 
            : 'bg-[#F3EDE4]/90 border-[#C4B5A5]/50 text-[#3D3229] hover:bg-[#EBE3D9]/90'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ transition: 'background-color 150ms ease-out' }}
      >
        <div className="flex items-center gap-2">
          {theme === 'dark' ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>Dark</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Light</span>
            </>
          )}
        </div>
      </motion.button>
    </motion.div>
  );
});

AnimatedThemeToggler.displayName = 'AnimatedThemeToggler';
