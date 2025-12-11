import React from 'react';
import { motion } from 'framer-motion';

export const WorldMap = ({ dots = [], lineColor = "#0ea5e9" }) => {
  return (
    <div className="w-full aspect-[2/1] relative">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified world map paths */}
        <path
          d="M100,100 L200,100 L200,200 L100,200 Z M300,150 L400,150 L400,250 L300,250 Z M500,100 L700,100 L700,300 L500,300 Z"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="none"
        />
        {/* Connection lines */}
        {dots.map((dot, i) => (
          <g key={i}>
            {dot.end && (
              <motion.line
                x1={dot.start.lat * 5}
                y1={dot.start.lng * 2.5}
                x2={dot.end.lat * 5}
                y2={dot.end.lng * 2.5}
                stroke={lineColor}
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: i * 0.5 }}
              />
            )}
            <motion.circle
              cx={dot.start.lat * 5}
              cy={dot.start.lng * 2.5}
              r="4"
              fill={lineColor}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: i * 0.3 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
