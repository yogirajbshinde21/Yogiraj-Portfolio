import * as React from 'react';

import {
  CursorProvider as CursorProviderPrimitive,
  Cursor as CursorPrimitive,
  CursorFollow as CursorFollowPrimitive,
  CursorContainer as CursorContainerPrimitive,
} from '@/components/animate-ui/primitives/animate/cursor';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

function CursorProvider({ global, children, className, ...props }) {
  return (
    <CursorProviderPrimitive global={global}>
      <CursorContainerPrimitive className={className} {...props}>
        {children}
      </CursorContainerPrimitive>
    </CursorProviderPrimitive>
  );
}

function Cursor({ className, ...props }) {
  const { theme } = useTheme();
  
  return (
    <CursorPrimitive {...props}>
      <svg
        className={cn('size-6 transition-colors duration-500', theme === 'dark' ? 'text-white' : 'text-stone-800', className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
      >
        <path
          fill="currentColor"
          d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
        />
      </svg>
    </CursorPrimitive>
  );
}

function CursorFollow({
  className,
  children,
  sideOffset = 15,
  alignOffset = 5,
  ...props
}) {
  const { theme } = useTheme();
  
  return (
    <CursorFollowPrimitive
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
    >
      <div
        className={cn(
          'rounded-md px-2.5 py-1 text-sm font-medium shadow-lg transition-colors duration-500',
          theme === 'dark' 
            ? 'bg-white text-neutral-900' 
            : 'bg-stone-800 text-stone-50',
          className,
        )}
      >
        {children}
      </div>
    </CursorFollowPrimitive>
  );
}

export {
  CursorProvider,
  Cursor,
  CursorFollow,
};
