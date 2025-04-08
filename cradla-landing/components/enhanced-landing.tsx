//@ts-nocheck
"use client"

import React, { useRef, useState, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, FileText, Users, Brain, Clock, MoveRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextShimmer } from "@/components/ui/text-shimmer";
import DisplayCards from "@/components/ui/display-cards";
import ProductsSection from "@/components/products-section";
import FeaturesSection from "@/components/feature-section";
import Footer from '@/components/ui/footer';
import { Menu, X } from "lucide-react";
import heroImage from './images/heroimage.png';
import { Analytics } from "@vercel/analytics/react"
import OnboardingQuestionnaire from '@/components/onboarding-questionnaire'


const CradlaLanding = () => {
  const [activeSection, setActiveSection] = useState('start');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [therapistCount, setTherapistCount] = useState(10);
  const [patientCount, setPatientCount] = useState(300);
  const [sessionPrice, setSessionPrice] = useState(120);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeValueProp, setActiveValueProp] = useState(null);
  const newPatientCount = Math.round(patientCount * 1.31); // 31% increase
  const additionalPatients = newPatientCount - patientCount;
  const additionalRevenue = additionalPatients * sessionPrice;
  const annualIncrease = additionalRevenue * 52; // 52 weeks in a year
  
  // Value propositions data
  const valueProps = [
    {
      id: 1,
      title: "Instant Care Network",
      description: "On-demand, Omegle-style therapy.",
      icon: Users,
      position: { top: "13%", left: "0%" },
      color: "#DE3163"
    },
    {
      id: 2,
      title: "Reduced Wait Times",
      description: "Patients wait 42 days for therapy on average. We'll deliver care in under an hour with an available therapist.",
      icon: Clock,
      position: { top: "36%", left: "64%" },
      color: "#E195AB"
    },
    {
      id: 3,
      title: "As effective as 1:1 Care",
      description: "All therapists in your care circle are always fully updated on your unique story and progress.",
      icon: Users,
      position: { top: "70%", left: "50%" },
      color: "#BFC261"
    },
    {
      id: 4,
      title: "Bookmark favorite therapists",
      description: "Meet the next available one or choose your favorites.",
      icon: FileText,
      position: { top: "90%", left: "10%" },
      color: "rgb(227, 125, 177)" // Olive/chartreuse
    }
  ];
  
  // Check viewport size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Analytics/>
      {/* Main Background */}
      <div className="fixed inset-0 z-[0]">
        <AnimatedGradientBackground 
          gradientColors={[
            "#FFFFFF", // White center
            "#BFC261", // Olive/chartreuse
            "#E195AB", // Pink 
            "#DE3163", 
            "#FFD600", 
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
      <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-white shadow-md' : ''} transition-all duration-300`}>
        <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          {/* Logo with Lottie Animation */}
          <div className="flex items-center">
            <div className="w-15 h-15 mr-2">
              <DotLottieReact
                src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                loop
                autoplay
                speed={0.7}
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gray-900">Cradla</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#products" className="text-sm font-medium text-gray-600 hover:text-gray-900">Products</a>
            <a href="#approach" className="text-sm font-medium text-gray-600 hover:text-gray-900">Approach</a>
            <a href="/pitch" className="text-sm font-medium text-gray-600 hover:text-gray-900">Investors</a>
            <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">Blog</a>
            <a href="mailto:llano@stanford.edu?subject=Cradla&body=Hello, I would like to book a demo." className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
              Get Started
            </a>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-3 shadow-md">
            <nav className="flex flex-col space-y-3">
              <a href="#products" className="text-sm font-medium text-gray-600 hover:text-gray-900">Products</a>
              <a href="#approach" className="text-sm font-medium text-gray-600 hover:text-gray-900">Approach</a>
              <a href="/pitch" className="text-sm font-medium text-gray-600 hover:text-gray-900">Investors</a>
              <a href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">Blog</a>
              <a href="mailto:llano@stanford.edu?subject=Cradla&body=Hello, I would like to book a demo." className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all text-center">
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative pt-10">
        {/* Hero Section */}
        <section 
          id="start"
          className="min-h-[75vh] flex flex-col items-center justify-center px-4 pt-16 pb-8 relative"
        >
        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-2 h-full">
            <div className="flex flex-col">
              <div className="flex flex-col max-w-lg">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-6">
                  Get Mental Therapy faster than booking an Uber.
                </h1>
                
                <p className="text-xl font-medium text-gray-700 mb-8">
                  A team of therapists is already working together for you. Hop on a call with one of them in minutes.
                </p>
              
                <div className="flex flex-row gap-4">
                  <Button 
                    variant="outline"
                    size="default"
                    onClick={() => window.location.href = 'mailto:llano@stanford.edu?subject=Cradla&body=Hello, I would like to book a demo.'}
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
                    Visit our Sites <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              {/* Interactive Image with Value Proposition Dots */}
              <div className="relative max-w-md rounded-xl">
                <img 
                  src={heroImage.src}
                  alt="Therapy session visualization" 
                  className="w-full h-auto rounded-xl"
                />
                
                {/* Interactive Dots */}
                {valueProps.map((prop) => (
                  <div key={prop.id}>
                    {/* Dot with title */}
                    <motion.div
                      className="absolute z-10 cursor-pointer flex items-center"
                      style={{
                        top: prop.position.top,
                        left: prop.position.left,
                      }}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      onMouseEnter={() => setActiveValueProp(prop.id)}
                      onMouseLeave={() => setActiveValueProp(null)}
                    >
                      <div 
                        className="flex items-center"
                      >
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: prop.color }}
                        >
                          <prop.icon className="w-4 h-4 text-white" />
                        </div>
                        <div 
                          className="ml-2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium"
                          style={{ borderLeft: `3px solid ${prop.color}` }}
                        >
                          {prop.title}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Popup content on hover */}
                    {activeValueProp === prop.id && (
                      <motion.div
                        className="absolute z-20 bg-white p-4 rounded-lg shadow-lg max-w-xs"
                        style={{
                          top: `calc(${prop.position.top} + 30px)`,
                          left: prop.position.left,
                          transform: "translateX(-50%)",
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          className="w-4 h-4 bg-white absolute -top-2 left-1/2 transform -translate-x-1/2 rotate-45"
                        />
                        <h4 className="font-semibold text-gray-900 mb-1">{prop.title}</h4>
                        <p className="text-sm text-gray-700">{prop.description}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>
        <OnboardingQuestionnaire />

        {/* Products Section */}
        <section
          id="products"
        >
          <ProductsSection/>
        </section>

        <section className="relative py-16 px-4 w-full bg-white" id="approach">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
               Therapy Truly On-Demand.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Just as ride-sharing apps ensure you get to your destination without needing a specific driver, Cradla enables any qualified therapist to guide a patient's journey without losing context. Our technology preserves therapeutic history, emotional patterns, and treatment progress—so switching therapists feels like switching Uber drivers: effortless, intuitive, and always moving forward. By removing bottlenecks, we make therapy more accessible and flexible than ever before, and allow therapists to cut down time spent on paperwork by 75% while increasing patient throughput by 31%, ultimately reducing wait times and improving care availability when patients need it most.
              </p>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </main>
    </div>
  );
};

export default CradlaLanding;