import React from "react"
import { cn } from "@/lib/utils"

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  paused = false,
  showLabels = true,
  labelOffset = 40,
  ...props
}) {
  const calculatedDuration = duration / speed
  // Calculate container size based on radius to ensure proper centering
  // Add extra space for labels
  const labelSpace = showLabels ? labelOffset + 60 : 0
  const containerSize = radius * 2 + iconSize + labelSpace
  
  return (
    <div 
      className="relative"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
    >
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute inset-0 pointer-events-none"
          style={{
            width: `${containerSize}px`,
            height: `${containerSize}px`,
          }}
        >
          <circle
            className="stroke-[1.5px] stroke-neutral-400/40 dark:stroke-neutral-500/40"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        const childWithLabel = child?.props?.skill ? (
          <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            {child}
            <div
              className={cn(
                "absolute pointer-events-none animate-orbit-label transition-opacity duration-500",
                showLabels ? "opacity-100" : "opacity-0"
              )}
              style={{
                "--label-offset": `${labelOffset}px`,
                "--label-angle": `${angle}deg`,
              }}
            >
              <div className={cn(
                "px-2 py-1 text-[10px] md:text-xs font-medium whitespace-nowrap rounded-md",
                "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm",
                "text-neutral-800 dark:text-neutral-200",
                "border border-neutral-200/50 dark:border-neutral-700/50",
                "shadow-lg"
              )}>
                {child.props.skill.name}
              </div>
            </div>
          </div>
        ) : child
        
        return (
          <div
            key={index}
            style={{
              "--duration": calculatedDuration,
              "--radius": radius,
              "--angle": angle,
              "--icon-size": `${iconSize}px`,
              // Position at center of container
              left: `${containerSize / 2 - iconSize / 2}px`,
              top: `${containerSize / 2 - iconSize / 2}px`,
              // Set transform origin to center of container
              transformOrigin: `${iconSize / 2}px ${iconSize / 2}px`,
            }}
            className={cn(
              `animate-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              { "[animation-play-state:paused]": paused },
              className
            )}
            {...props}
          >
            {childWithLabel}
          </div>
        )
      })}
    </div>
  )
}