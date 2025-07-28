import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

// This would typically come from your Google My Business API
const reviews = [{
  id: 1,
  author: "Sarah Johnson",
  rating: 5,
  text: "Exceptional medical aid service! The coverage is comprehensive and their customer support team is always helpful.",
  date: "March 2025"
}, {
  id: 2,
  author: "Michael Thompson",
  rating: 5,
  text: "I've been with them for two years now and couldn't be happier. The claims process is smooth and efficient.",
  date: "April 2025"
}, {
  id: 3,
  author: "Emily Davis",
  rating: 4,
  text: "Great value for money. The benefits are excellent and they really understand healthcare professionals' needs.",
  date: "April 2025"
}, {
  id: 4,
  author: "Robert Wilson",
  rating: 5,
  text: "The customer service is outstanding. They helped me navigate through the complex medical aid system with ease.",
  date: "February 2025"
}, {
  id: 5,
  author: "Jennifer Lee",
  rating: 5,
  text: "I've recommended this medical aid to all my colleagues. Their preventative care benefits are unmatched in the industry.",
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
          What Our Members Say
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