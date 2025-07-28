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
  return;
};
export default ReviewsCarousel;