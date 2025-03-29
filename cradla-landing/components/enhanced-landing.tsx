// @ts-nocheck
"use client"

import React, { useRef, useState, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { FixedGooeyText } from "@/components/ui/gooey-text-morphing";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { PhoneCall, MoveRight, Brain, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextShimmer } from "@/components/ui/text-shimmer";
import DisplayCards from "@/components/ui/display-cards";
import ProductsSection from "@/components/products-section";
import { themeColors } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import FeaturesSection from "@/components/feature-section";
import Footer from './ui/footer';

const CradlaLanding = () => {
  const [activeSection, setActiveSection] = useState('start');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [therapistCount, setTherapistCount] = useState(10);
  const [patientCount, setPatientCount] = useState(300);
  const [sessionPrice, setSessionPrice] = useState(120);
  const newPatientCount = Math.round(patientCount * 1.31); // 31% increase
  const additionalPatients = newPatientCount - patientCount;
  const additionalRevenue = additionalPatients * sessionPrice;
  const annualIncrease = additionalRevenue * 52; // 52 weeks in a year
    const sectionRefs = {
    start: useRef(null),
    products: useRef(null),
    problem: useRef(null),
    features: useRef(null),
    solution: useRef(null),
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
      setIsScrolled(window.scrollY > 10);

      
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
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-6">
        <div className="flex-shrink-0 flex items-center">
          <span className="text-xl md:text-2xl font-bold text-gray-900">Cradla</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={`hidden md:block px-4 md:px-6 py-2 rounded-full transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}>
          <div className="flex space-x-3 md:space-x-6">
            {Object.keys(sectionRefs).map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-xs md:text-sm font-medium transition-colors ${
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
        
        {/* Mobile Navigation - Just showing the current section */}
        <div className="md:hidden">
          <button 
            onClick={() => scrollToSection(activeSection !== 'start' ? 'start' : 'products')}
            className="px-2 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
          >
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </button>
        </div>
        
        <div className="flex-shrink-0 flex justify-end items-center">
          <a href="#contact" className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
            Get Started
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-16">
        {/* Hero Section */}
        <section 
          ref={sectionRefs.start} 
          id="start"
          className="min-h-[75vh] flex flex-col items-center justify-center px-4 pt-4 pb-8 relative"
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
          
          <div className="container max-w-5xl mx-auto relative z-10 mt-[-80px]">
            <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-2 h-full">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.4, duration: 0.9 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mr-2 sm:mr-3 md:mr-4"
                  >
                    <DotLottieReact
                      src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                      loop
                      autoplay
                      speed={0.7}
                    />
                  </motion.div>
                
                  <div className="flex flex-col">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-black text-left">
                      Cradla
                    </h1>
                    <TextShimmer 
                      as="h2"
                      duration={1.5} 
                      className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium mt-1 text-left [--base-color:theme(colors.gray.600)] [--base-gradient-color:theme(colors.violet.500)]"
                    >
                      SOTA AI Therapy Copilot
                    </TextShimmer>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="h-28 w-full mb-4 sm:mb-6 pt-10 sm:pt-20 pb-8 sm:pb-14">
                    <FixedGooeyText
                      texts={[
                        "When patient appointments slip through the cracks, we catch them.",
                        "Reduce wait times to less than an hour",
                        "Increase appointment throughput by 31%.",
                        "Cut down documentation time by 75%",
                        "Maintain continuity when patients switch therapists.",
                        "Never lose critical patient context again.",
                        "HIPAA-compliant therapeutic intelligence."
                      ]}
                      morphTime={2}
                      cooldownTime={3.5}
                      className="font-bold text-black w-full"
                      textClassName="text-lg sm:text-xl md:text-2xl lg:text-4xl tracking-wide font-bold text-left"
                    />
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-700 text-left max-w-lg mb-4 sm:mb-8">
                    Cradla solves the mental healthcare context-sharing problem, enabling flexible provider allocation
                    while preserving the therapeutic relationship—delivering care when it's needed, with the context that makes it effective.
                  </p>
                </div>
                
                <div className="flex flex-row gap-2 sm:gap-4">
                  <Button 
                    variant="outline"
                    size="default"
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-3 md:py-3 md:px-4"
                  >
                    Book a Demo <PhoneCall className="hidden sm:inline w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button 
                    variant="default"
                    size="default"
                    onClick={() => scrollToSection('products')}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 px-3 md:py-3 md:px-4"
                  >
                    Our Products <MoveRight className="hidden sm:inline w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center h-full mt-4 lg:mt-0">
                <DisplayCards cards={[
                  {
                    icon: <Brain className="size-4 text-violet-300" />,
                    title: "Context Preservation",
                    description: "Never lose therapeutic insights",
                    date: "Continuous",
                    iconClassName: "text-violet-500",
                    titleClassName: "text-violet-500",
                    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
                  },
                  {
                    icon: <Clock className="size-4 text-blue-300" />,
                    title: "Reduced Wait Times",
                    description: "From Weeks to Under an Hour",
                    date: "Immediate",
                    iconClassName: "text-blue-500",
                    titleClassName: "text-blue-500",
                    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
                  },
                  {
                    icon: <Users className="size-4 text-green-300" />,
                    title: "31% More Throughput",
                    description: "Serve more patients effectively",
                    date: "Ongoing",
                    iconClassName: "text-green-500",
                    titleClassName: "text-green-500",
                    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
                  },
                ]} />
              </div>
            </div>
          </div>
        </section>


        {/* Products Section */}
        <section
          ref={sectionRefs.products}
          id="products"
        >
          <ProductsSection />
        </section>

        {/* Modern Calculator Section - Not in navbar */}
        <section className="relative py-16 px-4 w-full bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
                On-Demand Therapy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Just as ride-sharing apps ensure you get to your destination without needing a specific driver, Cradla enables any qualified therapist to guide a patient's journey without losing context. Our AI copilot preserves therapeutic history, emotional patterns, and treatment progress—so switching therapists feels like switching Uber drivers: effortless, intuitive, and always moving forward. By removing bottlenecks, we make therapy more accessible and flexible than ever before, and allow therapists in your network to cut down time spent on paperwork by 75% while increasing patient throughput by 31%, ultimately reducing wait times and improving care availability when patients need it most.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side: Calculator */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Calculate Your Practice ROI</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex justify-between text-gray-700 mb-2 text-sm font-medium">
                      <span>Number of Therapists</span>
                      <span className="text-[#008080] font-semibold">{therapistCount}</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="50"
                      value={therapistCount}
                      onChange={(e) => setTherapistCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#008080]"
                    />
                  </div>
                  
                  <div>
                    <label className="flex justify-between text-gray-700 mb-2 text-sm font-medium">
                      <span>Current Patients per Week (total)</span>
                      <span className="text-[#008080] font-semibold">{patientCount}</span>
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="1000"
                      value={patientCount}
                      onChange={(e) => setPatientCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#008080]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">Average Session Price ($)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input 
                        type="number" 
                        min="50" 
                        max="500"
                        value={sessionPrice}
                        onChange={(e) => setSessionPrice(parseInt(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg mt-6">
                    <p className="text-sm text-[#008080] mb-1 font-medium">About These Calculations</p>
                    <p className="text-xs text-[#008080]">
                      Based on research showing dynamic allocation models generate a 31% increase in appointment throughput 
                      without sacrificing quality of care, reducing wait times to less than an hour. Documentation speed-ups of 75% might increase throughput even further.
                    </p>
                  </div>
                </div>
              </div>            
              {/* Right side: Results */}

              <div className="relative bg-gradient-to-br from-green-50 to-emerald-200 rounded-xl p-8 shadow-lg overflow-hidden">
              {/* Green Gradient Background with canvas for more control */}
              <div className="absolute inset-0" style={{
                background: "linear-gradient(135deg, #FF8A8A 0%, #008080 50%, #FFDAB9 100%)",
                opacity: 0.85
              }}>
                {/* Noise Overlay */}
                <div 
                  className="absolute inset-0 opacity-10 mix-blend-multiply" 
                  style={{
                    backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
                    width: "200%",
                    height: "200%"
                  }}
                />
                
                {/* Wave Pattern Element */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20 bg-white" 
                    style={{
                      borderTopLeftRadius: "50%",
                      borderTopRightRadius: "50%",
                      transform: "scale(1.5)",
                      bottom: "-10px"
                    }}
                  />
                </div>
              </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Your Results with Cradla</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <div>
                        <p className="text-white/80 text-sm">Total Weekly Patients</p>
                        <div className="flex items-center mt-1">
                          <p className="text-white/50 text-sm line-through mr-2">{patientCount}</p>
                          <p className="text-2xl font-bold text-white">{newPatientCount}</p>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        <p className="text-white font-medium text-sm">+31%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <div>
                        <p className="text-white/80 text-sm">Additional Patients Weekly</p>
                        <p className="text-2xl font-bold text-white">+{additionalPatients}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        <p className="text-white font-medium text-sm">Per Week</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <div>
                        <p className="text-white/80 text-sm">Additional Weekly Revenue</p>
                        <p className="text-2xl font-bold text-white">${additionalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        <p className="text-white font-medium text-sm">Weekly</p>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">Annual Revenue Increase</p>
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                          <p className="text-white font-medium text-sm">Per Year</p>
                        </div>
                      </div>
                      <p className="text-3xl mt-2 font-bold text-white">${annualIncrease.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <a 
                      href="#contact" 
                      onClick={() => scrollToSection('contact')}
                      className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-emerald-800 bg-white rounded-lg shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                    >
                      Book a Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Benefits */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Reduced Wait Times</h4>
                <p className="text-gray-600">
                  Cut patient wait times with more efficient provider allocation.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Preserved Therapeutic Relationship</h4>
                <p className="text-gray-600">
                  Maintain continuity of care with seamless context transfer between therapists.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">HIPAA-Compliant Security</h4>
                <p className="text-gray-600">
                  Our platform maintains the highest standards of privacy and data protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Context Transfer Section */}
        <section 
          ref={sectionRefs.aiContext} 
          id="aiContext"
          className="relative py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Beyond Documentation: True Context Transfer</h2>
              <p className="text-xl text-gray-600 mb-12 text-center max-w-4xl mx-auto">
                Many services claim to streamline documentation, but Cradla is the first to capture the <span className="italic">full therapeutic context</span> by understanding not just <span className="font-semibold">what</span> is said, but <span className="font-semibold">how</span> it's expressed.
              </p>
              
              {/* Multimodal AI Visualization */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Multimodal Intelligence That Truly Understands</h3>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Therapy is fundamentally multimodal</span> — the meaning lies not just in words spoken, but in tone, expression, and emotional context.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Our state-of-the-art AI technology captures facial emotional cues, vocal prosody, and dozens of clinical variables that traditional notes miss. This creates an experience where new therapists gain insights as rich as if they had attended all previous sessions themselves.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Semantic Understanding</h4>
                        <p className="text-gray-600">Analyzes therapeutic dialogue and extracts meaningful patterns and insights.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Emotional Intelligence</h4>
                        <p className="text-gray-600">Detects subtle emotional cues through facial expressions, voice tone, and prosody analysis to capture the full emotional context.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Behavioral Patterns</h4>
                        <p className="text-gray-600">Recognizes recurring behaviors, responses to interventions, and progress indicators.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-4">
                        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Therapeutic Guidance</h4>
                        <p className="text-gray-600">Trained on evidence-based approaches including CBT, Psychoanalysis, and other modalities.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-10 -top-10 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl transform rotate-3"></div>
                  <div className="relative bg-white rounded-xl shadow-lg p-6 z-10">
                    <h3 className="text-xl font-semibold text-center mb-4">How Cradla Processes Therapy Sessions</h3>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex flex-col">
                          {/* Visualize AI processing layers */}
                          <div className="flex-1 border-b border-dashed border-gray-300 flex items-center justify-center">
                            <div className="text-center px-4">
                              <div className="text-sm font-medium text-blue-600 mb-1">Session Recording</div>
                              <div className="flex justify-center space-x-6">
                                <div className="flex flex-col items-center">
                                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                  </svg>
                                  <span className="text-xs mt-1">Audio</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-xs mt-1">Video</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                  </svg>
                                  <span className="text-xs mt-1">Transcript</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 border-b border-dashed border-gray-300 flex items-center justify-center">
                            <div className="text-center px-4">
                              <div className="text-sm font-medium text-purple-600 mb-1">Multimodal Analysis</div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-purple-50 rounded p-1 text-xs">Sentiment</div>
                                <div className="bg-purple-50 rounded p-1 text-xs">Emotions</div>
                                <div className="bg-purple-50 rounded p-1 text-xs">Patterns</div>
                                <div className="bg-purple-50 rounded p-1 text-xs">Concepts</div>
                                <div className="bg-purple-50 rounded p-1 text-xs">Techniques</div>
                                <div className="bg-purple-50 rounded p-1 text-xs">Progress</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-center px-4">
                              <div className="text-sm font-medium text-green-600 mb-1">Therapeutic Context Model</div>
                              <div className="bg-green-50 rounded-lg p-2 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-sm">HIPAA-Compliant Patient Profile</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 italic text-center">Cradla's AI processes multiple dimensions of therapeutic data to build a comprehensive context model.</p>
                  </div>
                </div>
              </div>
              
              {/* Developer Analogy */}
              <div className="bg-gray-50 rounded-xl p-8 mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">From Documentation Burden to Seamless Collaboration</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-semibold text-lg mb-3 text-red-600">The Traditional Approach</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-gray-700">Therapists spend 30-40% of their time on documentation</p>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-gray-700">Information gets lost between practitioners</p>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-gray-700">Patients must "start over" with each new therapist</p>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-gray-700">Nuanced therapeutic insights are rarely captured in notes</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-semibold text-lg mb-3 text-green-600">The Cradla Approach</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-gray-700">Documenting while understanding the complete therapeutic context</p>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-gray-700">Therapists focus on patients, not documentation</p>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-gray-700">Rich context transfer with zero additional effort</p>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-gray-700">On-demand guidance based on complete patient history</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold text-lg mb-4">Think of it Like Modern Software Development</h4>
                  <p className="text-gray-700 mb-4">
                    Just as AI Copilots now allow software developers to collaborate efficiently without excessive documentation, Cradla enables therapists to work together seamlessly:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-medium text-blue-800 mb-2">Traditional Software Teams</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>New developers needed extensive onboarding</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>Detailed documentation required for every component</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>Knowledge transfer was slow and error-prone</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-medium text-green-800 mb-2">Modern Software Teams</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>Developers join teams with minimal friction</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>Tools provide context automatically</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>Focus on creating value, not documentation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Context Transfer Process */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">HIPAA-Compliant Context Transfer Between Therapists</h3>
                
                <div className="relative py-10">
                  {/* Timeline connector */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 transform -translate-x-1/2"></div>
                  
                  {/* Step 1 */}
                  <div className="relative z-10 mb-12">
                    <div className="flex items-center mb-2">
                      <div className="flex-1 text-right pr-8 md:pr-12">
                        <h4 className="text-lg font-medium text-gray-900">Initial Session & Consent</h4>
                      </div>
                      <div className="bg-white border-4 border-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-blue-500 font-bold">1</span>
                      </div>
                      <div className="flex-1 pl-8 md:pl-12">
                        <p className="text-gray-600">Patient provides consent for AI-assisted therapy and specifies information sharing preferences</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative z-10 mb-12">
                    <div className="flex items-center mb-2">
                      <div className="flex-1 text-right pr-8 md:pr-12">
                        <p className="text-gray-600">AI captures multi-dimensional therapeutic context throughout the session</p>
                      </div>
                      <div className="bg-white border-4 border-purple-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-purple-500 font-bold">2</span>
                      </div>
                      <div className="flex-1 pl-8 md:pl-12">
                        <h4 className="text-lg font-medium text-gray-900">Context Acquisition</h4>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative z-10 mb-12">
                    <div className="flex items-center mb-2">
                      <div className="flex-1 text-right pr-8 md:pr-12">
                        <h4 className="text-lg font-medium text-gray-900">Structured Context Model</h4>
                      </div>
                      <div className="bg-white border-4 border-green-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-green-500 font-bold">3</span>
                      </div>
                      <div className="flex-1 pl-8 md:pl-12">
                        <p className="text-gray-600">Information is organized into a comprehensive, HIPAA-compliant patient profile</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="relative z-10 mb-12">
                    <div className="flex items-center mb-2">
                      <div className="flex-1 text-right pr-8 md:pr-12">
                        <p className="text-gray-600">When a new therapist is assigned, they receive appropriate context based on patient-approved sharing settings</p>
                      </div>
                      <div className="bg-white border-4 border-amber-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-amber-500 font-bold">4</span>
                      </div>
                      <div className="flex-1 pl-8 md:pl-12">
                        <h4 className="text-lg font-medium text-gray-900">Context Transfer</h4>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <div className="flex-1 text-right pr-8 md:pr-12">
                        <h4 className="text-lg font-medium text-gray-900">Real-time Assistance</h4>
                      </div>
                      <div className="bg-white border-4 border-pink-500 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-pink-500 font-bold">5</span>
                      </div>
                      <div className="flex-1 pl-8 md:pl-12">
                        <p className="text-gray-600">During the session, the new therapist receives guidance informed by the patient's complete history</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mt-8">
                  <h4 className="font-semibold text-center mb-4">Patient Control & Privacy</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h5 className="text-center font-medium mb-2">Granular Consent</h5>
                      <p className="text-sm text-center text-gray-600">Patients control exactly what information is shared with each provider</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h5 className="text-center font-medium mb-2">End-to-End Encryption</h5>
                      <p className="text-sm text-center text-gray-600">All multimodal data (text, voice patterns, emotional indicators) is encrypted in transit and at rest with security that exceeds HIPAA requirements</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h5 className="text-center font-medium mb-2">Audit Trails</h5>
                      <p className="text-sm text-center text-gray-600">Complete transparency about who accessed what information and when</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Button 
                  variant="default"
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 mx-auto"
                >
                  See How It Works <MoveRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section 
          ref={sectionRefs.problem} 
          id="problem"
          className="relative py-12 md:py-16 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 text-center">Patient Appointments Are Slipping Through The Cracks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">The Current Crisis</h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 flex-shrink-0">•</span>
                      <p className="text-sm md:text-base"><strong>42 days</strong> - Average wait time for therapy appointments in the US</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 flex-shrink-0">•</span>
                      <p className="text-sm md:text-base"><strong>80%</strong> of patients report negative experiences when switching therapists due to "painful amount of mental energy" required to start over</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 flex-shrink-0">•</span>
                      <p className="text-sm md:text-base">Therapists handle only <strong>25-30 patients weekly</strong> due to rigid provider-patient relationships</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 flex-shrink-0">•</span>
                      <p className="text-sm md:text-base">BetterHelp's ratio of <strong>1:143</strong> therapist-to-patient still results in long week-long wait times</p>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Dynamic Therapist Allocation Matters</h3>
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

         {/* Features Section */}

         <section
          ref={sectionRefs.features}
          id="features"
        >
          <FeaturesSection />
        </section>

        {/* Solution Section */}
        <section 
          ref={sectionRefs.solution} 
          id="solution"
          className="relative py-16 md:py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 text-center">How Cradla Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
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

       

        {/* Comparison Section */}
        <section 
          ref={sectionRefs.comparison} 
          id="comparison"
          className="relative py-16 md:py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Competitive Advantage</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-10 text-center">How Cradla compares to other solutions in the market</p>
              
              {/* Mobile view comparison message */}
              <div className="md:hidden p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-700 font-medium mb-2">Cradla outperforms competitors in all key metrics</p>
                <p className="text-xs text-gray-600">View on a larger screen to see our detailed comparison table</p>
              </div>
              
              {/* Desktop comparison table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-full">
                  <table className="w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">Feature</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-blue-100 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span>Cradla</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-gray-100 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          </div>
                          <span>Eleos Health</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-gray-100 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Focus Area</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span className="font-medium text-blue-800">Mental healthcare specific</span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">Mental healthcare specific</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">General healthcare documentation</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Dynamic Provider Allocation</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Therapeutic Intelligence</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xxs sm:text-xs font-medium bg-green-100 text-green-800">
                          Deep understanding
                        </span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xxs sm:text-xs font-medium bg-yellow-100 text-yellow-800">
                          Basic analysis
                        </span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xxs sm:text-xs font-medium bg-red-100 text-red-800">
                          Minimal
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Live Session Guidance</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Documentation Time Savings</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span className="font-medium">75%+</span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span>73.8%</span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span>50-60%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Emotional Pattern Recognition</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-yellow-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">Throughput Improvement</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span className="font-medium text-blue-800">31%</span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span>Not applicable</span>
                      </td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                        <span>Not applicable</span>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-10 bg-[#eddrf44] rounded-lg p-6 border border-blue-200">
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
          className="relative py-16 md:py-24 px-4 min-h-screen flex flex-col justify-center"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 text-center">Ready to Transform Your Practice?</h2>
              
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
                        <span>How dynamic allocation can reduce wait times to less than an hour</span>
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
                    href="mailto:llano@stanford.edu?subject=Book%20a%20Demo%20For%20Cradla" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                    Book Your Demo
                  </a>
                </div>
                
                <div className="bg-gradient-to-br bg-white rounded-xl p-8 shadow-lg">
                  
                  <h3 className="text-xl font-semibold text-black mb-4">Our Vision</h3>
                  <p className="text-black mb-6 italic">
                    The future of mental healthcare demands both accessibility and continuity. By solving the context transfer problem that has historically limited flexibility, Cradla creates a new opportunity that benefits patients, providers, and healthcare systems alike — delivering care when it's needed, with the context that makes it effective.
                  </p>
                  
                  <div className="border-t border-blue-200 pt-6 mt-6">
                    <h4 className="font-semibold text-black mb-2">Coming Soon</h4>
                    <p className="text-black">
                      Cradla is currently in private beta with select practices. Join our waitlist to be among the first to experience the future of mental healthcare delivery.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
        <Footer></Footer>
      </main>
    </div>
  );
};

export default CradlaLanding;