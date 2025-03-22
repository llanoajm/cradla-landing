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
  delayAppearance?: number; // Delay in seconds before showing the noise
}

const NoiseOverlay: React.FC<StaticNoiseTextureProps> = ({
  opacity = 0.05,
  zIndex = 25,
  density = 0.6,
  className = "",
  startingGap = 125,
  topOffset = 0,
  firstStopThreshold = 60,
  transitionWidth = 15,
  delayAppearance = 2.5, // Slightly longer than the gradient animation (2s)
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Delayed appearance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayAppearance * 1000); // Convert seconds to milliseconds
    
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
      const centerX = canvas.width * 0.5;    // 50% horizontally (matches gradient)
      const centerY = canvas.height * 0.2;   // 20% from top (matches gradient)
      
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
              const value = Math.floor(Math.random() * 40); // Low values for subtle dark spots
              
              // Set RGB values
              data[index] = value;     // Red
              data[index + 1] = value; // Green
              data[index + 2] = value; // Blue
              
              // Calculate fade factor for the transition zone
              let alphaMultiplier = 1.0;
              
              // If in the transition zone, calculate a fading effect
              if (normalizedDistance < firstStopThreshold) {
                // Linear gradient from 0 to 1 across the transition zone
                alphaMultiplier = (normalizedDistance - (firstStopThreshold - transitionWidth)) / transitionWidth;
                // Apply a smoother transition curve (ease-in)
                alphaMultiplier = alphaMultiplier * alphaMultiplier; // Square for smoother transition
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
          transition={{ duration: 1.2, ease: "easeOut" }}
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