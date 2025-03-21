"use client";

import React, { useEffect, useRef } from "react";

interface StaticNoiseTextureProps {
  opacity?: number;
  zIndex?: number;
  density?: number;
  className?: string;
}

const NoiseOverlay: React.FC<StaticNoiseTextureProps> = ({
  opacity = 0.05,
  zIndex = 25,
  density = 0.6,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Function to generate static noise texture
    const generateNoiseTexture = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      // Generate static noise pixels
      for (let i = 0; i < data.length; i += 4) {
        // Only draw some pixels based on density
        const drawPixel = Math.random() < density;
        
        if (drawPixel) {
          // Grayscale value - darker for more texture
          const value = Math.floor(Math.random() * 40); // Low values for subtle dark spots
          
          data[i] = value;     // Red
          data[i + 1] = value; // Green
          data[i + 2] = value; // Blue
          data[i + 3] = Math.random() * 255 * opacity; // Alpha with controlled opacity
        } else {
          // Transparent pixel
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Generate the noise texture once
    generateNoiseTexture();

    // Handle window resize - regenerate texture but keep it static
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateNoiseTexture();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity, density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: zIndex,
        mixBlendMode: 'multiply'
      }}
    />
  );
};

export { NoiseOverlay };