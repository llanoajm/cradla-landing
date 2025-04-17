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
import detailImage from './images/detailImage.png'
import { Analytics } from "@vercel/analytics/react"
import OnboardingQuestionnaire from '@/components/onboarding-questionnaire'
import TrustedPartners from './ trusted-partners';



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

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Function to handle email submission
  const handleSubmitEmail = async () => {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value;
    
    // Simple validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Option 1: FormSubmit.co (No sign up required, works immediately)
      // Replace "youremail@example.com" with your actual email
      const response = await fetch('https://formsubmit.co/contact@cradla.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          source: 'landing_page_cta'
        })
      });
      
      if (response.ok) {
        // Show success message
        setSubmitSuccess(true);
        document.getElementById('success-message').classList.remove('hidden');
        emailInput.value = '';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Value propositions data
  const valueProps = [

    {
      id: 1,
      title: "Instant like Omegle",
      description: "Other services take 42 days on average. We'll deliver in minutes.",
      icon: Clock,
      position: { top: "36%", left: "64%" },
      color: "#E195AB"
    },
    {
      id: 2,
      title: "As effective as 1:1 Care",
      description: "All therapists in your care circle are always fully updated on your unique story and progress.",
      icon: Users,
      position: { top: "70%", left: "50%" },
      color: "#BFC261"
    },
    {
      id: 3,
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
    
    <div className="relative min-h-screen overflow-x-hidden bg-white"  style={{ fontFamily: 'Raleway, sans-serif' }}>
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
            <span className="text-xl md:text-3xl font-bold text-[#ed70c1] mr-[-18]">Cradla</span>
            <div className="w-18 h-18 mr-2 pb-1">
              <DotLottieReact
                src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                loop
                autoplay
                speed={0.7}
              />
            </div>
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#products" className="text-sm font-medium text-gray-600 hover:text-gray-900">Products</a>
            <a href="/pitch" className="text-sm font-medium text-gray-600 hover:text-gray-900">Investors</a>
            <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">Blog</a>
            <a href="mailto:contact@cradla.com?subject=Cradla&body=Hello, I would like to book a demo." className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">
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
              <a href="/pitch" className="text-sm font-medium text-gray-600 hover:text-gray-900">Investors</a>
              <a href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">Blog</a>
              <a href="mailto:contact@cradla.com?subject=Cradla&body=Hello, I would like to book a demo." className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all text-center">
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative pt-7">
        {/* Hero Section - Updated with responsive improvements */}
        <section 
          id="start"
          className="min-h-[75vh] flex flex-col items-center justify-center px-4 pt-16 pb-8 relative"
        >
          <div className="container max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-12 h-full mt-4 lg:mt-0">
              {/* Text Content - Centered on mobile */}
              <div className="flex flex-col items-center lg:items-start mt-6 lg:mt-0 lg:col-span-7  /* ← span 7/12ths on lg+ */">
                <div className="flex flex-col max-w-lg text-center lg:text-left">
                  <div className='mb-2'><h1 className="text-4xl md:text-[2.5rem] font-bold text-gray-800 tracking-tight">Talk to a therapist that understands you in minutes.</h1></div>
                  <div className='mb-5'><h1 className="text-4xl md:text-[2.5rem] font-bold text-[#60613f] tracking-tight">As easy as Omegle.</h1></div>
                  <p className='text-gray-700 mb-5'>Every therapist in your care circle is already synced with everything they need to know about you to help you. </p>
                  
                  {/* Email form - Full width on mobile, constrained on desktop */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input 
                      type="email" 
                      placeholder="name@email.com"
                      className="flex-grow p-3 bg-gray-100 rounded-lg border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      id="email-input"
                    />
                    <button 
                      className="px-6 py-3 text-white font-medium rounded-lg bg-pink-500 hover:bg-pink-600 transition-all flex items-center justify-center"
                      onClick={handleSubmitEmail}
                    >
                      Join Now
                    </button>
                  </div>

                  <p className="text-[20px] font-medium text-gray-700 mt-8 mb-8"></p>
                  
                  {/* Success message - initially hidden */}
                  <div id="success-message" className="mt-4 text-gray-600 font-medium hidden">
                    Thanks! You're now in the waitlist. We'll reach out soon. ✅
                  </div>
                </div>
              </div>

              {/* Image Container - Centered on all screens with responsive sizing */}
              <div className="flex items-center justify-center w-full lg:col-span-5  /* ← span remaining 5/12ths */">
                {/* Interactive Image with Value Proposition Dots */}
                <div className="relative w-full max-w-sm md:max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-xl">
                  <img 
                    src={heroImage.src}
                    alt="Therapy session visualization" 
                    className="w-full h-auto rounded-xl"
                  />
                  
                  {/* Interactive Dots - These will adjust relative to image size */}
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
                        <div className="flex items-center">
                          <div 
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: prop.color }}
                          >
                            <prop.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
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
                          className="absolute z-20 bg-white p-3 md:p-4 rounded-lg shadow-lg max-w-xs"
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



        {/* Team of Therapists Section */}
        <section className="pb-16 px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left side - Image (smaller) */}
                <div className="lg:col-span-5 relative order-2 lg:order-1">
                  <div className="h-full flex items-center justify-center p-6">
                    <div className="relative max-w-xs md:max-w-sm mx-auto">
                      <img 
                        src={detailImage.src} 
                        alt="Cradla app interface showing therapist selection" 
                        className="rounded-lg w-full h-auto"
                      />
                      <div className="absolute bottom-2 right-2 bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-medium">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Available in minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Text content (larger) */}
                <div className="lg:col-span-7 p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 order-1 lg:order-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 tracking-tight leading-tight">
                    A Team of Therapists Working Together for You
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3">
                    Meet a new available therapist every session, but they all work together and share notes to help you.
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6">
                    Never start from scratch, even with a new therapist.
                  </p>
                  
                  {/* Benefits list */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <Clock className="w-4 h-4 text-pink-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Therapy On Your Schedule</h4>
                        <p className="text-gray-600">Get help when you need it, not weeks later</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustedPartners />
        <OnboardingQuestionnaire />
        

        {/* Products Section */}
        <section
          id="products"
        >
          <ProductsSection/>
        </section>



        <Footer></Footer>
      </main>
    </div>
  );
};

export default CradlaLanding;