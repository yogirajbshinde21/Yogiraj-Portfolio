import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorContext = React.createContext(null);

function useCursorContext() {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error('Cursor components must be used within a CursorProvider');
  }
  return context;
}

function CursorProvider({ children, global = false }) {
  // Initialize isHovered to true for global mode since user is likely already on the page
  const [isHovered, setIsHovered] = React.useState(global);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  React.useEffect(() => {
    if (!global) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Ensure cursor is visible when mouse moves (handles initial load case)
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [global, cursorX, cursorY, isHovered]);

  const value = React.useMemo(
    () => ({
      cursorX,
      cursorY,
      isHovered,
      setIsHovered,
      global,
    }),
    [cursorX, cursorY, isHovered, global]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
}

function CursorContainer({ children, className, ...props }) {
  const { cursorX, cursorY, setIsHovered, global } = useCursorContext();

  const handleMouseMove = (e) => {
    if (global) return;
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (!global) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!global) setIsHovered(false);
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: global ? undefined : 'relative' }}
      {...props}
    >
      {children}
    </div>
  );
}

function Cursor({ children, asChild = false, className, style, ...props }) {
  const { cursorX, cursorY, isHovered, global } = useCursorContext();

  const springConfig = { stiffness: 500, damping: 50, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  if (!isHovered) return null;

  const Component = asChild ? motion.div : motion.div;

  return (
    <Component
      className={className}
      style={{
        position: global ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 9999,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

function CursorFollow({
  children,
  asChild = false,
  side = 'bottom',
  sideOffset = 15,
  align = 'end',
  alignOffset = 5,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  className,
  style,
  ...props
}) {
  const { cursorX, cursorY, isHovered, global } = useCursorContext();

  const springConfig = { stiffness: transition.stiffness || 500, damping: transition.damping || 50, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Calculate offset based on side and align
  const getOffset = () => {
    let offsetX = 0;
    let offsetY = 0;

    switch (side) {
      case 'top':
        offsetY = -sideOffset;
        break;
      case 'bottom':
        offsetY = sideOffset;
        break;
      case 'left':
        offsetX = -sideOffset;
        break;
      case 'right':
        offsetX = sideOffset;
        break;
    }

    switch (align) {
      case 'start':
        if (side === 'top' || side === 'bottom') offsetX = -alignOffset;
        else offsetY = -alignOffset;
        break;
      case 'center':
        break;
      case 'end':
        if (side === 'top' || side === 'bottom') offsetX = alignOffset;
        else offsetY = alignOffset;
        break;
    }

    return { offsetX, offsetY };
  };

  const { offsetX, offsetY } = getOffset();

  if (!isHovered) return null;

  const Component = asChild ? motion.div : motion.div;

  return (
    <Component
      className={className}
      style={{
        position: global ? 'fixed' : 'absolute',
        top: offsetY,
        left: offsetX,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 9999,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </Component>
  );
}

export {
  CursorProvider,
  CursorContainer,
  Cursor,
  CursorFollow,
  useCursorContext,
};
