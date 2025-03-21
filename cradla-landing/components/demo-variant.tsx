"use client"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const DemoVariant1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
     
      {/* Gradient Background with white center */}
      <AnimatedGradientBackground 
        gradientColors={[
          "#FFFFFF", // White center
          "#BFC261", // Olive/chartreuse color
          "#E195AB", // Pink 
          "#DE3163", // Original blue
          "#FFD600",
          "#00E676",
          "#BFC261" // Olive/chartreuse color at the end
        ]}
        Breathing={true}
        startingGap={125}
      />
      
   
      <NoiseOverlay 
        opacity={0.15}    // Adjust opacity as needed
        zIndex={30}       // High z-index to be above everything
      />
      
      {/* Fluid cursor effect */}
      <SplashCursor 
        BACK_COLOR={{ r: 1, g: 1, b: 1 }}  // White background
        TRANSPARENT={true}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={1.8}
        SPLAT_RADIUS={0.025}
        COLOR_UPDATE_SPEED={1}
      />

      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-32 text-center">
        <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.4, duration: 0.9 }}
        >
          <DotLottieReact
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            loop
            autoplay
            speed={0.7}
          />
        </motion.div>
        
        {/* Modern Cradla heading */}
        <h1 className="mt-8 text-5xl font-extrabold text-gray-800 md:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
          Cradla
        </h1>
        
         {/* Morphing slogans with GooeyText - Wider, Bolder, Larger */}
        <div className="mt-10 h-28 w-full max-w-4xl">
          <GooeyText
            texts={[
              "Comprehensive Session Notes.",
              "Bayesian Patient Profiles.",
              "Know your Patients like Never Before.",
              "Never Miss a Detail.",
              "Easy, Secure, and Highly Customizable.",
              "Data-driven Therapeutic Insights."
            ]}
            morphTime={1.5}
            cooldownTime={2}
            className="font-bold text-black w-full"
            textClassName="text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold"
          />
        </div>
        
        {/* Coming soon with subtle design */}
        <p className="mt-8 text-lg font-semibold text-olive-600 md:text-xl tracking-wider uppercase" style={{ color: '#8A9536' }}>
          Coming Soon
        </p>
      </div>
    </div>
  );
};

export { DemoVariant1 };