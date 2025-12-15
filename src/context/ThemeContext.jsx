import React, { createContext, useContext, useState, useEffect, useCallback, startTransition, useRef, useMemo } from 'react';

const ThemeStateContext = createContext();
const ThemeActionsContext = createContext();

export const useTheme = () => {
  const state = useContext(ThemeStateContext);
  const actions = useContext(ThemeActionsContext);
  if (!state || !actions) throw new Error('useTheme must be used within a ThemeProvider');
  return { ...state, ...actions };
};

export const useThemeActions = () => {
  const actions = useContext(ThemeActionsContext);
  if (!actions) throw new Error('useThemeActions must be used within a ThemeProvider');
  return actions;
};

// RAF-based scheduler for smooth visual updates
const scheduleFrame = (callback) => {
  return requestAnimationFrame(() => requestAnimationFrame(callback));
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const themeRef = useRef(theme);
  const transitionTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    themeRef.current = savedTheme;
    
    // Apply theme immediately without transitions on initial load
    const html = document.documentElement;
    html.classList.add('theme-transitioning');
    html.classList.remove('dark', 'light');
    html.classList.add(savedTheme);
    
    // Remove transition block after paint is complete
    scheduleFrame(() => {
      html.classList.remove('theme-transitioning');
    });
  }, []);

  const toggleTheme = useCallback(() => {
    // Clear any pending operations
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const currentTheme = themeRef.current;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    themeRef.current = newTheme;
    
    const html = document.documentElement;

    // PHASE 1: Instant switch - zero transitions for maximum performance
    html.classList.add('theme-transitioning');
    html.classList.remove('theme-smooth-transition');
    
    // Use RAF to batch DOM writes optimally
    rafRef.current = requestAnimationFrame(() => {
      // Apply theme change
      html.classList.remove('dark', 'light');
      html.classList.add(newTheme);
      
      // PHASE 2: Enable butter-smooth transition immediately after paint
      rafRef.current = requestAnimationFrame(() => {
        html.classList.remove('theme-transitioning');
        html.classList.add('theme-smooth-transition');
        
        // Update React state with low priority (non-blocking)
        startTransition(() => {
          setTheme(newTheme);
          setIsTransitioning(true);
        });
        
        // PHASE 3: Cleanup and persist
        transitionTimeoutRef.current = setTimeout(() => {
          html.classList.remove('theme-smooth-transition');
          startTransition(() => setIsTransitioning(false));
        }, 300);
        
        // Persist to localStorage in idle time
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => localStorage.setItem('theme', newTheme), { timeout: 500 });
        } else {
          setTimeout(() => localStorage.setItem('theme', newTheme), 50);
        }
      });
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stateValue = useMemo(() => ({ theme, isTransitioning }), [theme, isTransitioning]);
  const actionsValue = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  return (
    <ThemeActionsContext.Provider value={actionsValue}>
      <ThemeStateContext.Provider value={stateValue}>
        {children}
      </ThemeStateContext.Provider>
    </ThemeActionsContext.Provider>
  );
};