"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StaticNoiseTextureProps {
  opacity?: number;
  zIndex?: number;
  density?: number;
  className?: string;
  startingGap?: number;
  topOffset?: number;
  firstStopThreshold?: number;
  transitionWidth?: number;
  delayAppearance?: number;
}

const NoiseOverlay: React.FC<StaticNoiseTextureProps> = ({
  opacity = 0.05,
  zIndex = 25,
  density = 0.6,
  className = "",
  startingGap = 125,
  topOffset = 20,
  firstStopThreshold = 60,
  transitionWidth = 30, // Increased from 15 to 30 for a wider, smoother transition
  delayAppearance = 2.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Delayed appearance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayAppearance * 1000);
    
    return () => clearTimeout(timer);
  }, [delayAppearance]);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Function to generate static noise texture
    const generateNoiseTexture = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate parameters to match the gradient
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.2;
      
      // The size of the gradient ellipse
      const gradientWidth = (canvas.width * startingGap) / 100;
      const gradientHeight = (canvas.height * (startingGap + topOffset)) / 100;
      
      // Generate static noise pixels
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
          
          // Calculate distance from center as percentage of gradient size
          const normalizedX = (x - centerX) / (gradientWidth / 2);
          const normalizedY = (y - centerY) / (gradientHeight / 2);
          const normalizedDistance = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY) * 100;
          
          // Calculate distance from center to determine noise opacity
          if (normalizedDistance > firstStopThreshold - transitionWidth) {
            // Only draw some pixels based on density
            const drawPixel = Math.random() < density;
            
            if (drawPixel) {
              // Grayscale value - darker for more texture
              const value = Math.floor(Math.random() * 40);
              
              // Set RGB values
              data[index] = value;
              data[index + 1] = value;
              data[index + 2] = value;
              
              // Calculate fade factor for the transition zone with improved smoothing
              let alphaMultiplier = 1.0;
              
              // If in the transition zone, calculate a fading effect
              if (normalizedDistance < firstStopThreshold) {
                // Linear gradient from 0 to 1 across the transition zone
                const rawProgress = (normalizedDistance - (firstStopThreshold - transitionWidth)) / transitionWidth;
                
                // Apply a cubic bezier easing function for much smoother transitions
                // This creates an S-curve that starts and ends more gradually
                alphaMultiplier = smootherStep(rawProgress);
              }
              
              // Apply the calculated alpha with transition fade
              data[index + 3] = Math.random() * 255 * opacity * alphaMultiplier;
            } else {
              // Transparent pixel
              data[index + 3] = 0;
            }
          } else {
            // Inside the pure white center area, make fully transparent
            data[index + 3] = 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Smootherstep function (improved version of smoothstep) for smoother transitions
    // Returns a value between 0 and 1 with smoother acceleration/deceleration
    function smootherStep(x: number): number {
      // Clamp the input between 0 and 1
      x = Math.max(0, Math.min(1, x));
      // Apply 6x^5 - 15x^4 + 10x^3 (smootherstep formula)
      return x * x * x * (x * (x * 6 - 15) + 10);
    }

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
  }, [opacity, density, startingGap, topOffset, firstStopThreshold, transitionWidth, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.canvas
          ref={canvasRef}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Longer, smoother animation
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: zIndex,
            mixBlendMode: 'multiply'
          }}
        />
      )}
    </AnimatePresence>
  );
};

export { NoiseOverlay };