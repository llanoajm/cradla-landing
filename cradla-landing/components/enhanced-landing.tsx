//@ts-nocheck
"use client"

import React, { useRef, useState, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight, CheckCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from './ui/footer';

const MainSite = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRefs = {
    start: useRef(null),
    benefits: useRef(null),
    howitworks: useRef(null),
    testimonials: useRef(null),
    getstarted: useRef(null)
  };

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

  // Check if page is scrolled for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Main Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedGradientBackground 
          gradientColors={[
            "#FFFFFF", // White center
            "#A5D6F1", // Light blue
            "#C8B6E2", // Lavender 
            "#F5CDDE", // Light pink
            "#F9F9F9", // Off-white
            "#A5D6F1", // Light blue
            "#C8B6E2"  // Lavender
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

        <nav className={`hidden md:block px-4 md:px-6 py-2 rounded-full transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}>
          <div className="flex space-x-6">
            {['Benefits', 'How It Works', 'Testimonials', 'Get Started'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, ''))}
                className="text-sm font-medium transition-colors text-gray-600 hover:text-gray-900"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors hidden md:inline-block">
            Log In
          </a>
          <a href="#getstarted" 
             onClick={(e) => { e.preventDefault(); scrollToSection('getstarted'); }}
             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
            Find a Therapist
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-16">
        {/* Hero Section */}
        <section 
          ref={sectionRefs.start} 
          id="start"
          className="min-h-[90vh] flex flex-col items-center justify-center px-4 pt-4 pb-8 relative"
        >
          <div className="container max-w-4xl mx-auto relative z-10 text-center">
            <div className="flex justify-center items-center mb-6">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4, duration: 0.9 }}
                className="w-20 h-20 md:w-24 md:h-24 mr-4"
              >
                <DotLottieReact
                  src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                  loop
                  autoplay
                  speed={0.7}
                />
              </motion.div>

              <div className="flex flex-col items-start">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
                  Cradla
                </h1>
                <h2 className="text-lg md:text-2xl font-medium text-black">
                  Sometimes, life can't wait.
                </h2>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 max-w-3xl mx-auto">
              Omegle for therapy.
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Access therapy within an hour, not weeks. Cradla remembers your story, so you don't have to repeat yourself—even when switching therapists.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => scrollToSection('getstarted')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Find a Therapist Today
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('howitworks')}
              >
                How It Works <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-10 p-4 bg-white/50 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-gray-600 text-sm font-medium">Average wait time: Less than 1 hour</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section 
          ref={sectionRefs.benefits} 
          id="benefits"
          className="py-20 px-4 relative"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Mental healthcare designed for you
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience therapy that's flexible, accessible, and remembers your unique journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">No Long Wait Times</h3>
                <p className="text-gray-600">
                  See a therapist within 24 hours instead of waiting weeks for an appointment. Get help when you need it most.
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Never Repeat Your Story</h3>
                <p className="text-gray-600">
                  Our AI remembers your journey, so you can switch therapists without starting over. Your context stays intact.
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Book appointments that fit your life. Evening, weekend, and same-day options with any available therapist in our network.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => scrollToSection('getstarted')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section 
          ref={sectionRefs.howitworks} 
          id="howitworks"
          className="py-20 px-4 relative bg-gray-50"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                How Cradla Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A simple process designed to get you the help you need, when you need it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10">
                      <span className="font-bold text-blue-700">1</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-2">Complete a Brief Assessment</h4>
                      <p className="text-gray-600">Tell us about your needs and preferences in a quick 5-minute questionnaire.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10">
                      <span className="font-bold text-blue-700">2</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-2">Choose Your Therapist</h4>
                      <p className="text-gray-600">Browse available therapists or select our "next available" option for fastest care.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10">
                      <span className="font-bold text-blue-700">3</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-2">Connect Quickly</h4>
                      <p className="text-gray-600">Schedule a video appointment—often within 24 hours—and begin your therapy journey.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10">
                      <span className="font-bold text-blue-700">4</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-800 mb-2">Continuous Care</h4>
                      <p className="text-gray-600">Our AI assistant remembers your sessions, so you can see any therapist in our network without losing context.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative order-first md:order-last">
                <div className="aspect-w-4 aspect-h-5 rounded-xl overflow-hidden shadow-lg">
                  {/* Replace with actual app screenshot/demo */}
                  <div className="w-full h-full bg-white">
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                      <div className="p-6 text-center">
                        <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/90 shadow-md">
                          <Calendar className="w-12 h-12 text-blue-500" />
                        </div>
                        <p className="text-gray-800 font-medium">App Interface Preview</p>
                        <p className="text-xs text-gray-500 mt-2">Schedule, message, and connect with therapists</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section 
          ref={sectionRefs.testimonials} 
          id="testimonials"
          className="py-20 px-4 relative"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Real Stories from Our Patients
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from people who've transformed their mental health journey with Cradla.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-lg">
                <svg className="w-10 h-10 text-blue-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg text-gray-700 mb-6">
                  "I needed help during a difficult time but couldn't get an appointment with a therapist for weeks. Cradla matched me with someone in less than a day. When my regular therapist was unavailable, I could see someone else who already knew my history. It's been life-changing."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Jamie L.</p>
                  <p className="text-gray-600 text-sm">Cradla Patient, 10 months</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-lg">
                <svg className="w-10 h-10 text-blue-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg text-gray-700 mb-6">
                  "My work schedule is unpredictable, making it hard to commit to regular therapy appointments. With Cradla, I can book last-minute sessions with any available therapist, and they already understand my background. The flexibility has made it possible for me to stick with therapy."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Michael T.</p>
                  <p className="text-gray-600 text-sm">Cradla Patient, 6 months</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 relative bg-blue-50">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <p className="text-4xl font-bold text-blue-600 mb-2">24hrs</p>
                <p className="text-sm text-gray-600">Average wait time</p>
              </div>
              
              <div className="p-4">
                <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
                <p className="text-sm text-gray-600">Patient satisfaction</p>
              </div>
              
              <div className="p-4">
                <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
                <p className="text-sm text-gray-600">Qualified therapists</p>
              </div>
              
              <div className="p-4">
                <p className="text-4xl font-bold text-blue-600 mb-2">100%</p>
                <p className="text-sm text-gray-600">HIPAA compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section 
          ref={sectionRefs.getstarted} 
          id="getstarted"
          className="py-20 px-4 relative"
        >
          <div className="container max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
                Start your therapy journey today
              </h2>
              
              <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
                Complete a brief assessment and get matched with a therapist who meets your needs—often within 24 hours.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-6">
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg"
                  >
                    Take Assessment Now
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Most insurance plans accepted
                  </p>
                  <p className="text-sm text-gray-600">
                    Flexible scheduling, including evenings and weekends
                  </p>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700 text-center">
                    <span className="font-medium">Need immediate help?</span> If you're experiencing a crisis or emergency, please call 988 for the Suicide & Crisis Lifeline or text HOME to 741741.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default MainSite;