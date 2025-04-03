//@ts-nocheck
"use client"

import React, { useRef, useState, useEffect } from 'react';
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { MessageCircle, Shield, Smartphone, Book, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from '@/components/ui/footer';

const TeensSite = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const sectionRefs = {
    start: useRef(null),
    howithelps: useRef(null),
    topics: useRef(null),
    privacy: useRef(null),
    getstarted: useRef(null)
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
            "#F3E5F5", // Light purple
            "#BBE1FA", // Light blue 
            "#FFF4E1", // Light orange
            "#F9F9F9", // Off-white
            "#D1E7FB", // Light blue
            "#F3E5F5"  // Light purple
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
          <span className="text-xl md:text-2xl font-bold text-gray-900">Cradla <span className="text-purple-600">Teens</span></span>
        </div>

        <nav className={`hidden md:block px-4 md:px-6 py-2 rounded-full transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}>
          <div className="flex space-x-6">
            {['How It Helps', 'Topics', 'Privacy', 'Get Started'].map((item) => (
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
          <a href="/login" className="text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors mr-4 hidden md:inline-block">
            Log In
          </a>
          <a href="#getstarted" 
             onClick={(e) => { e.preventDefault(); scrollToSection('getstarted'); }}
             className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all">
            Get Support
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
                  Cradla Teens
                </h1>
                <h2 className="text-lg md:text-2xl font-medium text-purple-600">
                  Mental health support that gets you
                </h2>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 max-w-3xl mx-auto">
              Talk to someone who understands
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Connect with therapists who specialize in teen issues, in a safe space that respects your privacy and fits your schedule.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => scrollToSection('getstarted')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('howithelps')}
              >
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-10 p-4 bg-white/50 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-gray-600 text-sm font-medium">Thousands of teens already using Cradla</p>
            </div>
          </div>
        </section>

        {/* How It Helps Section */}
        <section 
          ref={sectionRefs.howithelps} 
          id="howithelps"
          className="py-20 px-4 relative"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                How Cradla helps teens
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform is designed specifically for the unique challenges teens face today.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Teen-Focused Therapists</h3>
                <p className="text-gray-600">
                  Connect with therapists who specialize in issues that matter to teens like school stress, social anxiety, and family dynamics.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Flexible Sessions</h3>
                <p className="text-gray-600">
                  Book therapy around your school and activities. Video sessions from anywhere with internet access.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Privacy First</h3>
                <p className="text-gray-600">
                  Your privacy matters. We have clear, teen-friendly policies about what stays between you and your therapist.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="default"
                size="lg"
                onClick={() => scrollToSection('getstarted')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Find Your Therapist Match
              </Button>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section 
          ref={sectionRefs.topics} 
          id="topics"
          className="py-20 px-4 relative bg-gray-50"
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                What we can help with
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our therapists specialize in the issues that matter most to teens.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Book className="w-5 h-5 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">School Stress</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Managing academic pressure, test anxiety, college applications, and balancing school with other activities.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Book className="w-5 h-5 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Social Anxiety</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Building confidence in social situations, handling peer pressure, and developing meaningful friendships.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Book className="w-5 h-5 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Family Dynamics</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Navigating family relationships, communication with parents, and handling conflicts at home.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Book className="w-5 h-5 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Identity & Self-Discovery</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Exploring questions about identity, sexuality, and finding your unique path in life.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Book className="w-5 h-5 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Mood Management</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Understanding and managing emotions, depression, anxiety, and developing healthy coping skills.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Book className="w-5 h-5 text-purple-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">Digital Life Balance</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Finding healthy relationships with social media, gaming, and screen time while managing online pressures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section 
          ref={sectionRefs.privacy} 
          id="privacy"
          className="py-20 px-4 relative"
        >
          <div className="container max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Privacy You Can Trust</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                  We take your privacy seriously. Here's what you need to know about confidentiality in therapy.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">What Stays Private</h3>
                    <p className="text-gray-600">
                      Most of what you discuss with your therapist remains completely confidential. This includes your thoughts, feelings, and the details of your sessions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Parent/Guardian Involvement</h3>
                    <p className="text-gray-600">
                      Your therapist will discuss with you and your parents/guardians exactly what information will be shared. We encourage a balance that respects your privacy while keeping parents appropriately informed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Safety Exceptions</h3>
                    <p className="text-gray-600">
                      In certain situations—like if there's a risk of harm to yourself or others—your therapist may need to involve parents or other support resources. They'll always try to discuss this with you first.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-700 text-center">
                  Your therapist will explain all privacy policies in your first session. You can always ask questions about confidentiality at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Parents Section */}
        <section className="py-20 px-4 relative bg-gray-50">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                For Parents & Guardians
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                How Cradla helps you support your teen's mental health.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Role in Your Teen's Mental Health</h3>
                  <p className="text-gray-600 mb-4">
                    As a parent, you play a vital role in your teen's mental health journey. Cradla provides the tools and resources to help you support them effectively.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2">•</div>
                      <p>Regular progress updates without violating your teen's confidentiality</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2">•</div>
                      <p>Parent resources and education on teen mental health topics</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2">•</div>
                      <p>Clear communication about insurance, billing, and scheduling</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-500 mr-2">•</div>
                      <p>Optional family sessions to improve communication and understanding</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800">How much will I know about my teen's therapy?</h4>
                      <p className="text-sm text-gray-600">
                        You'll receive general updates on progress and attendance while respecting your teen's confidential therapeutic relationship.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800">Is Cradla covered by insurance?</h4>
                      <p className="text-sm text-gray-600">
                        Yes, we accept most major insurance plans and offer affordable self-pay options.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800">How do I know if my teen's therapist is qualified?</h4>
                      <p className="text-sm text-gray-600">
                        All Cradla therapists are licensed mental health professionals with specialized training in adolescent development and teen-specific issues.
                      </p>
                    </div>
                  </div>
                </div>
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
                Ready to take the first step?
              </h2>
              
              <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
                It takes courage to ask for support. We're here to make the process as easy as possible.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-6">
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 text-lg"
                  >
                    Get Started
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Parent/guardian consent required for minors
                  </p>
                  <p className="text-sm text-gray-600">
                    Most insurance plans accepted
                  </p>
                </div>
                
                <div className="mt-8 p-4 bg-purple-50 rounded-lg">
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

export default TeensSite;