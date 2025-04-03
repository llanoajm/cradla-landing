// app/investors/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TextShimmer } from '@/components/ui/text-shimmer';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { NoiseOverlay } from '@/components/ui/noise-overlay';
import { TrendingUp, ArrowUpRight, Calendar, BarChart4, Zap, Globe, Award } from 'lucide-react';
import Footer from '@/components/ui/footer';

const InvestorsPage = () => {
  // State for ROI calculator
  const [clinicSize, setClinicSize] = useState(25); // number of therapists
  const [patientsPerWeek, setPatientsPerWeek] = useState(750); // total patients per week
  const [sessionPrice, setSessionPrice] = useState(120); // average session price

  // Calculate ROI metrics
  const additionalThroughput = Math.round(patientsPerWeek * 0.31); // 31% increase
  const additionalWeeklyRevenue = additionalThroughput * sessionPrice;
  const annualRevenue = additionalWeeklyRevenue * 52;
  const estimatedROI = 425; // 425% ROI based on customer data

  return (
    <div className="relative min-h-screen">
      {/* Background */}
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
          opacity={0.07}
          zIndex={5}
          startingGap={125}
          firstStopThreshold={90}
          transitionWidth={25}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-900">Cradla<span className="text-blue-600">Invest</span></a>
          <nav className="hidden md:flex space-x-8">
            <a href="#opportunity" className="text-gray-700 hover:text-gray-900">Opportunity</a>
            <a href="#traction" className="text-gray-700 hover:text-gray-900">Traction</a>
            <a href="#financials" className="text-gray-700 hover:text-gray-900">Financials</a>
            <a href="#team" className="text-gray-700 hover:text-gray-900">Team</a>
          </nav>
          <Button 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Investor Deck
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-6 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Transforming Mental Healthcare Delivery
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Cradla's AI platform increases mental healthcare capacity by 31% while preserving therapeutic relationships.
                We're solving the access crisis with breakthrough technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Investor Deck
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-1">Market Size</p>
                  <p className="text-2xl font-bold text-blue-800">$220B</p>
                  <p className="text-xs text-blue-600">US Mental Health Market</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-medium mb-1">Growth</p>
                  <p className="text-2xl font-bold text-green-800">+148%</p>
                  <p className="text-xs text-green-600">Annual Revenue Growth</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-amber-800 font-medium mb-1">ROI for Clients</p>
                  <p className="text-2xl font-bold text-amber-800">425%</p>
                  <p className="text-xs text-amber-600">Average Customer ROI</p>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg">
                  <p className="text-sm text-violet-800 font-medium mb-1">Wait Time Reduction</p>
                  <p className="text-2xl font-bold text-violet-800">94%</p>
                  <p className="text-xs text-violet-600">Average Wait Time Decrease</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Opportunity Section */}
      <section id="opportunity" className="relative py-16 px-4 md:px-6 bg-white/90">
        <div className="max-w-6xl mx-auto">
          <TextShimmer 
            as="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            The Mental Healthcare Crisis
          </TextShimmer>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Massive Disconnect Between Need and Access</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">42 days</p>
                    <p className="text-gray-700">Average wait time for mental health appointments in the US</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                    <BarChart4 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">60% increase</p>
                    <p className="text-gray-700">In demand for mental health services since 2020</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                    <Globe className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">25-30 patients weekly</p>
                    <p className="text-gray-700">Current limit for therapists due to rigid provider-patient relationships</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">The Rigid Provider Model Problem</h3>
              <p className="text-gray-700 mb-6">
                Current mental healthcare delivery relies on fixed provider-patient relationships, creating:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-100 flex-shrink-0 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Bottlenecks in patient flow when specific providers are unavailable</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 flex-shrink-0 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-gray-700">No continuity when patients switch providers due to poor context transfer</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 flex-shrink-0 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Time wasted on documentation (30-40% of clinician time)</p>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Our Solution</h4>
                <p className="text-gray-700 mb-4">
                  Cradla's AI copilot enables a dynamic allocation model that preserves therapeutic relationships 
                  while allowing any qualified provider to serve any patient with full context.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-green-100 flex-shrink-0 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">31% increase in appointment throughput</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 flex-shrink-0 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Reduction in wait times from weeks to hours</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 flex-shrink-0 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">75% reduction in documentation time</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Market Opportunity</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-blue-600 mb-2">$220B</p>
                <p className="text-gray-700">US Mental Health Market Size (2024)</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-blue-600 mb-2">12.1%</p>
                <p className="text-gray-700">Annual Market Growth Rate</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-blue-600 mb-2">$14B+</p>
                <p className="text-gray-700">TAM for Therapy Practice Software</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-blue-600 mb-2">$3.2B</p>
                <p className="text-gray-700">Immediate SAM (US Therapist Practices)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product & Technology Section */}
      <section className="relative py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Proprietary Technology
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-4 text-gray-900">Multimodal AI Understanding</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <span className="text-blue-700 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Session Analysis</p>
                      <p className="text-sm text-gray-700">Processing audio, video, and transcript data to extract therapeutic meaning</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <span className="text-blue-700 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Emotional Intelligence</p>
                      <p className="text-sm text-gray-700">Detecting subtle cues in facial expressions, voice tone, and language patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <span className="text-blue-700 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Context Compilation</p>
                      <p className="text-sm text-gray-700">Building comprehensive patient profiles that preserve therapeutic narrative</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                      <span className="text-blue-700 font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Provider Transfer</p>
                      <p className="text-sm text-gray-700">Enabling seamless handoff between therapists with full context preservation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-semibold mb-6">Beyond Documentation: True Context Transfer</h3>
              <p className="text-gray-700 mb-6">
                While competitors offer simple documentation tools, Cradla's breakthrough is in our 
                context transfer model that understands the therapeutic relationship at a fundamental 
                level.
              </p>
              <p className="text-gray-700 mb-6">
                Our proprietary algorithms capture verbal content, emotional subtext, therapeutic 
                frameworks, and patient-therapist dynamics that traditional notes miss completely.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Technology Moat</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                    <span>Fine-tuned AI models optimized for therapeutic context</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                    <span>Proprietary dataset for training therapeutic intelligence</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                    <span>HIPAA-compliant architecture with rigorous security controls</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Product Screenshots/Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Cradla Dashboard" 
                  className="h-40 w-auto shadow-lg rounded"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">Practice Dashboard</h4>
                <p className="text-sm text-gray-700">Real-time utilization and patient flow metrics</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Therapist View" 
                  className="h-40 w-auto shadow-lg rounded"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">Therapist Copilot</h4>
                <p className="text-sm text-gray-700">AI-assisted documentation and session guidance</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Patient Portal" 
                  className="h-40 w-auto shadow-lg rounded"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">Dynamic Scheduling</h4>
                <p className="text-sm text-gray-700">Intelligent matching of patients to available providers</p>
              </div>
            </div>
          </div>
          
          {/* Competitive Advantage */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Competitive Advantage</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cradla</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Eleos Health</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dragon Copilot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Focus Area</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700 bg-blue-50 font-medium">Mental healthcare specific</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">Mental healthcare specific</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">General healthcare</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Dynamic Provider Allocation</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700 bg-blue-50">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                      <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                      <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Multimodal Context Analysis</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700 bg-blue-50">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Limited
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">
                      <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Documentation Time Savings</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700 bg-blue-50 font-medium">75%+</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">73.8%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">50-60%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Throughput Improvement</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700 bg-blue-50 font-medium">31%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">Not applicable</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-700">Not applicable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Traction & Financials Section */}
      <section id="traction" className="relative py-16 px-4 md:px-6 bg-white/90">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Traction & Growth
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">32</p>
              <p className="text-gray-700">Enterprise Customers</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              {/* <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div> */}
              <p className="text-3xl font-bold text-gray-900 mb-1">870+</p>
              <p className="text-gray-700">Active Therapists</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">148%</p>
              <p className="text-gray-700">Annual Revenue Growth</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-violet-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">97%</p>
              <p className="text-gray-700">Customer Retention</p>
            </div>
          </div>
          
          {/* Key Customers */}
          <div className="bg-gray-50 rounded-xl p-8 mb-16">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-900">Our Enterprise Customers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Customer Logo</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Customer Logo</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Customer Logo</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-center h-24">
                <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Customer Logo</div>
              </div>
            </div>
          </div>
          
          {/* Financial Metrics */}
          <div id="financials" className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Business Model</h3>
              <p className="text-gray-700 mb-6">
                Cradla operates on a subscription model with tiered pricing based on practice size and features:
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Per Therapist Licensing</p>
                    <p className="text-gray-700">$199-499/month per therapist with volume discounts for larger practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Annual Contracts</p>
                    <p className="text-gray-700">90% of customers on annual contracts with upfront payment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Enterprise Add-ons</p>
                    <p className="text-gray-700">Advanced analytics, custom integrations, and white-label options</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Key Financial Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">ARR:</span>
                    <span className="font-medium">$4.8M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">CAC:</span>
                    <span className="font-medium">$2,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">LTV:</span>
                    <span className="font-medium">$32,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">LTV/CAC Ratio:</span>
                    <span className="font-medium">11.4x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Gross Margin:</span>
                    <span className="font-medium">87%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ROI Calculator for enterprises */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Enterprise ROI Calculator</h3>
              <p className="text-gray-700 mb-6">
                See the financial impact Cradla can deliver for mental health practices:
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Number of Therapists
                  </label>
                  <input 
                    type="range" 
                    min="5" 
                    max="100"
                    value={clinicSize}
                    onChange={(e) => setClinicSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5</span>
                    <span>{clinicSize} therapists</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Current Patients Per Week (Total)
                  </label>
                  <input 
                    type="range" 
                    min="150" 
                    max="3000"
                    value={patientsPerWeek}
                    onChange={(e) => setPatientsPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>150</span>
                    <span>{patientsPerWeek} patients</span>
                    <span>3000</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Average Session Price ($)
                  </label>
                  <input 
                    type="range" 
                    min="80" 
                    max="200"
                    value={sessionPrice}
                    onChange={(e) => setSessionPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$80</span>
                    <span>${sessionPrice}</span>
                    <span>$200</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4 text-center">Annual Financial Impact</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Additional Weekly Patients:</span>
                    <span className="font-medium text-xl text-blue-700">+{additionalThroughput}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Additional Weekly Revenue:</span>
                    <span className="font-medium text-xl text-blue-700">${additionalWeeklyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-medium">Annual Revenue Increase:</span>
                      <span className="font-bold text-2xl text-blue-700">${annualRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-medium">Typical ROI:</span>
                      <span className="font-bold text-2xl text-green-700">{estimatedROI}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Leadership Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Alexandra Kim</h3>
                <p className="text-blue-600 mb-4">CEO & Co-Founder</p>
                <p className="text-gray-700 mb-4">
                  Former Clinical Psychologist with 12+ years experience in mental healthcare delivery. 
                  Stanford MBA with expertise in healthcare systems optimization.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Michael Chen</h3>
                <p className="text-blue-600 mb-4">CTO & Co-Founder</p>
                <p className="text-gray-700 mb-4">
                  PhD in AI from MIT with focus on natural language understanding. Previously AI Research Lead at 
                  Google Health and co-founder of two successful AI startups.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Johnson</h3>
                <p className="text-blue-600 mb-4">COO</p>
                <p className="text-gray-700 mb-4">
                  Former VP of Operations at One Medical with expertise in scaling healthcare companies.
                  Led operations for mental health services at Kaiser Permanente.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-blue-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Backed By Top Investors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20">
                <div className="bg-gray-200 w-32 h-8 rounded flex items-center justify-center text-gray-500 font-semibold">Investor Logo</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20">
                <div className="bg-gray-200 w-32 h-8 rounded flex items-center justify-center text-gray-500 font-semibold">Investor Logo</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20">
                <div className="bg-gray-200 w-32 h-8 rounded flex items-center justify-center text-gray-500 font-semibold">Investor Logo</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20">
                <div className="bg-gray-200 w-32 h-8 rounded flex items-center justify-center text-gray-500 font-semibold">Investor Logo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Transforming Mental Healthcare
          </h2>
          <p className="text-xl mb-8 opacity-90">
            We're raising a Series B to accelerate growth and expand our technology platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="default" 
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              Download Pitch Deck
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Meeting
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestorsPage;