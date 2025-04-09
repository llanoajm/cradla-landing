import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import comparisonImage from './images/comparison.png';
import TestimonialSection from "./ui/testimonials";
import stanfordNLPLogo from "@/components/images/stanfordNLP.jpg"
import stanfordHAI from "@/components/images/hai.png"
import theBridge from "@/components/images/theBridge.png"
import harvardMedLogo from "@/components/images/harvardMed.png"

const partnerLogos = [
  { id: 1, name: "Stanford NLP Group", src: harvardMedLogo.src },
  { id: 2, name: "Stanford HCI", src: stanfordHAI.src },
  { id: 3, name: "H", src: stanfordNLPLogo.src },
  { id: 4, name: "The Bridge", src: theBridge.src }
];

const TrustedPartners = () => {
  return (
    <section className="mb-16 w-full">
      <div className="max-w-8xl mx-auto bg-white pb-4 ">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Logo Carousel */}
            <div className="p-8 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-sm font-medium tracking-widest text-gray-500 mb-2 text-center">
                  BACKED BY FIELD EXPERTS
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 leading-tight text-center">
                  Our Partners in Mental Wellness
                </h2>
              </div>
              
              {/* Logo Carousel Component */}
              <LogoCarousel logos={partnerLogos} columns={2} />
            </div>
            
            {/* Right side - Image */}
            <div className="relative h-full min-h-[300px] md:min-h-[400px]">
              <div className="absolute inset-0">
                <Image 
                  src={comparisonImage.src} 
                  alt="Mental health professionals collaborating"
                  fill
                  className="object-cover rounded-r-lg"
                />
              </div>
              

            </div>
          </div>
       
      </div>
      <TestimonialSection/>
    </section>
  );
};

export default TrustedPartners;
