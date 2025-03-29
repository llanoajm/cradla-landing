'use client';

import React, { useState, useRef, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Fullscreen, MinimizeIcon } from 'lucide-react';

const PitchDeckPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced fullscreen function
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
      // Apply additional styles to ensure complete fullscreen
      document.body.style.overflow = 'hidden';
      setIsFullscreen(true);
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      // Restore normal styles
      document.body.style.overflow = '';
      setIsFullscreen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'f') {
      toggleFullscreen();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative" ref={containerRef}>
      {/* Main Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedGradientBackground 
          gradientColors={[
            "#FFFFFF", // White center
            "#BFC261", // Olive/chartreuse
            "#E195AB", // Pink 
            "#DE3163", // Blue
            "#FFD600", // Yellow
            "#00E676", // Green
            "#BFC261"  // Back to olive
          ]}
          Breathing={true}
          startingGap={125}
        />
        <NoiseOverlay 
          opacity={0.15}
          zIndex={5}
          startingGap={125}
          firstStopThreshold={90}
          transitionWidth={25}
          delayAppearance={0.7}
        />
      </div>

      {/* Navigation Bar */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-6">
        <div className="flex-shrink-0 flex items-center">
          <a href="/" className="text-xl md:text-2xl font-bold text-gray-900">Cradla</a>
        </div>
        
        <div className="flex-shrink-0">
          <button
            onClick={toggleFullscreen}
            className="px-3 py-1.5 text-xs md:text-sm font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1"
          >
            {isFullscreen ? (
              <>
                <MinimizeIcon className="w-4 h-4" />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Fullscreen className="w-4 h-4" />
                Fullscreen
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden p-4">
          {/* Embedded Canva Presentation - Using the exact code from Canva */}
          <div 
            style={{
              position: "relative", 
              width: "100%", 
              height: 0, 
              paddingTop: "56.25%",
              paddingBottom: 0, 
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
              marginTop: "1.6em", 
              marginBottom: "0.9em", 
              overflow: "hidden",
              borderRadius: "8px", 
              willChange: "transform"
            }}
          >
            <iframe 
              loading="lazy" 
              style={{
                position: "absolute", 
                width: "100%", 
                height: "100%", 
                top: 0, 
                left: 0, 
                border: "none", 
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGi9FyUdjQ/BQKBwWxUuK7NAtLKqKfHhw/view?embed" 
              allowFullScreen={true} 
              allow="fullscreen"
              title="Cradla Pitch Deck"
            />
          </div>
          
          {/* Attribution link */}
          <div className="text-center text-sm text-gray-500 mt-2">
            <a 
              href="https://www.canva.com/design/DAGi9FyUdjQ/BQKBwWxUuK7NAtLKqKfHhw/view?utm_content=DAGi9FyUdjQ&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              Cradla Pitch Deck
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PitchDeckPage;