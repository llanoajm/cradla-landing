"use client"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const CradlaLanding = () => {
  const [showExtendedInfo, setShowExtendedInfo] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Beautiful gradient background */}
      <AnimatedGradientBackground 
        gradientColors={[
          "#FFFFFF", // White center
          "#BFC261", // Olive/chartreuse
          "#E195AB", // Pink 
          "#DE3163", // Cerise
          "#FFD600", // Yellow
          "#00E676", // Green
          "#BFC261" // Olive/chartreuse
        ]}
        Breathing={true}
        startingGap={125}
      />

      {/* Noise overlay for texture */}
      <NoiseOverlay 
        opacity={0.15}
        zIndex={30}
        startingGap={125}
        firstStopThreshold={90}
        transitionWidth={25}
        delayAppearance={0.7}
      />

      {/* Fluid cursor effect */}
      <SplashCursor 
        BACK_COLOR={{ r: 1, g: 1, b: 1 }}
        TRANSPARENT={true}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={1.8}
        SPLAT_RADIUS={0.025}
        COLOR_UPDATE_SPEED={1}
      />

      <div className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-24 md:pt-32 text-center">
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
        
        {/* Cradla heading */}
        <h1 className="mt-8 text-5xl font-extrabold text-gray-800 md:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
          Cradla
        </h1>
        
        {/* Tagline */}
        <p className="mt-3 text-xl md:text-2xl font-medium text-gray-700 max-w-3xl">
          The AI copilot for mental healthcare that preserves the full context of patient care
        </p>
        
        {/* Alert message about patient care gaps */}
        <motion.div 
          className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 w-full max-w-2xl mx-auto rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm md:text-base font-medium text-red-700">
                Patient appointments are slipping through the cracks. The average wait time for mental health services is 48 days.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Morphing slogans with GooeyText */}
        <div className="mt-10 h-28 w-full max-w-4xl">
          <GooeyText
            texts={[
              "48-day wait times reduced to 30 days.",
              "31% increase in appointment throughput.",
              "Know your patients like never before.",
              "Dynamic therapist allocation without losing context.",
              "Easy, secure, and HIPAA compliant.",
              "Revolutionizing mental healthcare delivery.",
              "Eliminate the painful restart with new therapists.",
            ]}
            morphTime={1.5}
            cooldownTime={2}
            className="font-bold text-black w-full"
            textClassName="text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold"
          />
        </div>
        
        {/* Core value proposition */}
        <motion.div 
          className="mt-12 max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Solve the Context Transfer Problem in Mental Health</h2>
          <p className="text-lg text-gray-700 mb-6">
            Cradla's integrated AI copilot platform creates a continuous therapeutic record that maintains the full context of a patient's journey, enabling truly on-demand care without sacrificing relationship quality.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/80 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Continuous Care</h3>
              <p>Eliminate the "getting to know you" time when patients see different therapists.</p>
            </div>
            <div className="bg-white/80 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Enhanced Throughput</h3>
              <p>Dynamic allocation models deliver 31% increase in appointment throughput.</p>
            </div>
            <div className="bg-white/80 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Therapeutic Alliance</h3>
              <p>Maintain therapeutic alliance scores comparable to single-provider models.</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowExtendedInfo(!showExtendedInfo)}
            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            {showExtendedInfo ? "Show Less" : "Learn More"}
          </button>
        </motion.div>
        
        {/* Extended information section */}
        <AnimatePresence>
          {showExtendedInfo && (
            <motion.div 
              className="mt-8 max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-12"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">How Cradla Works</h2>
              
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2">Beyond Simple Transcription</h3>
                <p className="text-gray-700">
                  Cradla doesn't just record but understands therapeutic narratives. We capture emotional subtext, behavioral patterns, and treatment progression in a format that allows any qualified therapist to quickly build genuine rapport with the patient.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2">Legal Considerations</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><span className="font-semibold">Patient-Therapist Privilege:</span> "Circle of care" model recognized in healthcare privacy law</li>
                  <li><span className="font-semibold">HIPAA Compliance:</span> End-to-end encryption with granular access controls</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-2">How We're Different</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/80 p-4 rounded-lg">
                    <h4 className="font-bold mb-1">Domain-Specific</h4>
                    <p className="text-gray-600">Purpose-built exclusively for mental healthcare, not a general-purpose tool.</p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <h4 className="font-bold mb-1">Beyond Documentation</h4>
                    <p className="text-gray-600">Enables flexible provider matching while preserving therapeutic relationships.</p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <h4 className="font-bold mb-1">Therapeutic Intelligence</h4>
                    <p className="text-gray-600">Understands alliance strength, intervention responsiveness, and emotional patterns.</p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <h4 className="font-bold mb-1">Live Guidance</h4>
                    <p className="text-gray-600">Real-time guidance during sessions, not just post-session documentation.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* CTA section */}
        <motion.div 
          className="my-12 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Ready to transform mental healthcare delivery?</h2>
          <a 
            href="mailto:llano@stanford.edu" 
            className="inline-block px-8 py-3 bg-gray-800 text-white text-lg font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            Book a Demo
          </a>
        </motion.div>
        
        {/* Coming soon message */}
        <p className="mt-8 text-lg font-semibold text-olive-600 md:text-xl tracking-wider uppercase" style={{ color: '#8A9536' }}>
          Coming Soon.
        </p>
        <p className="text-sm text-gray-600 mb-12">
          Copyright © Cradla 2025.
        </p>
      </div>
    </div>
  );
};

export default CradlaLanding;
