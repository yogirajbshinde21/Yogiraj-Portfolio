import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const LinkPreview = ({ children, url, className }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600",
        className
      )}
    >
      {children}
    </a>
  );
};
