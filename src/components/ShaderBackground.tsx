import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {

  return (
    <div className="relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.06
                      0 1 0 0 0.24
                      0 0 1 0 0.26
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders with Green Tones - Optimized for performance */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#0F3E42', '#279FAA', '#ffffff', '#1a1a1a', '#0F3E42']}
        speed={0.1}
        backgroundColor="#0F3E42"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={['#0F3E42', '#ffffff', '#279FAA', '#0F3E42']}
        speed={0.05}
        wireframe="true"
        backgroundColor="transparent"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gray-900/50" />

      {children}
    </div>
  );
}