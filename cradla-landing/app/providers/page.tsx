//@ts-nocheck
"use client"

import React, { useRef, useState, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { Network, Database, Shield, BarChart, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from '@/components/ui/footer';

const ProvidersSite = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const sectionRefs = {
    start: useRef(null),
    benefits: useRef(null),
    solutions: useRef(null),
    partners: useRef(null),
    contact: useRef(null)
  };

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
            "#E3F2FD", // Light blue
            "#E0F7FA", // Light cyan 
            "#E8F5E9", // Light green
            "#F9F9F9", // Off-white
            "#E3F2FD", // Light blue
            "#E0F7FA"  // Light cyan
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
          <span className="text-xl md:text-2xl font-bold text-gray-900">Cradla <span className="text-indigo-600">for Providers</span></span>
        </div>

        <nav className={`hidden md:block px-4 md:px-6 py-2 rounded-full transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}>
          <div className="flex space-x-6">
            {['Benefits', 'Solutions', 'Partners', 'Contact'].map((item) => (
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

        <div className="flex items-center">
          <a href="/login" className="text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors mr-4 hidden md:inline-block">
            Client Login
          </a>
          <a href="#contact" 
             onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
             className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">
            Schedule Consultation
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
                <h2 className="text-lg md:text-2xl font-medium text-indigo-600">
                  Enterprise Mental Health Solutions
                </h2>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 max-w-3xl mx-auto">
              End-to-end mental health solutions for provider networks
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Transform your mental health services with AI-powered context sharing, dynamic allocation, and data-driven insights.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Schedule a Consultation
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('solutions')}
              >
                Explore Solutions <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-10 p-4 bg-white/50 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-gray-600 text-sm font-medium">Trusted by leading healthcare organizations nationwide</p>
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
                Network-wide benefits
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our enterprise solutions address the unique challenges of managing large mental health provider networks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Reduced Wait Times</h3>
                <p className="text-gray-600">
                  Cut average wait times from 42 days to less than 24 hours with our dynamic provider allocation system.
                </p>
              </div>
              
              {/* Benefit 2 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">31% Increased Utilization</h3>
                <p className="text-gray-600">
                  Optimize your therapist network with AI-powered scheduling and context sharing for significantly improved throughput.
                </p>
              </div>
              
              {/* Benefit 3 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Improved Outcomes</h3>
                <p className="text-gray-600">
                  Enhance patient satisfaction and clinical outcomes with consistent care delivery and AI-preserved therapeutic context.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => scrollToSection('solutions')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Explore Our Solutions
              </Button>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section 
          ref={sectionRefs.solutions} 
          id="solutions"
          className="py-20 px-4 relative bg-gray-50"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Enterprise Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive, scalable tools for mental health provider networks of all sizes.
              </p>
            </div>
            
            <div className="space-y-16">
              {/* Solution 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Dynamic Provider Allocation</h3>
                  <p className="text-gray-600 mb-6">
                    Our innovative system allows patients to see any available qualified therapist in your network without losing therapeutic context or continuity of care.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Reduced Wait Times</h4>
                        <p className="text-sm text-gray-600">Average wait time reduction from 42 days to less than 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Improved Provider Utilization</h4>
                        <p className="text-sm text-gray-600">31% increase in appointment throughput across your network</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Maintained Quality of Care</h4>
                        <p className="text-sm text-gray-600">No reduction in therapeutic alliance or patient satisfaction scores</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  {/* Image/illustration placeholder */}
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-indigo-50 flex items-center justify-center mb-4">
                    <Network className="w-16 h-16 text-indigo-300" />
                  </div>
                  <p className="text-sm text-gray-600 italic text-center">
                    Our AI-powered system tracks provider availability and maintains therapeutic context across your entire network.
                  </p>
                </div>
              </div>
              
              {/* Solution 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-last md:order-first bg-white rounded-xl p-6 shadow-md">
                  {/* Image/illustration placeholder */}
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-blue-50 flex items-center justify-center mb-4">
                    <Database className="w-16 h-16 text-blue-300" />
                  </div>
                  <p className="text-sm text-gray-600 italic text-center">
                    Comprehensive EHR integration and data analytics provide actionable insights across your network.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise Integration & Analytics</h3>
                  <p className="text-gray-600 mb-6">
                    Seamlessly integrate with your existing systems while gaining powerful insights through advanced analytics and reporting.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Complete EHR Integration</h4>
                        <p className="text-sm text-gray-600">Works with major EHR platforms including Epic, Cerner, and Athena</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Network-Wide Analytics</h4>
                        <p className="text-sm text-gray-600">Comprehensive dashboards for utilization, outcomes, and financial metrics</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Custom Reporting</h4>
                        <p className="text-sm text-gray-600">Tailored reports for insurance, regulatory compliance, and quality metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Solution 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise Security & Compliance</h3>
                  <p className="text-gray-600 mb-6">
                    Industry-leading security protocols and compliance frameworks ensure your patient data is always protected.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">HIPAA Compliance</h4>
                        <p className="text-sm text-gray-600">End-to-end encryption and rigorous security protocols for PHI</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">SOC 2 Type II Certified</h4>
                        <p className="text-sm text-gray-600">Regular security audits and comprehensive compliance documentation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">Role-Based Access Controls</h4>
                        <p className="text-sm text-gray-600">Granular permissions system for appropriate data access</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  {/* Image/illustration placeholder */}
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center mb-4">
                    <Shield className="w-16 h-16 text-green-300" />
                  </div>
                  <p className="text-sm text-gray-600 italic text-center">
                    Enterprise-grade security and compliance to protect sensitive mental health data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-20 px-4 relative">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Client Success Story</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                  See how a leading healthcare provider transformed their mental health services with Cradla.
                </p>
              </div>
              
              <div className="mb-8">
                <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Pacific Northwest Health Network</h3>
                  <p className="text-gray-600 italic mb-4">Regional healthcare provider with 120+ therapists serving over 15,000 patients annually</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-3xl font-bold text-indigo-600 mb-1">87%</p>
                      <p className="text-sm text-gray-600">Reduction in wait times</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-3xl font-bold text-indigo-600 mb-1">35%</p>
                      <p className="text-sm text-gray-600">Increase in provider utilization</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-3xl font-bold text-indigo-600 mb-1">$2.4M</p>
                      <p className="text-sm text-gray-600">Annual revenue increase</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  "Implementing Cradla's solution completely transformed how we deliver mental health services. Wait times dropped from over a month to just days, therapist utilization increased dramatically, and—most importantly—patient satisfaction scores improved by 23 points. The AI-assisted context sharing allows patients to see any available therapist without losing continuity of care."
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Jennifer Martinez</p>
                    <p className="text-gray-600 text-sm">Chief Medical Officer, Pacific Northwest Health Network</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="default"
                  onClick={() => scrollToSection('contact')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Request Full Case Study
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section 
          ref={sectionRefs.partners} 
          id="partners"
          className="py-20 px-4 relative bg-gray-50"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Integration Partners
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cradla integrates seamlessly with your existing technology ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Partner logos would go here - using placeholder boxes */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-center">
                  <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-400 font-medium">Partner Logo</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Don't see your system? We're constantly expanding our integration capabilities.</p>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Ask About Custom Integrations
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={sectionRefs.contact} 
          id="contact"
          className="py-20 px-4 relative"
        >
          <div className="container max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
                Schedule a Network Consultation
              </h2>
              
              <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
                Let's discuss how Cradla can transform mental healthcare delivery across your network.
              </p>
              
              <div className="max-w-md mx-auto">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your@organization.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      id="organization"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Organization name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                    <select
                      id="role"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="executive">Executive Leadership</option>
                      <option value="clinical">Clinical Director</option>
                      <option value="operations">Operations Manager</option>
                      <option value="it">IT/Technology</option>
                      <option value="procurement">Procurement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="therapists" className="block text-sm font-medium text-gray-700 mb-1">Number of Therapists</label>
                    <select
                      id="therapists"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select range</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-100">51-100</option>
                      <option value="101-250">101-250</option>
                      <option value="251+">251+</option>
                    </select>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3"
                  >
                    Schedule Consultation
                  </Button>
                </form>
                
                <p className="text-center text-sm text-gray-600 mt-4">
                  Enterprise consultations typically scheduled within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default ProvidersSite;