// components/ui/therapist-finder-animation.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TherapistFinderAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Array<{x: number, y: number, opacity: number}>>([]);
  const lensPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize lens position
    lensPositionRef.current = { 
      x: canvas.width / 2, 
      y: canvas.height / 2
    };
    
    // Animation properties
    const lensRadius = 40;
    const dotRadius = 2;
    const maxDots = 300;
    
    // Movement pattern - creates a natural-looking search pattern
    const createMovementPattern = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Create waypoints for the lens to follow
      const waypoints = [
        { x: canvasWidth * 0.2, y: canvasHeight * 0.3, duration: 2000 },
        { x: canvasWidth * 0.8, y: canvasHeight * 0.4, duration: 2000 },
        { x: canvasWidth * 0.5, y: canvasHeight * 0.7, duration: 1500 },
        { x: canvasWidth * 0.3, y: canvasHeight * 0.6, duration: 1800 },
        { x: canvasWidth * 0.7, y: canvasHeight * 0.2, duration: 2200 },
        { x: canvasWidth * 0.4, y: canvasHeight * 0.5, duration: 1700 },
      ];
      
      let currentWaypoint = 0;
      let startTime = performance.now();
      let startPosition = { ...lensPositionRef.current };
      
      const animateToWaypoint = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const waypoint = waypoints[currentWaypoint];
        const progress = Math.min(elapsed / waypoint.duration, 1);
        
        // Easing function for smoother movement
        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easedProgress = easeInOut(progress);
        
        // Update lens position
        lensPositionRef.current = {
          x: startPosition.x + (waypoint.x - startPosition.x) * easedProgress,
          y: startPosition.y + (waypoint.y - startPosition.y) * easedProgress
        };
        
        // If we've reached the waypoint, move to the next one
        if (progress >= 1) {
          currentWaypoint = (currentWaypoint + 1) % waypoints.length;
          startTime = timestamp;
          startPosition = { ...lensPositionRef.current };
        }
        
        // Add dots where the lens is
        addDotsAroundLens();
        
        // Render the scene
        render();
        
        // Continue animation
        animationFrameRef.current = requestAnimationFrame(animateToWaypoint);
      };
      
      animationFrameRef.current = requestAnimationFrame(animateToWaypoint);
    };
    
    // Add dots around the lens position
    const addDotsAroundLens = () => {
      // Add 3-6 dots in a small radius around lens position
      const numDotsToAdd = Math.floor(Math.random() * 4) + 3;
      
      for (let i = 0; i < numDotsToAdd; i++) {
        // Random angle and distance from lens center
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * lensRadius * 0.8;
        
        // Calculate position relative to lens center
        const x = lensPositionRef.current.x + Math.cos(angle) * distance;
        const y = lensPositionRef.current.y + Math.sin(angle) * distance;
        
        // Only add if within canvas
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          dotsRef.current.push({
            x,
            y,
            opacity: 0.7 + Math.random() * 0.3 // Start with high opacity
          });
        }
      }
      
      // Limit max dots
      if (dotsRef.current.length > maxDots) {
        dotsRef.current = dotsRef.current.slice(dotsRef.current.length - maxDots);
      }
    };
    
    // Render the scene
    const render = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw dots
      const updatedDots = [];
      for (const dot of dotsRef.current) {
        // Fade out dots over time
        dot.opacity -= 0.01;
        
        // Only keep visible dots
        if (dot.opacity > 0) {
          updatedDots.push(dot);
          
          // Draw the dot
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 150, 150, ${dot.opacity})`;
          ctx.fill();
        }
      }
      dotsRef.current = updatedDots;
      
      // Draw the magnifying lens
      ctx.beginPath();
      ctx.arc(lensPositionRef.current.x, lensPositionRef.current.y, lensRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#DE3163'; // Pink from your gradient
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw the lens handle
      const handleLength = lensRadius * 1.2;
      const handleAngle = Math.PI / 4; // 45 degrees
      const handleStartX = lensPositionRef.current.x + Math.cos(handleAngle) * lensRadius;
      const handleStartY = lensPositionRef.current.y + Math.sin(handleAngle) * lensRadius;
      const handleEndX = handleStartX + Math.cos(handleAngle) * handleLength;
      const handleEndY = handleStartY + Math.sin(handleAngle) * handleLength;
      
      ctx.beginPath();
      ctx.moveTo(handleStartX, handleStartY);
      ctx.lineTo(handleEndX, handleEndY);
      ctx.strokeStyle = '#DE3163';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw a glass effect inside the lens
      const gradient = ctx.createRadialGradient(
        lensPositionRef.current.x - lensRadius * 0.3,
        lensPositionRef.current.y - lensRadius * 0.3,
        0,
        lensPositionRef.current.x,
        lensPositionRef.current.y,
        lensRadius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(200, 200, 200, 0.05)');
      
      ctx.beginPath();
      ctx.arc(lensPositionRef.current.x, lensPositionRef.current.y, lensRadius - 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };
    
    // Start the animation
    createMovementPattern();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 text-center">
        Looking for an available therapist
      </h3>
      <div className="w-full flex-1 relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default TherapistFinderAnimation;