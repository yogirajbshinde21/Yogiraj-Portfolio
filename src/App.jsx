import React, { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LogoLoopSection from './components/LogoLoopSection';
import { CursorProvider, Cursor, CursorFollow } from './components/animate-ui/components/animate/cursor';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Elegant loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh] bg-neutral-950">
    <div className="relative">
      <div className="w-12 h-12 border-2 rounded-full border-neutral-800 border-t-teal-500 animate-spin" />
    </div>
  </div>
);

function App() {
  return (
    <CursorProvider global={true} className="relative min-h-screen bg-neutral-950 dark">
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
    </CursorProvider>
  );
}

export default App;
