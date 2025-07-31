import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

// Professional-specific testimonials from the copy deck
const reviews = [{
  id: 1,
  author: "Sarah, 26, Medical Resident",
  rating: 5,
  text: "It paid for my blood tests after burnout. It covered my therapy. It got me home when my car broke down. It's not what's in my wallet that matters - it's what it makes possible.",
  date: "March 2025"
}, {
  id: 2,
  author: "Michael, 28, Legal Articles",
  rating: 5,
  text: "Things I didn't know I'd need at 25: Card for first root canal, Lounge access during cancelled flight, Mental health support in week 2 of articles. They don't teach you this in uni.",
  date: "April 2025"
}, {
  id: 3,
  author: "Emily, 27, Architect",
  rating: 5,
  text: "My first year taught me you can't push through burnout forever, debt doesn't wait for payday, and mental health matters even when deadlines don't. This solution gave me real support.",
  date: "April 2025"
}, {
  id: 4,
  author: "Robert, 29, Finance Professional",
  rating: 5,
  text: "Starting a business, finishing an exam, getting that diagnosis - we've been there. This is cover when you're tired, support when it's late, and tools that flex when you can't.",
  date: "February 2025"
}, {
  id: 5,
  author: "Jennifer, 25, Engineering Graduate",
  rating: 5,
  text: "It's not about luxury. It's about being able to cover what you need - when you need it. One solution that includes medical cover, credit support, and built-in lifestyle rewards.",
  date: "March 2025"
}];
const ReviewsCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll effect
  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(intervalId);
  }, [api]);
  return (
    <div className="py-16 md:py-20 lg:py-24 bg-medical-background">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          "I did this with support."
        </h2>
        
        <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-6 bg-white rounded-lg shadow-medical-card h-full flex flex-col">
                  <Quote className="w-8 h-8 text-secondary mb-4" />
                  <p className="text-medical-text flex-grow mb-4">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-primary">{review.author}</p>
                      <p className="text-sm text-medical-text/70">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
export default ReviewsCarousel;