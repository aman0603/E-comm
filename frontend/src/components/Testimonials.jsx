import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      avatar: "👩‍💼",
      rating: 5,
      content: "LuxeShop has completely transformed my shopping experience. The quality of products is exceptional, and the customer service is outstanding. I've been a loyal customer for over two years now.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Enthusiast",
      avatar: "👨‍💻",
      rating: 5,
      content: "As someone who's very particular about electronics, I'm impressed by LuxeShop's curated selection. Every product I've purchased has exceeded my expectations. The fast shipping is a bonus!",
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Interior Designer",
      avatar: "👩‍🎨",
      rating: 5,
      content: "The home decor section is absolutely amazing. I've furnished three client projects with items from LuxeShop. The attention to detail and quality craftsmanship is unmatched.",
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Fitness Coach",
      avatar: "💪",
      rating: 5,
      content: "LuxeShop's sports equipment section is fantastic. The gear is professional-grade, and I love how they feature products from both established and emerging brands. Highly recommended!",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4">
            💬 Customer Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied customers
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 max-w-4xl mx-auto">
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors z-10"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Testimonial Content */}
              <div className="text-center px-8">
                <div className="text-6xl mb-6">{testimonials[currentSlide].avatar}</div>
                
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  "{testimonials[currentSlide].content}"
                </blockquote>

                <div>
                  <div className="text-xl font-semibold text-white">{testimonials[currentSlide].name}</div>
                  <div className="text-green-300">{testimonials[currentSlide].role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-green-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/70">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
            <div className="text-white/70">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">99%</div>
            <div className="text-white/70">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/70">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;