import React, { useMemo } from 'react';
import './LogoLoop.css';

export const LogoLoop = ({
  logos,
  speed = 60,
  direction = 'left',
  logoHeight = 40,
  gap = 48,
  fadeOut = true,
  fadeOutColor = '#0a0a0a',
  scaleOnHover = true,
}) => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);

  // Calculate animation duration based on speed
  const duration = useMemo(() => {
    const baseSpeed = 100 - Math.min(Math.max(speed, 1), 100);
    return Math.max(baseSpeed * 0.5, 5);
  }, [speed]);

  return (
    <div className="logo-loop-wrapper">
      {fadeOut && (
        <>
          <div
            className="logo-loop-fade-overlay left"
            style={{ '--fade-color': fadeOutColor }}
          />
          <div
            className="logo-loop-fade-overlay right"
            style={{ '--fade-color': fadeOutColor }}
          />
        </>
      )}
      <div
        className={`logo-loop-container ${direction === 'right' ? 'right' : ''}`}
        style={{
          '--duration': `${duration}s`,
          gap: `${gap}px`,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className={`logo-loop-item ${scaleOnHover ? 'scale-on-hover' : ''}`}
            style={{
              height: `${logoHeight}px`,
              paddingLeft: `${gap / 2}px`,
              paddingRight: `${gap / 2}px`,
            }}
            title={logo.name}
          >
            {logo.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
