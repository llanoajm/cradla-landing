'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import Footer from './ui/footer';
import { ArrowLeft, ArrowRight, Upload, DownloadCloud, Fullscreen } from 'lucide-react';

// Mock data for placeholder slides
const mockSlides = [
  {
    title: "Cradla: Transforming Mental Health",
    content: "Solving the context transfer problem in mental healthcare",
    imageUrl: "/api/placeholder/800/450",
    notes: "Introduction to Cradla and our mission"
  },
  {
    title: "The Problem",
    content: "Mental healthcare appointments are slipping through the cracks",
    bullets: [
      "48 days - Average wait time for therapy appointments",
      "80% of patients report negative experiences when switching therapists",
      "Rigid provider-patient relationships limit flexibility"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Highlighting key pain points in the current mental healthcare system"
  },
  {
    title: "Our Solution",
    content: "Dynamic allocation with preserved therapeutic relationships",
    bullets: [
      "AI-powered context sharing between therapists",
      "Complete therapeutic history preservation",
      "31% increased appointment throughput"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Explaining how Cradla solves these problems"
  },
  {
    title: "Technology",
    content: "State-of-the-art multimodal AI understanding",
    bullets: [
      "Semantic understanding of therapeutic dialogue",
      "Emotional intelligence capture from facial expressions and voice",
      "Pattern recognition for treatment efficacy",
      "HIPAA-compliant secure storage"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Deep dive into our technological advantages"
  },
  {
    title: "Market Opportunity",
    content: "$5B addressable market with rapid growth",
    bullets: [
      "Mental health tech market growing at 19% CAGR",
      "Insurance providers seeking more efficient solutions",
      "Post-pandemic surge in mental health demand"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Overview of our target market and growth projections"
  },
  {
    title: "Business Model",
    content: "B2B SaaS with high-value recurring revenue",
    bullets: [
      "$2,500/mo per practice base subscription",
      "Per-provider additional fees",
      "Enterprise packages for insurance networks",
      "97% projected retention rate"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Explanation of our business model and revenue structure"
  },
  {
    title: "Traction",
    content: "Early adoption shows promising results",
    bullets: [
      "5 pilot clinics fully implemented",
      "3 enterprise contracts in final negotiation",
      "29% reduction in wait times already demonstrated",
      "$780k ARR committed"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Current progress and traction in the market"
  },
  {
    title: "Team",
    content: "Experienced founders with deep industry expertise",
    teamMembers: [
      { name: "Dr. Sarah Chen", role: "CEO", background: "Former Clinical Director at Kaiser" },
      { name: "Michael Rodriguez", role: "CTO", background: "AI Research Lead at DeepMind" },
      { name: "Dr. James Wilson", role: "Chief Clinical Officer", background: "20+ years in clinical psychology" }
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Introduction to our leadership team"
  },
  {
    title: "Funding Ask",
    content: "Seeking $5M Series A",
    bullets: [
      "Expand engineering team (40%)",
      "Scale sales and marketing (30%)",
      "Clinical validation studies (20%)",
      "Operations and compliance (10%)"
    ],
    imageUrl: "/api/placeholder/800/450",
    notes: "Details of our funding requirements and allocation plan"
  },
  {
    title: "Thank You",
    content: "Let's transform mental healthcare together",
    contactInfo: {
      email: "contact@cradla.com",
      phone: "(650) 555-1234",
      website: "www.cradla.com"
    },
    imageUrl: "/api/placeholder/800/450",
    notes: "Closing slide with contact information"
  }
];

const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(mockSlides);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [canvaUrl, setCanvaUrl] = useState("https://www.canva.com/design/placeholder-link/view");

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextSlide();
    } else if (e.key === 'f') {
      toggleFullscreen();
    } else if (e.key === 'n') {
      setShowNotes(!showNotes);
    }
  };

  // Enhanced fullscreen function to completely take over the viewport
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

  // URL handling could be implemented later
  const updateCanvaUrl = (url: string) => {
    setCanvaUrl(url);
    // Logic to potentially fetch slide data from Canva could be added here
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slides, showNotes]); // Re-add event listener when slides or showNotes change

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
            className="px-3 py-1.5 text-xs md:text-sm font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all"
          >
            {isFullscreen ? 'Default' : 'Center'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          {/* Slide Navigation Controls */}
          <div className="flex justify-between items-center p-2 bg-gray-100">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`p-2 rounded-full ${currentSlide === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="text-sm text-gray-700">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded-full ${currentSlide === slides.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Slide Content */}
          <div className="relative aspect-[16/9] bg-white flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col p-10"
              >
                {/* Slide Content */}
                <div className="flex flex-col h-full">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{slides[currentSlide].title}</h2>
                  <h3 className="text-2xl text-gray-700 mb-6">{slides[currentSlide].content}</h3>
                  
                  {slides[currentSlide].bullets && (
                    <ul className="space-y-2 mb-6">
                      {slides[currentSlide].bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-violet-500 mr-2 flex-shrink-0">•</span>
                          <span className="text-gray-800 text-xl">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {slides[currentSlide].teamMembers && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {slides[currentSlide].teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-bold text-xl">{member.name}</h4>
                          <p className="text-violet-600">{member.role}</p>
                          <p className="text-gray-700 text-sm">{member.background}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {slides[currentSlide].contactInfo && (
                    <div className="bg-gray-50 p-4 rounded-lg inline-block">
                      <p className="text-gray-800"><strong>Email:</strong> {slides[currentSlide].contactInfo.email}</p>
                      <p className="text-gray-800"><strong>Phone:</strong> {slides[currentSlide].contactInfo.phone}</p>
                      <p className="text-gray-800"><strong>Website:</strong> {slides[currentSlide].contactInfo.website}</p>
                    </div>
                  )}
                  
                  {slides[currentSlide].imageUrl && (
                    <div className="mt-auto flex justify-center">
                      <img 
                        src={slides[currentSlide].imageUrl} 
                        alt={`Slide ${currentSlide + 1}`} 
                        className="max-h-64 object-contain rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Notes Section - Toggle with 'n' key */}
          <AnimatePresence>
            {showNotes && slides[currentSlide].notes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gray-100 border-t border-gray-200 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Speaker Notes:</h3>
                  <p className="text-gray-600">{slides[currentSlide].notes}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Bottom Controls */}
          <div className="flex justify-between items-center p-2 bg-gray-100 border-t border-gray-200">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-all"
            >
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>
            
                          <div className="text-xs text-gray-500">
              Use ← → arrows to navigate • F for fullscreen • N for notes
            </div>
            
                          <a 
              href={canvaUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-all flex items-center gap-1"
            >
              View in Canva
            </a>
          </div>
        </div>
        
      </main>

      
    </div>
  );
};

export default PitchDeckPage;