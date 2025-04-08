//@ts-nocheck
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import stanfordLogo from './images/stanford.png';
import harvardLogo from './images/harvard.png'
import Image from 'next/image';

const OnboardingQuestionnaire = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      setStep(questions.length); // Move to the email signup step
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
    setEmail("");
    setSubmitSuccess(false);
  };

  // Handle email submission
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
      // Send to FormSubmit.co
      const response = await fetch('https://formsubmit.co/llano@stanford.edu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          answers: answers,
          source: 'questionnaire_cta'
        })
      });
      
      if (response.ok) {
        // Store to localStorage as a simple way to persist data
        try {
          localStorage.setItem('cradlaWaitlistUser', JSON.stringify({
            email,
            answers,
            joinedAt: new Date().toISOString()
          }));
        } catch (err) {
          console.error("Could not save to localStorage:", err);
        }
        
        setSubmitSuccess(true);
        setShowResult(true);
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
    <section className="pb-16 px-4">
      {/* Questionnaire in white background, not full width */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 md:p-12">
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
              View Your Therapy Profile
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Answer a few questions to see if Cradla's on-demand therapy approach is right for you. Takes less than 2 minutes.
            </p>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm">
              <span className="mr-2">💬</span> Join 1000+ people already on our waitlist
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

              {/* Current question or email signup */}
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
                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#DE3163] hover:bg-gray-50 transition-all flex justify-between items-center shadow-sm"
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
                    <p className="text-gray-600 mt-2">Join our exclusive waitlist to get early access.</p>
                  </div>
                
                  <div className="space-y-4 max-w-md mx-auto">
                    {/* Email form */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <input 
                        type="email" 
                        placeholder="name@email.com"
                        className="flex-grow p-3 bg-gray-100 rounded-lg border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        id="email-input"
                      />
                      <button 
                        className="px-6 py-3 text-white font-medium rounded-lg bg-[#DE3163] hover:opacity-90 transition-opacity flex items-center justify-center"
                        onClick={handleSubmitEmail}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Joining...' : 'Join Now'}
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
              
              <div className="bg-gray-50 p-6 rounded-xl mb-8 shadow-sm">
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
    </section>
  );
};

export default OnboardingQuestionnaire;