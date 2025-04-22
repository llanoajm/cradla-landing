// components/products-section.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { XIcon, ArrowRight, ArrowUpRight } from "lucide-react";

import { motion } from "framer-motion";
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
  gradientColors: string[];
  textColor: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Cradla For Patients",
    longDescription:
      "Seamless mental health care that remembers your journey, allowing you to see any available therapist without repeating your story or starting over—reducing wait times and delivering personalized support exactly when you need it.",
    description:
      "Get videocall therapy sessions within the hour, without retelling your story. ",
    features: [
      "See available therapists without repeating your story",
      "Reduce wait times from weeks to days",
      "Maintain consistent care even when your regular therapist is unavailable",
      "Schedule appointments that fit your life",
      "Control information sharing between therapists",
      "Access your secure therapy journey",
    ],
    video: "https://placehold.co/1280x720/d1f0e0/333333.mp4",
    id: "connect",
    gradientColors: ["#FF8A8A", "#008080", "#FFDAB9"],
    textColor: "text-white",
  },
  {
    name: "Cradla For Therapists",
    description:
      "The most therapist-friendly network. Work on your own terms and learn more about the tech that makes Cradla possible.",
    longDescription:
      "Cradla Therapist Copilot is an all-in-one platform that empowers mental health professionals with AI-powered tools for managing patient relationships, documentation, and practice administration. Experience 31% increased appointment throughput and reduced wait times.",
    features: [
      "AI-assisted note taking and documentation",
      "Dynamic provider allocation system",
      "Therapeutic relationship management",
      "Real-time session guidance",
      "HIPAA-compliant secure messaging",
    ],
    video: "https://placehold.co/1280x720/fae8e8/333333.mp4",
    id: "insights",
    gradientColors: ["#17293D", "#1E78C2", "#FFDAB9"],
    textColor: "text-white",
  },
  {
    name: "Cradla Enterprise",
    description:
      "Learn how Cradla can help you maximize your practice's therapist utilization, reduce wait times, and improve care quality through AI-powered context sharing.",
    longDescription:
      "Cradla Insights provides powerful analytics and reporting tools that help therapy networks and practices understand patient outcomes, optimize scheduling, and improve operational efficiency. Gain deep understanding of practice performance and patient progress with our comprehensive dashboards.",
    features: [
      "Provider performance metrics",
      "Patient progress tracking",
      "Appointment optimization",
      "Revenue analysis",
      "Custom reporting tools",
    ],
    video: "https://www.youtube.com/watch?v=-aFMDuSvPDc&feature=youtu.be",
    id: "provider-hub",
    gradientColors: ["#171729", "#5546B8", "#DE3163"],
    textColor: "text-white",
  }
];

// Dummy images for the slideshow
const slideshowImages: Record<string, string[]> = {
  "provider-hub": [
    "https://placehold.co/800x400?text=Network+Slide+1",
    "https://placehold.co/800x400?text=Network+Slide+2",
    "https://placehold.co/800x400?text=Network+Slide+3",
  ],
  insights: [
    "https://placehold.co/800x400?text=Therapist+Slide+1",
    "https://placehold.co/800x400?text=Therapist+Slide+2",
    "https://placehold.co/800x400?text=Therapist+Slide+3",
  ],
  connect: [
    "https://placehold.co/800x400?text=Patient+Slide+1",
    "https://placehold.co/800x400?text=Patient+Slide+2",
    "https://placehold.co/800x400?text=Patient+Slide+3",
  ],
};

// Slideshow component
function Slideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-auto rounded-lg"
      />
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100"
      >
        ›
      </button>
    </div>
  );
}

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

// ProductCard component (unchanged)
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
        <motion.div
          className="rounded-xl shadow-lg relative overflow-hidden h-60 group"
          whileHover={{
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <div className="absolute inset-0 w-full h-full">
            <DiagonalNoiseCanvas colors={product.gradientColors} />
          </div>
          <div className="relative z-10 p-6 h-full flex flex-col">
            <h3 className={`text-xl font-semibold mb-2 ${product.textColor}`}>
              {product.name}
            </h3>
            <p className="text-gray-100 text-opacity-90">
              {product.description}
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
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-200">
          <MorphingDialogTitle className="text-2xl font-bold mb-2 text-gray-900">
            {product.name}
          </MorphingDialogTitle>
          <MorphingDialogDescription
            className="mb-6 text-gray-700"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { delay: 0.2 } },
              exit: { opacity: 0 },
            }}
          >
            <p className="text-lg mb-4">{product.longDescription}</p>
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-900">Key Features:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
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
              exit: { opacity: 0 },
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
  const [selectedProduct, setSelectedProduct] = useState("provider-hub");

  const tabs = [
    { label: "Network", id: "provider-hub" },
    { label: "Therapist", id: "insights" },
    { label: "Patient", id: "connect" },
  ];

  return (
    <section className="relative py-24 px-4 mt-[-80px]">
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 text-center">
            Explore Cradla
          </h2>

          
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-6 text-center max-w-3xl mx-auto">
            Cradla is currently under construction. But feel free to browse around our progress.
          </p>
          
            {/* Additional Resources */}
            <div className="mt-auto grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-4">
            <a 
              href="https://blog.cradla.com" 
              className="flex items-center justify-between bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Blog</h3>
                <p className="text-gray-700 text-sm">Deep dives into therapy technology, industry trends, and research findings.</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-900" />
            </a>
            
            <a 
              href="/pitch" 
              className="flex items-center justify-between bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Invest</h3>
                <p className="text-gray-700 text-sm">Help us build the future of online therapy.</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-900" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* New slideshow section */}
          
{/*           <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Product Interfaces
            </h3>
            <div className="flex justify-center space-x-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedProduct(tab.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedProduct === tab.id ? "bg-gray-200" : "bg-gray-100"
                  } hover:bg-gray-300 transition-colors`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <Slideshow images={slideshowImages[selectedProduct]} />
          </div> */}

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              All Cradla products work seamlessly together to create a unified
              platform for mental healthcare providers and patients.
              <br />
              Watch a demo video of our past therapist intelligence offering:{" "}
              <a
                href="https://www.youtube.com/watch?v=-aFMDuSvPDc&feature=youtu.be"
                className="text-blue-600"
              >
                Sigmund
              </a>
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