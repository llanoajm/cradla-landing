// components/products-section.tsx
"use client";

import React from "react";
import { XIcon } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogDescription,
} from "@/components/ui/morphing-dialog";
import { cn } from "@/lib/utils";

type Product = {
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  video: string;
  id: string;
  bgColor: string;
  textColor: string;
};

const PRODUCTS: Product[] = [
  {
    name: 'Cradla Provider Hub',
    description: 'Comprehensive platform for vertically-integrated insurance providers with in-house mental therapy services.',
    longDescription: 'Cradla Provider Hub is an all-in-one platform that empowers mental health professionals with AI-powered tools for managing patient relationships, documentation, and practice administration. Experience 31% increased appointment throughput and reduced wait times.',
    features: [
      'AI-assisted note taking and documentation',
      'Dynamic provider allocation system',
      'Therapeutic relationship management',
      'Real-time session guidance',
      'HIPAA-compliant secure messaging'
    ],
    video: 'https://placehold.co/1280x720/d9d9f3/333333.mp4',
    id: 'provider-hub',
    bgColor: 'from-violet-100 to-violet-200',
    textColor: 'text-violet-700'
  },
  {
    name: 'Cradla Connect',
    description: 'Patient engagement and continuity platform',
    longDescription: 'Cradla Connect ensures a seamless therapeutic journey for patients, even when switching providers. Our innovative context transfer system preserves the therapeutic relationship, eliminates repetitive intake processes, and provides continuous care regardless of provider availability.',
    features: [
      'Seamless provider transitions',
      'Continuous therapy history',
      'Personalized care recommendations',
      'Appointment flexibility',
      'Secure patient portal'
    ],
    video: 'https://placehold.co/1280x720/d1f0e0/333333.mp4',
    id: 'connect',
    bgColor: 'from-green-100 to-green-200',
    textColor: 'text-green-700'
  },
  {
    name: 'Cradla Insights',
    description: 'Analytics and practice optimization',
    longDescription: 'Cradla Insights provides powerful analytics and reporting tools that help practices understand patient outcomes, optimize scheduling, and improve operational efficiency. Gain deep understanding of practice performance and patient progress with our comprehensive dashboards.',
    features: [
      'Provider performance metrics',
      'Patient progress tracking',
      'Appointment optimization',
      'Revenue analysis',
      'Custom reporting tools'
    ],
    video: 'https://placehold.co/1280x720/fae8e8/333333.mp4',
    id: 'insights',
    bgColor: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-700'
  }
];

function ProductCard({ product }: { product: Product }) {
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className={`rounded-xl bg-gradient-to-br ${product.bgColor} p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
          <h3 className={`text-xl font-semibold mb-2 ${product.textColor}`}>{product.name}</h3>
          <p className="text-gray-700">{product.description}</p>
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <span>Learn more</span>
            <span className="text-xs bg-white/80 px-2 py-1 rounded-full">Click to expand</span>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
          <MorphingDialogTitle className="text-2xl font-bold mb-2 text-gray-900">
            {product.name}
          </MorphingDialogTitle>
          <MorphingDialogDescription 
            className="mb-6 text-gray-700"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { delay: 0.2 } },
              exit: { opacity: 0 }
            }}
          >
            <p className="text-lg mb-4">{product.longDescription}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-800">Key Features:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-xl overflow-hidden">
              <video 
                src={product.video} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full aspect-video"
              />
            </div>
          </MorphingDialogDescription>
          <MorphingDialogClose
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { delay: 0.3 } },
              exit: { opacity: 0 }
            }}
          >
            <XIcon className="h-5 w-5 text-gray-600" />
          </MorphingDialogClose>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export default function ProductsSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 text-center">Our Product</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 text-center max-w-3xl mx-auto">
            Cradla offers a comprehensive suite of tools designed to transform mental healthcare delivery,
            enabling flexible provider allocation while preserving therapeutic relationships.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              All Cradla products work seamlessly together to create a unified platform for mental healthcare providers and patients.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}