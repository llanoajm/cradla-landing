// app/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TextShimmer } from '@/components/ui/text-shimmer';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { NoiseOverlay } from '@/components/ui/noise-overlay';
import { SplashCursor } from '@/components/ui/splash-cursor';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowUpRight, ArrowRight, FileText, Users, Brain, Clock } from 'lucide-react';
import Footer from '@/components/ui/footer';

const HomePage = () => {
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

      {/* Interactive Splash Background */}
      <div className="fixed inset-0 z-0">
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

      {/* Navigation Bar */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-6">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-2xl font-bold text-gray-900">Cradla</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block px-4 md:px-6 py-2 rounded-full transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-md">
            <div className="flex space-x-6">
              <a href="#products" className="text-sm font-medium text-gray-600 hover:text-gray-900">Products</a>
              <a href="#problem" className="text-sm font-medium text-gray-600 hover:text-gray-900">Problem</a>
              <a href="#solution" className="text-sm font-medium text-gray-600 hover:text-gray-900">Solution</a>
              <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </nav>

          {/* CTA */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/investors" className="mr-4 text-sm font-medium text-gray-600 hover:text-gray-900">
              Investors
            </a>
            <a href="/blog" className="mr-4 text-sm font-medium text-gray-600 hover:text-gray-900">
              Blog
            </a>
            <a href="#contact" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 relative">
        <div className="container max-w-5xl mx-auto relative z-10 mt-[-80px]">
          <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-2 h-full">
            <div className="flex flex-col">
              {/* Logo + Animation */}
              <div className="flex items-center mb-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.4, duration: 0.9 }}
                  className="w-24 h-24 md:w-32 md:h-32 mr-4"
                >
                  <DotLottieReact
                    src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                    loop
                    autoplay
                    speed={0.7}
                  />
                </motion.div>
              
                <div className="flex flex-col">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black">
                    Cradla
                  </h1>
                  <TextShimmer 
                    as="h2"
                    duration={1.5} 
                    className="text-lg md:text-2xl font-medium mt-1 [--base-color:theme(colors.gray.600)] [--base-gradient-color:theme(colors.violet.500)]"
                  >
                    AI Therapy Copilot
                  </TextShimmer>
                </div>
              </div>
              
              <div className="flex flex-col max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  When patient appointments slip through the cracks, we catch them.
                </h2>
                
                <p className="text-lg font-medium text-gray-700 mb-8">
                  Cradla solves the mental healthcare context-sharing problem, enabling flexible provider allocation
                  while preserving the therapeutic relationship—delivering care when it's needed, with the context that makes it effective.
                </p>
              
                <div className="flex flex-row gap-4">
                  <Button 
                    variant="outline"
                    size="default"
                    onClick={() => window.location.href = '#contact'}
                    className="flex items-center gap-2"
                  >
                    Book a Demo <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="default"
                    size="default"
                    onClick={() => window.location.href = '#products'}
                    className="flex items-center gap-2"
                  >
                    Our Products <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-white/80 p-6 rounded-xl shadow-lg max-w-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">What We Deliver</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-violet-100 p-2 rounded-full mr-3">
                      <Brain className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-medium">Context Preservation</p>
                      <p className="text-sm text-gray-600">Maintain therapeutic continuity even when patients switch providers</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Reduced Wait Times</p>
                      <p className="text-sm text-gray-600">From weeks to under an hour with dynamic allocation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">31% More Throughput</p>
                      <p className="text-sm text-gray-600">Serve more patients effectively with AI-powered assistance</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">75% Less Documentation</p>
                      <p className="text-sm text-gray-600">AI note-taking lets therapists focus on patients, not paperwork</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 relative bg-white/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Products</h2>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Cradla offers specialized solutions for every stakeholder in the mental healthcare journey.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* For Providers Card */}
            <a 
              href="https://providers.cradla.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                For Providers
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </h3>
              <p className="mb-6">
                Practice management platform that increases patient throughput by 31% through dynamic provider allocation.
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reduce wait times from weeks to hours
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Optimize therapist scheduling
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Increase revenue without adding staff
                  </li>
                </ul>
              </div>
            </a>
            
            {/* For Patients Card */}
            <a 
              href="https://cradla.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                For Patients
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </h3>
              <p className="mb-6">
                On-demand therapy with any qualified provider, without losing your therapeutic history or having to repeat your story.
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Same-day appointments
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Personalized care continuity
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Better therapeutic outcomes
                  </li>
                </ul>
              </div>
            </a>
            
            {/* For Therapists Card */}
            <a 
              href="https://therapists.cradla.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                For Therapists
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </h3>
              <p className="mb-6">
                AI copilot that reduces documentation time by 75% while providing real-time therapeutic guidance.
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Automated session notes
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Context-aware suggestions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Focus more on patient care
                  </li>
                </ul>
              </div>
            </a>
          </div>
          
          {/* Additional Resources */}
          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a 
              href="https://blog.cradla.com" 
              className="flex items-center justify-between bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Blog</h3>
                <p className="text-gray-700">Deep dives into AI therapy technology, industry trends, and research findings.</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-900" />
            </a>
            
            <a 
              href="https://investors.cradla.com" 
              className="flex items-center justify-between bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Investor Information</h3>
                <p className="text-gray-700">Learn about our market opportunity, business model, and growth trajectory.</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-900" />
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-4 relative bg-gray-50/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">The Mental Healthcare Crisis</h2>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Mental healthcare is facing a growing crisis of access and continuity.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">The Current State</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <span className="text-red-600 font-bold">42</span>
                  </div>
                  <div>
                    <p className="font-medium">42 days average wait time</p>
                    <p className="text-gray-700">Patients face critical delays accessing mental healthcare</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <span className="text-red-600 font-bold">80%</span>
                  </div>
                  <div>
                    <p className="font-medium">Negative experience switching therapists</p>
                    <p className="text-gray-700">Patient context is lost when changing providers</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <span className="text-red-600 font-bold">40%</span>
                  </div>
                  <div>
                    <p className="font-medium">Therapist time spent on documentation</p>
                    <p className="text-gray-700">Administrative burden reduces patient care time</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">The Rigid Provider Model</h3>
              <p className="text-gray-700 mb-6">
                Today's mental healthcare relies on fixed therapist-patient relationships:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="italic text-gray-700">
                  "When a patient's regular therapist is unavailable, the patient either waits or starts over with someone new who doesn't know their history."
                </p>
              </div>
              <p className="text-gray-700">
                This model creates bottlenecks in patient flow, limits provider flexibility, and makes it difficult to accommodate urgent care needs - all while wasting valuable therapist time on redundant documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Solution</h2>
          <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Cradla uses AI to enable a dynamic allocation model that preserves therapeutic relationships.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">The Dynamic Allocation Model</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-700 font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">AI Context Capture</h4>
                <p className="text-gray-700 text-sm">
                  Our multimodal AI analyzes therapy sessions to capture verbal content, emotional cues, and therapeutic patterns.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-700 font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">Therapeutic Memory</h4>
                <p className="text-gray-700 text-sm">
                  The system builds and maintains a comprehensive patient profile that preserves the therapeutic relationship.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-700 font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">Provider Flexibility</h4>
                <p className="text-gray-700 text-sm">
                  Any qualified therapist can quickly understand the patient's context and provide effective care without starting over.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Real Results</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <span className="text-green-600 font-bold">31%</span>
                  </div>
                  <div>
                    <p className="font-medium">Increased appointment throughput</p>
                    <p className="text-gray-700">More patients receive care without adding staff</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <span className="text-green-600 font-bold">75%</span>
                  </div>
                  <div>
                    <p className="font-medium">Reduction in documentation time</p>
                    <p className="text-gray-700">Therapists focus more on patient care</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <span className="text-green-600 font-bold">94%</span>
                  </div>
                  <div>
                    <p className="font-medium">Wait time reduction</p>
                    <p className="text-gray-700">From weeks to less than an hour</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">HIPAA-Compliant Security</h3>
              <p className="text-gray-700 mb-4">
                Cradla prioritizes patient privacy and data security with:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>End-to-end encryption for all patient data</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Granular patient consent controls</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Comprehensive audit trails</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Regular third-party security assessments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started with Cradla</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to transform how you deliver or receive mental healthcare?
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="https://providers.cradla.com#contact" className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-all">
              <h3 className="text-xl font-semibold mb-3">For Providers</h3>
              <p className="text-sm mb-4">Schedule a demo for your practice</p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full">
                Book Provider Demo
              </Button>
            </a>
            
            <a href="https://cradla.com#download" className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-all">
              <h3 className="text-xl font-semibold mb-3">For Patients</h3>
              <p className="text-sm mb-4">Join our waitlist or download our app</p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full">
                Get Started
              </Button>
            </a>
            
            <a href="https://therapists.cradla.com#contact" className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-all">
              <h3 className="text-xl font-semibold mb-3">For Therapists</h3>
              <p className="text-sm mb-4">Try our AI documentation assistant</p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full">
                Request Access
              </Button>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="https://investors.cradla.com" 
              className="bg-white text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all"
            >
              Investor Information
            </a>
            <a 
              href="https://blog.cradla.com" 
              className="bg-transparent border border-white text-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              Visit Our Blog
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;