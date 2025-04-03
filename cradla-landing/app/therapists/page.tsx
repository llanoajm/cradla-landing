// app/therapists/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TextShimmer } from '@/components/ui/text-shimmer';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { NoiseOverlay } from '@/components/ui/noise-overlay';
import { Clock, FileText, BrainCircuit, Users } from 'lucide-react';
import Footer from '@/components/ui/footer';

const TherapistsPage = () => {
  const [documentationTime, setDocumentationTime] = useState(60); // minutes
  const [patientsPerWeek, setPatientsPerWeek] = useState(25);

  // Calculate time savings
  const timeReduction = 0.75; // 75% time reduction
  const weeklyTimeSaved = Math.round(documentationTime * patientsPerWeek * timeReduction);
  const monthlyTimeSaved = weeklyTimeSaved * 4;
  
  // Calculate additional patients
  const additionalCapacity = Math.round(patientsPerWeek * 0.31); // 31% increase

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
          opacity={0.1}
          zIndex={5}
          startingGap={125}
          firstStopThreshold={90}
          transitionWidth={25}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-900">Cradla</a>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900">Features</a>
            <a href="#benefits" className="text-gray-700 hover:text-gray-900">Benefits</a>
            <a href="#calculator" className="text-gray-700 hover:text-gray-900">ROI Calculator</a>
            <a href="#testimonials" className="text-gray-700 hover:text-gray-900">Testimonials</a>
          </nav>
          <Button 
            variant="default"
            className="bg-violet-600 hover:bg-violet-700"
          >
            Book a Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-6 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Reduce documentation time by <span className="text-violet-600">75%</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Cradla is your AI-powered therapist copilot that preserves the therapeutic relationship 
                while letting you focus on what matters most: your patients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-blue-100 opacity-70 rounded-2xl transform rotate-2"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl transform -rotate-1">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Patient Notes & Context</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Session Summary:</span> Patient discussed progress with anxiety management techniques.
                    </p>
                    <div className="border-l-2 border-violet-400 pl-3">
                      <p className="text-sm italic text-gray-600">
                        Cradla AI detected emotional shift when discussing workplace triggers. 
                        Consider exploring workplace boundaries in next session.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Treatment Progress:</span> Improved sleep reported for 3 consecutive weeks.
                    </p>
                    <div className="border-l-2 border-green-400 pl-3">
                      <p className="text-sm italic text-gray-600">
                        Sleep journal data shows 31% improvement in sleep duration and 42% reduction in night waking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-16 px-4 md:px-6 bg-white/90">
        <div className="max-w-6xl mx-auto">
          <TextShimmer 
            as="h2"
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Features Built for Therapists
          </TextShimmer>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Documentation</h3>
              <p className="text-gray-700">
                Reduce note-taking time by 75% with AI-generated session summaries, treatment plans, and progress notes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dynamic Scheduling</h3>
              <p className="text-gray-700">
                See more patients without burnout by intelligently matching availability with patient needs.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Context Preservation</h3>
              <p className="text-gray-700">
                Never lose therapeutic insights when another provider covers your patients.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Session Guidance</h3>
              <p className="text-gray-700">
                Receive real-time therapeutic suggestions based on patient history and emotional cues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Showing how it helps therapists directly */}
      <section id="benefits" className="relative py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How Cradla Transforms Your Practice
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Focus on Care, Not Documentation</h3>
              <p className="text-lg text-gray-700 mb-6">
                Traditional therapists spend 30-40% of their time on documentation. Cradla reduces this 
                burden by 75%, giving you back hours every week to focus on patient care or self-care.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated session summaries that capture key insights</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>One-click treatment plan updates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>HIPAA-compliant documentation that meets insurance requirements</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-400 to-blue-400 opacity-10 rounded-bl-full"></div>
              <h4 className="text-xl font-semibold mb-4">Documentation Time Savings</h4>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Before Cradla</span>
                  <span className="font-medium">60 min/patient</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-red-400 h-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">With Cradla</span>
                  <span className="font-medium">15 min/patient</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{width: '25%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/api/placeholder/500/400" 
                alt="Dynamic provider allocation visualization" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-semibold mb-4">See More Patients Without Sacrificing Quality</h3>
              <p className="text-lg text-gray-700 mb-6">
                Dynamic allocation increases your throughput by 31% without increasing burnout. 
                Cradla's AI ensures continuity of care when your colleagues cover your patients.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI transfers complete therapeutic context between providers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Patients report 94% satisfaction with provider flexibility</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Take time off without disrupting patient care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="relative py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Calculate Your Time Savings
          </h2>
          <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            See how much time Cradla can save you and how many more patients you can serve.
          </p>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Your Practice</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Minutes spent on documentation per patient
                    </label>
                    <input 
                      type="range" 
                      min="15" 
                      max="120"
                      value={documentationTime}
                      onChange={(e) => setDocumentationTime(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>15 min</span>
                      <span>{documentationTime} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Patients you see per week
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="50"
                      value={patientsPerWeek}
                      onChange={(e) => setPatientsPerWeek(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>5</span>
                      <span>{patientsPerWeek}</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-violet-700">Your Results with Cradla</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-gray-700 mb-2 text-sm font-medium">Time Saved Weekly</h4>
                    <p className="text-3xl font-bold text-violet-700">{weeklyTimeSaved} minutes</p>
                    <p className="text-sm text-gray-600 mt-1">That's {Math.round(weeklyTimeSaved/60)} hours per week</p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-700 mb-2 text-sm font-medium">Time Saved Monthly</h4>
                    <p className="text-3xl font-bold text-violet-700">{monthlyTimeSaved} minutes</p>
                    <p className="text-sm text-gray-600 mt-1">That's {Math.round(monthlyTimeSaved/60)} hours per month</p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-700 mb-2 text-sm font-medium">Additional Patient Capacity</h4>
                    <p className="text-3xl font-bold text-violet-700">+{additionalCapacity} patients</p>
                    <p className="text-sm text-gray-600 mt-1">31% increase in weekly throughput</p>
                  </div>
                  
                  <Button 
                    variant="default" 
                    className="w-full bg-violet-600 hover:bg-violet-700 mt-4"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Therapists Are Saying
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 font-bold text-xl">
                  D
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Dr. Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Clinical Psychologist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Cradla has given me back at least 10 hours every week. The AI understands therapy 
                sessions with remarkable accuracy, and my patients love the continuity of care."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Thomas, LMFT</h4>
                  <p className="text-sm text-gray-600">Family Therapist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I was skeptical about AI in therapy, but Cradla captures the nuance of family dynamics 
                better than my manual notes ever did. It's transformed how I handle my documentation."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jennifer Lopez, LCSW</h4>
                  <p className="text-sm text-gray-600">Social Worker</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The dynamic scheduling has allowed our clinic to reduce wait times from 3 weeks to 
                same-day appointments. The continuous context between providers has been game-changing."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 md:px-6 bg-gradient-to-r from-violet-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of therapists who are reducing documentation time and seeing more patients with Cradla.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="default" 
              size="lg"
              className="bg-white text-violet-700 hover:bg-gray-100"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TherapistsPage;