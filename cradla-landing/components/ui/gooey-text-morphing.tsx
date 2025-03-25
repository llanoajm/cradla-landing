"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FixedGooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function FixedGooeyText({
  texts,
  morphTime = 1.5,
  cooldownTime = 6,
  className,
  textClassName
}: FixedGooeyTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const indexRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const morphingRef = useRef(false);
  
  useEffect(() => {
    if (!texts.length || !text1Ref.current || !text2Ref.current || texts.length < 2) return;
    
    // Init with first text
    if (!initialized) {
      text1Ref.current.textContent = texts[0];
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "100%";
      
      text2Ref.current.textContent = texts[1];
      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "0%";
      
      setInitialized(true);
      indexRef.current = 0;
    }
    
    // Avoid memory leaks
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [texts, initialized]);
  
  useEffect(() => {
    if (!texts.length || !text1Ref.current || !text2Ref.current || texts.length < 2 || !initialized) return;
    
    const doCooldown = () => {
      morphingRef.current = false;
      
      if (text1Ref.current && text2Ref.current) {
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "100%";
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "0%";
      }
    };
    
    const doMorph = () => {
      if (!text1Ref.current || !text2Ref.current) return;
      
      const nextIndex = (indexRef.current + 1) % texts.length;
      
      // Setup next text
      text2Ref.current.textContent = texts[nextIndex];
      
      // Start morphing animation
      const startTime = performance.now();
      const animateMorph = (currentTime: number) => {
        if (!text1Ref.current || !text2Ref.current) return;
        
        const elapsed = currentTime - startTime;
        const fraction = Math.min(elapsed / (morphTime * 1000), 1);
        
        // Apply filter effects
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        
        const reverseFraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / reverseFraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(reverseFraction, 0.4) * 100}%`;
        
        if (fraction < 1) {
          frameRef.current = requestAnimationFrame(animateMorph);
        } else {
          // Animation complete, swap text and reset
          text1Ref.current.textContent = texts[nextIndex];
          indexRef.current = nextIndex;
          doCooldown();
          
          // Schedule next morphing
          timeoutRef.current = setTimeout(() => {
            morphingRef.current = true;
            doMorph();
          }, cooldownTime * 1000);
        }
      };
      
      frameRef.current = requestAnimationFrame(animateMorph);
    };
    
    // Start the cycle
    timeoutRef.current = setTimeout(() => {
      morphingRef.current = true;
      doMorph();
    }, cooldownTime * 1000);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [texts, morphTime, cooldownTime, initialized]);
  
  if (!texts.length) return null;
  
  if (texts.length === 1) {
    return (
      <div className={cn("relative", className)}>
        <div className="text-center">
          <span className={cn(textClassName)}>{texts[0]}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="relative h-full">
        <div 
          ref={text1Ref} 
          className={cn("absolute w-full text-center", textClassName)}
        ></div>
        <div 
          ref={text2Ref} 
          className={cn("absolute w-full text-center", textClassName)}
        ></div>
      </div>
    </div>
  );
}