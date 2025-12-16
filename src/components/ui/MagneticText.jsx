import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

const MagneticTextContext = createContext(null);

// Smooth interpolation helper
const lerp = (start, end, factor) => start + (end - start) * factor;

// Spring physics helper
const spring = (current, target, velocity, stiffness = 0.15, damping = 0.8) => {
  const force = (target - current) * stiffness;
  const newVelocity = (velocity + force) * damping;
  const newValue = current + newVelocity;
  return { value: newValue, velocity: newVelocity };
};

export const MagneticText = ({ 
  as: Component = 'div', 
  body, 
  className, 
  children 
}) => {
  const [tokens, setTokens] = useState([]);
  const containerRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, active: false });
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const chars = body.split('');
    setTokens(chars);
  }, [body]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = { ...mousePosRef.current, active: false };
  }, []);

  return (
    <MagneticTextContext.Provider value={{ mousePosRef, containerRef }}>
      <Component 
        ref={containerRef}
        className={clsx(className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative' }}
      >
        {children(tokens)}
      </Component>
    </MagneticTextContext.Provider>
  );
};

const Token = ({ 
  body, 
  className,
  minScale = 1,
  maxScale = 1.35,
  minWeight = 200,
  maxWeight = 800,
  threshold = 80,
  stiffness = 0.12,
  damping = 0.75,
  magneticPull = 0, // Set > 0 to enable position displacement
}) => {
  const ref = useRef(null);
  const { mousePosRef, containerRef } = useContext(MagneticTextContext);
  const animationRef = useRef(null);
  
  // Current animated values
  const animState = useRef({
    scale: { value: 1, velocity: 0 },
    weight: { value: minWeight, velocity: 0 },
    x: { value: 0, velocity: 0 },
    y: { value: 0, velocity: 0 },
  });

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;

    const element = ref.current;
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const mousePos = mousePosRef.current;
      const parentRect = containerRef.current?.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      
      // Calculate element center relative to container
      let targetScale = 1;
      let targetWeight = minWeight;
      let targetX = 0;
      let targetY = 0;

      if (mousePos.active && parentRect) {
        const centerX = rect.left - parentRect.left + rect.width / 2;
        const centerY = rect.top - parentRect.top + rect.height / 2;
        
        const deltaX = mousePos.x - centerX;
        const deltaY = mousePos.y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < threshold) {
          // Smooth falloff using cosine interpolation
          const ratio = Math.cos((distance / threshold) * Math.PI * 0.5);
          const easedRatio = ratio * ratio; // Additional easing
          
          targetScale = minScale + (maxScale - minScale) * easedRatio;
          targetWeight = minWeight + (maxWeight - minWeight) * easedRatio;
          
          // Magnetic pull toward cursor
          if (magneticPull > 0) {
            const pullStrength = easedRatio * magneticPull;
            targetX = (deltaX / distance) * pullStrength * (threshold - distance) * 0.1;
            targetY = (deltaY / distance) * pullStrength * (threshold - distance) * 0.1;
          }
        }
      }

      // Apply spring physics to all values
      animState.current.scale = spring(
        animState.current.scale.value,
        targetScale,
        animState.current.scale.velocity,
        stiffness,
        damping
      );
      
      animState.current.weight = spring(
        animState.current.weight.value,
        targetWeight,
        animState.current.weight.velocity,
        stiffness * 0.8, // Slightly slower for weight
        damping
      );

      animState.current.x = spring(
        animState.current.x.value,
        targetX,
        animState.current.x.velocity,
        stiffness,
        damping
      );

      animState.current.y = spring(
        animState.current.y.value,
        targetY,
        animState.current.y.velocity,
        stiffness,
        damping
      );

      // Apply styles directly (bypasses React for performance)
      const { scale, weight, x, y } = animState.current;
      element.style.transform = `translate(${x.value}px, ${y.value}px) scale(${scale.value})`;
      element.style.fontWeight = Math.round(weight.value);
      // For variable fonts, use this instead:
      // element.style.fontVariationSettings = `'wght' ${Math.round(weight.value)}`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [minScale, maxScale, minWeight, maxWeight, threshold, stiffness, damping, magneticPull, containerRef, mousePosRef]);

  return (
    <span
      ref={ref}
      className={clsx(className)}
      style={{
        display: 'inline-block',
        transformOrigin: 'center center',
        willChange: 'transform, font-weight',
      }}
    >
      {body}
    </span>
  );
};

MagneticText.Token = Token;

export default MagneticText;