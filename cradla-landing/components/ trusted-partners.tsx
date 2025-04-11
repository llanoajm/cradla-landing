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
      <div className="max-w-7xl mx-auto bg-white pb-4 px-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left side - Logo Carousel */}
          <div className="p-4 md:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-sm font-medium tracking-widest text-gray-500 mb-2 text-center">
                BACKED BY FIELD EXPERTS
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 leading-tight text-center">
                Our Partners in Mental Wellness
              </h2>
            </div>
            
            {/* Logo Carousel Component */}
            <LogoCarousel logos={partnerLogos} columns={2} />
          </div>

          {/* Right side - Image with improved responsiveness */}
          <div className="relative rounded-lg overflow-hidden w-full h-auto aspect-4/3 md:aspect-4/3 flex items-center justify-center p-2 bg-gray-50">
            <Image
              src={comparisonImage.src}
              alt="Mental health professionals collaborating"
              className="object-contain w-full h-full rounded-lg"
              width={800}
              height={600}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
        </div>
      </div>
      <TestimonialSectionResponsive/>
    </section>
  );
};

// Updated testimonial section with improved responsiveness
const TestimonialSectionResponsive = () => {
  const testimonials = [
    {
      id: 1,
      name: "Janea Hayes",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "I have Kaiser, so therapy is covered, but it's usually 3 weeks between sessions. Once, my therapist canceled, and I waited another month. With Cradla, I was talking to someone in 25 minutes."
    },
    {
      id: 2,
      name: "David Bard",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "I was completely burnt out with a project deadline at work and couldn't wait two weeks to see my therapist. I was matched with a therapist in under 30 minutes through Cradla. I felt truly supported when I needed it."
    },
    {
      id: 3,
      name: "Luis Ramirez",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "I was honestly surprised I didn't have to re-explain everything. Even though I got a different therapist, they knew my background and what I was working through."
    }
  ];

  return (
    <section className="w-full relative py-10 backdrop-blur-md bg-white/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">From our Patient Interviews</h2>
        
        {/* Desktop view: flex row, Mobile view: flex column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-6 flex-1"
            >
              <div className="flex items-center mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;