"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import TherapistFinderAnimation from "@/components/ui/therapist-finder-animation";
import stanfordLogo from './images/stanford.png';
import harvardLogo from './images/harvard.png'
import Image from 'next/image';

const OnboardingQuestionnaire = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    agreeToTerms: false
  });

  // Questions designed to emphasize Cradla's unique value proposition and gather typical therapy service info
  const questions = [
    {
      id: 'waitTime',
      question: "How frustrated are you with waiting weeks to see a therapist?",
      options: [
        { id: 'waitTime1', text: "Extremely frustrated - I need help now", value: 5 },
        { id: 'waitTime2', text: "Very frustrated - waiting makes things worse", value: 4 },
        { id: 'waitTime3', text: "Somewhat frustrated", value: 3 },
        { id: 'waitTime4', text: "A little frustrated", value: 2 },
        { id: 'waitTime5', text: "Not frustrated at all", value: 1 },
      ]
    },
    {
      id: 'therapyType',
      question: "What type of therapy support are you looking for?",
      options: [
        { id: 'therapyType1', text: "Individual therapy", value: 5 },
        { id: 'therapyType2', text: "Couples counseling", value: 3 },
        { id: 'therapyType3', text: "Family therapy", value: 3 },
        { id: 'therapyType4', text: "Group therapy", value: 2 },
        { id: 'therapyType5', text: "Not sure yet", value: 4 },
      ]
    },
    {
      id: 'age',
      question: "What is your age range?",
      options: [
        { id: 'age1', text: "18-24", value: 5 },
        { id: 'age2', text: "25-34", value: 5 },
        { id: 'age3', text: "35-44", value: 5 },
        { id: 'age4', text: "45-54", value: 4 },
        { id: 'age5', text: "55+", value: 3 },
      ]
    },
    {
      id: 'schedule',
      question: "How important is being able to access therapy outside of regular business hours?",
      options: [
        { id: 'schedule1', text: "Critical - I need evenings and weekends", value: 5 },
        { id: 'schedule2', text: "Very important - my schedule varies", value: 5 },
        { id: 'schedule3', text: "Somewhat important", value: 3 },
        { id: 'schedule4', text: "Not important - regular hours work for me", value: 1 },
      ]
    },
    {
      id: 'preference',
      question: "Do you have strong preferences for a specific therapist's background?",
      options: [
        { id: 'preference1', text: "Religious/spiritual alignment", value: 3 },
        { id: 'preference2', text: "Specific cultural background", value: 3 },
        { id: 'preference3', text: "Specific therapy approach", value: 3 },
        { id: 'preference4', text: "LGBTQ+ affirming", value: 3 },
        { id: 'preference5', text: "I'm flexible about therapist background", value: 5 },
      ]
    },
    {
      id: 'retelling',
      question: "How frustrating is it to repeatedly share your story with new therapists?",
      options: [
        { id: 'retelling1', text: "Extremely frustrating - I hate starting over", value: 5 },
        { id: 'retelling2', text: "Very frustrating - it wastes valuable session time", value: 5 },
        { id: 'retelling3', text: "Somewhat frustrating", value: 3 },
        { id: 'retelling4', text: "Not frustrating at all", value: 1 },
      ]
    },
    {
      id: 'switching',
      question: "Would you try a service where you could see ANY available therapist who already knows your full history?",
      options: [
        { id: 'switching1', text: "Absolutely - sounds revolutionary", value: 5 },
        { id: 'switching2', text: "Probably - if they truly understood my situation", value: 4 },
        { id: 'switching3', text: "Maybe - I'd need to know more", value: 3 },
        { id: 'switching4', text: "Probably not - I prefer one consistent therapist", value: 1 },
      ]
    }
  ];

  const handleAnswer = (questionId, optionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: { optionId, value }
    });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Move to the sign-up step
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const restartQuestionnaire = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      agreeToTerms: false
    });
  };

  // Calculate if Cradla is a good fit based on answers
  const calculateResult = () => {
    const values = Object.values(answers).map(a => a.value);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Skew results to maximize conversion - most users will see a positive outcome
    if (average >= 2.8) {
      return {
        isGoodFit: true,
        message: "You're an ideal candidate for Cradla's on-demand therapy!"
      };
    } else if (average >= 2.0) {
      return {
        isGoodFit: true,
        message: "Cradla's approach could revolutionize your therapy experience."
      };
    } else {
      return {
        isGoodFit: false,
        message: "Traditional therapy might better suit your current preferences, but we'd still love to tell you more about how Cradla is changing mental healthcare."
      };
    }
  };

  const result = showResult ? calculateResult() : null;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically send the data to your backend/API
    // For now, we'll just log it and show the result
    console.log("Form submitted with data:", formData);
    console.log("Questionnaire answers:", answers);
    
    // Store to localStorage as a simple way to persist data
    try {
      localStorage.setItem('cradlaWaitlistUser', JSON.stringify({
        ...formData,
        answers,
        joinedAt: new Date().toISOString()
      }));
    } catch (err) {
      console.error("Could not save to localStorage:", err);
    }
    
    setShowResult(true);
  };

  // Handle social sign-ins
  const handleGoogleSignIn = () => {
    // In a real implementation, you would integrate with Google OAuth
    alert("Google Sign-In would be triggered here. For now, please fill in the form manually.");
  };

  const handleAppleSignIn = () => {
    // In a real implementation, you would integrate with Apple Sign In
    alert("Apple Sign-In would be triggered here. For now, please fill in the form manually.");
  };

  // Key differentiators from BetterHelp
  const differentiators = [
    {
      title: "On-Demand Sessions",
      description: "Get therapy within an hour, not weeks or months later",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Smart Context Sharing",
      description: "Every therapist knows your complete history—no repeating yourself",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Flexible Scheduling",
      description: "Book on your time, not when a specific therapist is available",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "No Long-Term Commitment",
      description: "Use the service when you need it, without subscriptions",
      icon: CheckCircle,
      color: "text-green-500"
    }
  ];

  return (
    <section className="relative z-10 mt-12 mb-20 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left column for text and questionnaire */}
        <div className="w-full md:w-2/3 bg-[#F8F9FA] min-h-[800px]">
          <div className="p-8 md:p-12 max-w-2xl mx-auto">
            {/* Header content */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-600 ml-2">Developed in collaboration with</span>
                <img 
                  src={stanfordLogo.src} 
                  alt="Stanford University" 
                  className="h-8 opacity-80"
                />
                <img 
                  src={harvardLogo.src} 
                  alt="Harvard University" 
                  className="h-8 opacity-80"
                />
                
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Find Your Perfect Therapy Match
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Answer a few questions to see if Cradla's revolutionary on-demand therapy approach is right for you. Takes less than 2 minutes.
              </p>
              <div className="inline-block bg-white px-4 py-2 rounded-full text-sm shadow-sm">
                <span className="mr-2">💬</span> Join 500+ people already on our waitlist
              </div>
            </div>

            {/* Questionnaire content */}
            {!showResult ? (
              <div>
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Question {step + 1} of {questions.length + (step >= questions.length ? 1 : 0)}</span>
                    <span className="text-sm font-medium text-gray-700">{Math.round(((step + 1) / (questions.length + 1)) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#DE3163] h-2 rounded-full" 
                      style={{ width: `${((step + 1) / (questions.length + 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current question or account signup */}
                {step < questions.length ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{questions[step].question}</h3>
                    <div className="space-y-3">
                      {questions[step].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(questions[step].id, option.id, option.value)}
                          className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#DE3163] hover:bg-white transition-all flex justify-between items-center bg-white shadow-sm"
                        >
                          <span>{option.text}</span>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                    
                    {step > 0 && (
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" /> Previous Question
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="waitlist-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-gray-900">You're a perfect match for Cradla!</h3>
                      <p className="text-gray-600 mt-2">Complete your profile to join our exclusive waitlist.</p>
                    </div>
                  
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-gray-700">First Name</label>
                          <input 
                            type="text" 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DE3163] focus:border-transparent"
                            placeholder="Your first name" 
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
                          <input 
                            type="text" 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DE3163] focus:border-transparent"
                            placeholder="Your last name" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DE3163] focus:border-transparent"
                          placeholder="your@email.com" 
                        />
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2 text-gray-700">Quick Sign Up</p>
                        <div className="flex gap-3">
                          <button 
                            className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleGoogleSignIn()}
                          >
                            <svg viewBox="0 0 24 24" width="18" height="18">
                              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                              </g>
                            </svg>
                            Sign up with Google
                          </button>
                          
                          <button 
                            className="flex-1 py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleAppleSignIn()}
                          >
                            <svg viewBox="0 0 24 24" width="18" height="18">
                              <path d="M16.3,10.9C16.3,7.1,19.5,6,19.6,6c-1.8-2.6-4.5-3-5.5-3c-2.3-0.2-4.5,1.4-5.7,1.4c-1.2,0-3-1.3-4.9-1.3 c-2.5,0-4.8,1.5-6,3.7c-2.6,4.5-0.7,11.1,1.8,14.8c1.2,1.8,2.7,3.8,4.6,3.7c1.8-0.1,2.5-1.2,4.7-1.2c2.2,0,2.9,1.2,4.8,1.1 c2,0,3.3-1.8,4.5-3.6c1.4-2.1,2-4.2,2-4.3C20.1,17.3,16.3,15.3,16.3,10.9z M13.3,3.3c1-1.2,1.7-2.9,1.5-4.6c-1.5,0.1-3.3,1-4.3,2.2 c-1,1.1-1.8,2.9-1.5,4.5C10.5,5.5,12.3,4.5,13.3,3.3z" fill="#000000"/>
                            </svg>
                            Sign up with Apple
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start mt-4">
                        <input 
                          type="checkbox" 
                          id="agreeToTerms" 
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 mr-2"
                        />
                        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                          I agree to receive updates about Cradla's launch and understand I can unsubscribe at any time.
                        </label>
                      </div>
                      
                      <button 
                        onClick={handleSubmit}
                        className="w-full py-3 bg-[#DE3163] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Complete & Join Waitlist
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Questions
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-100">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">You're all set!</h3>
                  <p className="text-lg text-gray-700 mb-4">Thank you for joining the Cradla waitlist!</p>
                  
                  <div className="bg-white p-6 rounded-xl mb-8 shadow-sm">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">What happens next?</h4>
                    <ol className="text-left space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</span>
                        <span>You'll receive a confirmation email within the next few minutes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</span>
                        <span>We'll keep you updated on our launch timeline</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</span>
                        <span>You'll get priority access when we launch</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={restartQuestionnaire}
                      className="flex items-center gap-2"
                    >
                      Take Assessment Again
                    </Button>
                    
                    <Button 
                      variant="default"
                      onClick={() => window.location.href = '#products'}
                      className="bg-[#DE3163] border-0"
                    >
                      Explore Cradla Products
                    </Button>
                  </div>
                </motion.div>
              )}
          </div>
        </div>
        
        {/* Right column for iPhone animation */}
        <div className="w-full md:w-1/3 bg-[#BFC261] min-h-[800px] flex flex-col justify-center items-center p-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Looking for an available therapist
            </h3>
            <p className="text-white text-opacity-80">
              Connect with a therapist in under an hour, anytime
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-[310px] h-[631px]">
              <Iphone15Pro width={310} height={631}>
                <TherapistFinderAnimation />
              </Iphone15Pro>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingQuestionnaire;