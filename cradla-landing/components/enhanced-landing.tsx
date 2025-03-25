"use client"

import React, { useRef, useState, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { FixedGooeyText } from "@/components/ui/gooey-text-morphing";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";

const CradlaLanding = () => {
  const [activeSection, setActiveSection] = useState('start');
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const sectionRefs = {
    start: useRef(null),
    problem: useRef(null),
    solution: useRef(null),
    features: useRef(null),
    comparison: useRef(null),
    contact: useRef(null)
  };

  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId].current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Check if we're in the hero section without triggering re-renders too often
      if (sectionRefs.start.current) {
        const heroSection = sectionRefs.start.current;
        const inHeroSection = scrollPosition < heroSection.offsetTop + heroSection.offsetHeight - 200;
        
        // Only update state if it changes to avoid unnecessary re-renders
        if (inHeroSection !== isInHeroSection) {
          setIsInHeroSection(inHeroSection);
        }
      }
      
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current && scrollPosition >= ref.current.offsetTop && 
            scrollPosition < ref.current.offsetTop + ref.current.offsetHeight) {
          if (section !== activeSection) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInHeroSection, activeSection]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
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
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <nav className={`px-6 py-2 rounded-full transition-all duration-300 ${activeSection !== 'start' ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
          <div className="flex space-x-6">
            {Object.keys(sectionRefs).map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section 
                    ? 'text-gray-900 border-b-2 border-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative pt-16">
        {/* Hero Section */}
        <section 
          ref={sectionRefs.start} 
          id="start"
          className="min-h-screen flex flex-col items-center justify-center px-4 text-center py-24 relative"
        >
          {isInHeroSection && (
            <div className="absolute inset-0">
              <SplashCursor 
                SIM_RESOLUTION={64}
                DYE_RESOLUTION={1024}
                CAPTURE_RESOLUTION={512}
                DENSITY_DISSIPATION={4}
                VELOCITY_DISSIPATION={2.5}
                PRESSURE={0.1}
                PRESSURE_ITERATIONS={16}
                CURL={3}
                SPLAT_RADIUS={0.03}
                SPLAT_FORCE={6000}
                SHADING={true}
                COLOR_UPDATE_SPEED={10}
                BACK_COLOR={{ r: 1, g: 1, b: 1 }}
                TRANSPARENT={true}
              />
            </div>
          )}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.9 }}
            className="w-24 h-24 md:w-32 md:h-32"
          >
            <DotLottieReact
              src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
              loop
              autoplay
              speed={0.7}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 mb-12"
          >
            <h1 className="text-5xl font-extrabold text-gray-800 md:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
              Cradla
            </h1>
            <p className="mt-2 text-xl font-medium text-gray-700">
              AI-Powered On-demand Therapy Platform
            </p>
          </motion.div>
          
          <div className="mt-8 h-28 w-full max-w-4xl">
            <FixedGooeyText
              texts={[
                "When patient appointments slip through the cracks, we catch them.",
                "Reduce wait times by up to 18 days.",
                "Increase appointment throughput by 31%.",
                "Maintain continuity when patients switch therapists.",
                "Never lose critical patient context again.",
                "HIPAA-compliant therapeutic intelligence."
              ]}
              morphTime={2}
              cooldownTime={5}
              className="font-bold text-black w-full"
              textClassName="text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 max-w-3xl text-lg text-center"
          >
            <p className="mb-6 text-gray-800">
              Cradla solves the mental healthcare context-sharing problem, enabling flexible provider allocation
              while preserving the therapeutic relationship—delivering care when it's needed, with the context that makes it effective.
            </p>
            <button 
            onClick={() => scrollToSection('problem')}
            className="mt-8 px-8 py-3 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all"
            style={{ position: 'relative', zIndex: 40, pointerEvents: 'auto' }}
            >
            Learn How
            </button>
          </motion.div>
        </section>

        {/* Problem Section */}
        <section 
          ref={sectionRefs.problem} 
          id="problem"
          className="relative py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Patient Appointments Are Slipping Through The Cracks</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Current Crisis</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <p><strong>48 days</strong> - Average wait time for therapy appointments in the US</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <p><strong>80%</strong> of patients report negative experiences when switching therapists due to "painful amount of mental energy" required to start over</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <p>Therapists handle only <strong>25-30 patients weekly</strong> due to rigid provider-patient relationships</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <p>BetterHelp's ratio of <strong>1:143</strong> therapist-to-patient still results in long wait times</p>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Dynamic Allocation Matters</h3>
                  <p className="text-gray-700 mb-4">
                    Mental healthcare is particularly vulnerable to availability bottlenecks and continuity gaps. The therapeutic relationship is deliberately long-term, with practitioners accumulating deep, nuanced understanding of their clients.
                  </p>
                  <p className="text-gray-700">
                    <strong>Dynamic allocation models have demonstrated a 31% increase in appointment throughput</strong> without sacrificing quality of care, potentially reducing wait times by an average of 18 days while maintaining therapeutic alliance scores comparable to single-provider models.
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-70 rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">The Context Transfer Problem</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">Traditional Approach</h4>
                        <p className="text-sm text-gray-700">Fragmented knowledge, poor continuity, and lost context when switching providers</p>
                      </div>
                    </div>
                    
                    <div className="border-l-2 h-8 ml-7 border-gray-300"></div>
                    
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">Cradla's Approach</h4>
                        <p className="text-sm text-gray-700">Synchronized, contextual knowledge shared across all providers in a patient's care network</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-center mb-2">Benefits of Dynamic Allocation</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>31% increase in appointment throughput</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Average of 18 days reduction in wait times</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Maintained therapeutic alliance scores</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Near full reduction in "getting to know you" time</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section 
          ref={sectionRefs.solution} 
          id="solution"
          className="relative py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">How Cradla Works</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Understanding Therapy at a Fundamental Level</h3>
                  <p className="text-gray-700 mb-4">
                    Cradla doesn't only understand what is being said, but how it's being said within each patient's unique context by interpreting verbal, visual, and prosodic data.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The key difference is in our AI's ability to not just record but understand therapeutic narratives. Unlike simple transcription services, Cradla captures:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Emotional subtext and patterns</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Behavioral patterns and triggers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Treatment progression and responsiveness</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Alliance strength and therapeutic rapport</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Legal Considerations & Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Patient-Therapist Privilege</h4>
                        <p className="text-sm text-gray-700">Maintains legal privilege through a "circle of care" model recognized in healthcare privacy law</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">HIPAA Compliance</h4>
                        <p className="text-sm text-gray-700">End-to-end encryption, PII removal methods, and granular access controls that limit information sharing as consented by the patient</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">How Cradla's AI Copilot Works</h3>
                    
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-100"></div>
                        <div className="bg-blue-50 rounded-r-lg pl-8 pr-4 py-4 ml-4">
                          <h4 className="font-medium text-blue-800">1. Session Recording & Analysis</h4>
                          <p className="text-sm text-gray-700 mt-1">AI captures and analyzes therapy sessions, including verbal content, emotional tone, and nonverbal cues</p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-1 bg-purple-100"></div>
                        <div className="bg-purple-50 rounded-r-lg pl-8 pr-4 py-4 ml-4">
                          <h4 className="font-medium text-purple-800">2. Context Extraction & Organization</h4>
                          <p className="text-sm text-gray-700 mt-1">System identifies key therapeutic narratives, emotional patterns, and treatment responses</p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-100"></div>
                        <div className="bg-green-50 rounded-r-lg pl-8 pr-4 py-4 ml-4">
                          <h4 className="font-medium text-green-800">3. Therapeutic Memory Building</h4>
                          <p className="text-sm text-gray-700 mt-1">AI constructs a comprehensive, evolving model of the client's therapeutic journey</p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-1 bg-yellow-100"></div>
                        <div className="bg-yellow-50 rounded-r-lg pl-8 pr-4 py-4 ml-4">
                          <h4 className="font-medium text-yellow-800">4. Provider Context Transfer</h4>
                          <p className="text-sm text-gray-700 mt-1">When a patient switches therapists, the new provider receives a synthesized understanding of the patient's history and care</p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-0 w-1 h-1/2 bg-pink-100"></div>
                        <div className="bg-pink-50 rounded-r-lg pl-8 pr-4 py-4 ml-4">
                          <h4 className="font-medium text-pink-800">5. Real-time Assistance</h4>
                          <p className="text-sm text-gray-700 mt-1">During sessions, AI provides suggestions based on patient history and emotional state to enhance therapeutic efficacy</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-center mb-3">Immediate Value Even Without Dynamic Allocation</h4>
                      <p className="text-sm text-gray-700">
                        Even for practices that choose not to implement dynamic allocation immediately, Cradla's note and compliance automation provides immediate value by reducing administrative burden while improving note quality and completeness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          ref={sectionRefs.features} 
          id="features"
          className="relative py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Key Features & Benefits</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md">
                  <div className="rounded-full bg-blue-200 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Continuous Therapeutic Record</h3>
                  <p className="text-gray-700">
                    Maintains the full context of a patient's journey, enabling truly on-demand care without sacrificing relationship quality.
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-blue-800 font-medium">Benefit: Near full reduction in "getting to know you" time when patients see different therapists</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-md">
                  <div className="rounded-full bg-purple-200 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Dynamic Practitioner Allocation</h3>
                  <p className="text-gray-700">
                    Enables flexible scheduling with any qualified therapist while preserving therapeutic relationships and context continuity.
                  </p>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-sm text-purple-800 font-medium">Benefit: 31% increase in appointment throughput and reduced wait times by an average of 18 days</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md">
                  <div className="rounded-full bg-green-200 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Therapeutic Guidance</h3>
                  <p className="text-gray-700">
                    Provides suggestions during sessions based on patient responses and emotional cues, creating value during the actual therapeutic interaction.
                  </p>
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-sm text-green-800 font-medium">Benefit: Enhanced therapeutic efficacy and improved patient outcomes</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-md">
                  <div className="rounded-full bg-amber-200 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">HIPAA-Compliant Security</h3>
                  <p className="text-gray-700">
                    End-to-end encryption and granular access controls that limit information sharing as consented by the patient.
                  </p>
                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <p className="text-sm text-amber-800 font-medium">Benefit: Peace of mind with legal and regulatory compliance</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 shadow-md">
                  <div className="rounded-full bg-pink-200 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-700">
                    Track treatment progress, identify patterns, and gain insights into therapeutic efficacy across your practice.
                  </p>
                  <div className="mt-4 pt-4 border-t border-pink-200">
                    <p className="text-sm text-pink-800 font-medium">Benefit: Data-driven insights to improve care standards and practice management</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 shadow-md">
                  <div className="rounded-full bg-cyan-200 w-12 h-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-cyan-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Automated Note Generation</h3>
                  <p className="text-gray-700">
                    Reduces administrative burden while improving documentation quality and completeness compared to manually generated notes.
                  </p>
                  <div className="mt-4 pt-4 border-t border-cyan-200">
                    <p className="text-sm text-cyan-800 font-medium">Benefit: 73.8% time savings for documentation, allowing more time for patient care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section 
          ref={sectionRefs.comparison} 
          id="comparison"
          className="relative py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">Competitive Advantage</h2>
              <p className="text-xl text-gray-600 mb-10 text-center">How Cradla compares to other solutions in the market</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span>Cradla</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                          <span>Eleos Health</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <span>Microsoft Dragon Copilot</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Focus Area</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span className="font-medium text-blue-800">Mental healthcare specific</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">Mental healthcare specific</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">General healthcare documentation</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dynamic Provider Allocation</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Therapeutic Intelligence</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Deep understanding
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Basic analysis
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Minimal
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Live Session Guidance</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Documentation Time Savings</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span className="font-medium">75%+</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span>73.8%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span>50-60%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Emotional Pattern Recognition</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-yellow-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <svg className="w-6 h-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Throughput Improvement</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span className="font-medium text-blue-800">31%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span>Not applicable</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        <span>Not applicable</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10 bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Cradla?</h3>
                <p className="text-gray-700 mb-4">
                  While Eleos Health offers valuable AI-assisted note-taking, and Microsoft recently launched Dragon Copilot for healthcare documentation, Cradla provides a more comprehensive ecosystem that fundamentally transforms how mental healthcare is delivered.
                </p>
                <p className="text-gray-700">
                  The future of mental healthcare demands both accessibility and continuity. By solving the context transfer problem that has historically limited flexibility, Cradla creates a new opportunity that benefits patients, providers, and healthcare systems alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={sectionRefs.contact} 
          id="contact"
          className="relative py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Ready to Transform Your Practice?</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Book a Demo</h3>
                  <p className="text-gray-700 mb-6">
                    See how Cradla can transform your mental health practice by enabling dynamic allocation while preserving therapeutic relationships.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn in Our Demo:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>How our AI copilot captures therapeutic context</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Our implementation process and timeline</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>How dynamic allocation can reduce wait times by up to 18 days</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Pricing and ROI calculations for your practice</span>
                      </li>
                    </ul>
                  </div>
                  
                  <a 
                    href="mailto:llano@stanford.edu" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Book Your Demo
                  </a>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                  <p className="text-gray-700 mb-6 italic">
                    "The future of mental healthcare demands both accessibility and continuity. By solving the context transfer problem that has historically limited flexibility, Cradla creates a new opportunity that benefits patients, providers, and healthcare systems alike — delivering care when it's needed, with the context that makes it effective."
                  </p>
                  
                  <div className="border-t border-blue-200 pt-6 mt-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Coming Soon</h4>
                    <p className="text-gray-700">
                      Cradla is currently in private beta with select practices. Join our waitlist to be among the first to experience the future of mental healthcare delivery.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <p className="text-sm text-gray-600">
                  Copyright © Cradla 2025
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CradlaLanding;