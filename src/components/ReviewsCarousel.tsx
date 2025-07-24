
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

// This would typically come from your Google My Business API
const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    text: "Exceptional medical aid service! The coverage is comprehensive and their customer support team is always helpful.",
    date: "March 2025"
  },
  {
    id: 2,
    author: "Michael Thompson",
    rating: 5,
    text: "I've been with them for two years now and couldn't be happier. The claims process is smooth and efficient.",
    date: "April 2025"
  },
  {
    id: 3,
    author: "Emily Davis",
    rating: 4,
    text: "Great value for money. The benefits are excellent and they really understand healthcare professionals' needs.",
    date: "April 2025"
  },
  {
    id: 4,
    author: "Robert Wilson",
    rating: 5,
    text: "The customer service is outstanding. They helped me navigate through the complex medical aid system with ease.",
    date: "February 2025"
  },
  {
    id: 5,
    author: "Jennifer Lee",
    rating: 5,
    text: "I've recommended this medical aid to all my colleagues. Their preventative care benefits are unmatched in the industry.",
    date: "March 2025"
  }
];

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
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          What Our Members Say
        </h2>
        
        <Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mx-auto"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 px-3">
                <div className="h-full p-6 bg-background rounded-lg shadow-medical-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <Quote className="text-accent/30 w-8 h-8 mb-2" />
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent stroke-accent mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-medical-text mb-4 italic">"{review.text}"</p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="font-semibold text-primary">{review.author}</p>
                    <p className="text-sm text-medical-text/70">{review.date}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center mt-10 gap-2">
            <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${
                    current === i ? "w-8 bg-accent" : "w-2.5 bg-gray-300"
                  }`}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <CarouselNext className="relative static translate-y-0 right-0 ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
