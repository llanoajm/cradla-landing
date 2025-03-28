// components/feature-cards.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";

type Feature = {
  name: string;
  description: string;
  longDescription: string;
  gradientColors: string[];
  textColor: string;
};

const FEATURES: Feature[] = [
  {
    name: "Continuous Therapeutic Record",
    description:
        "Maintains the full context of a patient's journey, enabling truly on-demand care without sacrificing relationship quality.",
    longDescription:
        "Benefit: Near full reduction in 'getting to know you' time when patients see different therapists",
    gradientColors: ["#171729", "#5546B8", "#DE3163"],
    textColor: "text-white",
  },
  {
    name: "Dynamic Practitioner Allocation",
    description:
        "Enables flexible scheduling with any qualified therapist while preserving therapeutic relationships and context continuity.",
    longDescription:
        "Benefit: 31% increase in appointment throughput and reduced wait times by an average of 18 days",
    gradientColors: ["#17293D", "#1E78C2", "#00E676"],
    textColor: "text-white",
  },
  {
    name: "Real-time Therapeutic Guidance",
    description:
        "Provides suggestions during sessions based on patient responses and emotional cues, creating value during the actual therapeutic interaction.",
    longDescription:
        "Benefit: Enhanced therapeutic efficacy and improved patient outcomes",
    gradientColors: ["#FF8A8A", "#008080", "#FFDAB9"],
    textColor: "text-white",
  },
  {
    name: "HIPAA-Compliant Security",
    description:
        "End-to-end encryption and granular access controls that limit information sharing as consented by the patient.",
    longDescription:
        "Benefit: Peace of mind with legal and regulatory compliance",
    gradientColors: ["#2D3748", "#4A5568", "#A0AEC0"],
    textColor: "text-white",
  },
  {
    name: "Advanced Analytics",
    description:
        "Track treatment progress, identify patterns, and gain insights into therapeutic efficacy across your practice.",
    longDescription:
        "Benefit: Data-driven insights to improve care standards and practice management",
    gradientColors: ["#553C9A", "#6B46C1", "#B794F4"],
    textColor: "text-white",
  },
  {
    name: "Automated Note Generation",
    description:
        "Reduces administrative burden while improving documentation quality and completeness compared to manually generated notes.",
    longDescription:
        "Benefit: 73.8% time savings for documentation, allowing more time for patient care",
    gradientColors: ["#2C5282", "#3182CE", "#90CDF4"],
    textColor: "text-white",
  }
];

// DiagonalNoiseCanvas component (unchanged)
const DiagonalNoiseCanvas = ({ colors }: { colors: string[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        generateDiagonalPattern();
      }
    };

    const generateDiagonalPattern = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const diagonal = ctx.createLinearGradient(0, 0, width, height);
      diagonal.addColorStop(0, colors[0]);
      diagonal.addColorStop(0.5, colors[1]);
      diagonal.addColorStop(1, colors[2]);

      ctx.fillStyle = diagonal;
      ctx.fillRect(0, 0, width, height);

      const curvePath = new Path2D();
      curvePath.moveTo(0, 0);
      curvePath.bezierCurveTo(
        width * 0.3,
        height * 0.2,
        width * 0.6,
        height * 0.3,
        width,
        height * 0.7
      );
      curvePath.lineTo(width, 0);
      curvePath.closePath();

      const secondCurve = new Path2D();
      secondCurve.moveTo(0, height);
      secondCurve.bezierCurveTo(
        width * 0.4,
        height * 0.8,
        width * 0.7,
        height * 0.6,
        width,
        height * 0.3
      );
      secondCurve.lineTo(0, height);
      secondCurve.closePath();

      ctx.fillStyle = `${colors[1]}33`;
      ctx.fill(curvePath);

      ctx.fillStyle = `${colors[2]}22`;
      ctx.fill(secondCurve);

      addNoiseLayer(ctx, width, height);
    };

    const addNoiseLayer = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      const noisePattern = new Uint8Array(width * height);
      for (let i = 0; i < noisePattern.length; i++) {
        noisePattern[i] = Math.random() < 0.6 ? 1 : 0;
      }

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const diagonalProgress = (x / width + y / height) / 2;
          const noiseOpacity = 0.07 + diagonalProgress * 0.1;

          if (noisePattern[y * width + x]) {
            const noiseValue = Math.floor(Math.random() * 40);
            data[index] = Math.floor(
              data[index] * (1 - noiseOpacity) + noiseValue * noiseOpacity
            );
            data[index + 1] = Math.floor(
              data[index + 1] * (1 - noiseOpacity) + noiseValue * noiseOpacity
            );
            data[index + 2] = Math.floor(
              data[index + 2] * (1 - noiseOpacity) + noiseValue * noiseOpacity
            );
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-xl"
    />
  );
};

// FeatureCard component 
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      className="rounded-xl shadow-lg relative overflow-hidden h-80 group"
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <DiagonalNoiseCanvas colors={feature.gradientColors} />
      </div>
      <div className="relative z-10 p-6 h-full flex flex-col">
        <h3 className={`text-xl font-semibold mb-2 ${feature.textColor}`}>
          {feature.name}
        </h3>
        <p className="text-gray-100 text-opacity-90">
          {feature.description}
        </p>
        <p className="text-gray-200 text-opacity-80 text-sm mt-4">
          {feature.longDescription}
        </p>
        <div className="mt-auto flex justify-between items-center">
          <span className={`text-sm font-medium text-white text-opacity-80`}>
            Learn more
          </span>
          <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:bg-white/30">
            Explore
          </span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="techgrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techgrid)" />
        </svg>
      </div>
    </motion.div>
  );
}

// The main ProductsSection component
const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<string>('cards');
  
  return (
    <section className="relative py-16 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
            Key Features and Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Cradla could help you. 
          </p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'cards'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Feature Cards
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'table'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Feature Table
            </button>
          </div>
        </div>
        
        {/* Cards View */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        )}
        
        {/* Table View */}
        {activeTab === 'table' && (
          <div className="overflow-hidden rounded-xl shadow-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Benefit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {FEATURES.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                             style={{backgroundColor: feature.gradientColors[1] + '33'}}>
                          <div className="w-4 h-4 rounded-full" 
                               style={{backgroundColor: feature.gradientColors[1]}}></div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{feature.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {feature.longDescription.replace('Benefit: ', '')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;