import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Patients Say</h2>
        
        <div className="flex flex-row overflow-x-auto gap-4 pb-4">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex-1 min-w-64"
            >
              <div className="flex items-center mb-3">

                <div>
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="rgb(194, 146, 0)" color="rgb(214, 161, 0)" />
                    ))}
                  </div>
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

export default TestimonialSection;