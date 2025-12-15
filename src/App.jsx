import React, { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LogoLoopSection from './components/LogoLoopSection';
import { CursorProvider, Cursor, CursorFollow } from './components/animate-ui/components/animate/cursor';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AnimatedThemeToggler } from './components/ui/animated-theme-toggler';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Elegant loading component
const LoadingSpinner = () => {
  const { theme } = useTheme();
  return (
    <div className={`flex items-center justify-center min-h-[50vh] ${
      theme === 'dark' ? 'bg-neutral-950' : 'bg-slate-50'
    }`}>
      <div className="relative">
        <div className={`w-12 h-12 border-2 rounded-full animate-spin ${
          theme === 'dark' ? 'border-neutral-800 border-t-teal-500' : 'border-slate-200 border-t-blue-600'
        }`} />
      </div>
    </div>
  );
};

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <CursorProvider global={true} className={`relative min-h-screen ${
      theme === 'dark' ? 'bg-neutral-950 dark' : 'bg-white light'
    }`}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div className="hidden md:block">
        <Cursor />
        <CursorFollow side="bottom" sideOffset={20} align="end" alignOffset={8}>
          You
        </CursorFollow>
      </div>

      {/* Floating Navigation */}
      <Navigation />

      {/* Hero Section - Always loaded */}
      <Hero />

      {/* Lazy-loaded sections with Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Skills />
      </Suspense>

      {/* Logo Loop Section - Visual separator */}
      <LogoLoopSection />

      <Suspense fallback={<LoadingSpinner />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>

      {/* Footer */}
      <Footer />

      {/* Animated Theme Toggler */}
      <AnimatedThemeToggler />
    </CursorProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
