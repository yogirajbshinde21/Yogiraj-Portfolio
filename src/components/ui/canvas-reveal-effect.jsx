"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef } from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Reset animation time when component mounts
    timeRef.current = 0;
    
    const totalSize = 4;
    const colorPalette = colors.length === 1 
      ? [colors[0], colors[0], colors[0]]
      : colors.length === 2
      ? [colors[0], colors[0], colors[1]]
      : colors;

    const random = (x, y) => {
      const PHI = 1.61803398874989484820459;
      return Math.abs(Math.sin(x * PHI + y) * 43758.5453123) % 1;
    };

    const animate = () => {
      timeRef.current += 0.016 * animationSpeed;
      const time = timeRef.current;
      
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      const cols = Math.ceil(canvas.width / 2 / totalSize);
      const rows = Math.ceil(canvas.height / 2 / totalSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * totalSize;
          const y = j * totalSize;
          
          const showOffset = random(i, j);
          const introOffset = Math.sqrt((i - cols/2)**2 + (j - rows/2)**2) * 0.01 + showOffset * 0.15;
          
          if (introOffset > time) continue;

          const rand = random(i * j, Math.floor(time / 5 + showOffset + 5));
          const opacityIndex = Math.floor(rand * opacities.length);
          const opacity = opacities[opacityIndex] * Math.min(1, (time - introOffset) * 10);
          
          const colorIndex = Math.floor(showOffset * colorPalette.length);
          const [r, g, b] = colorPalette[colorIndex];
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationSpeed, colors, dotSize, opacities]);

  return (
    <div className={cn("h-full relative bg-black w-full", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};
