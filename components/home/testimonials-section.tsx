"use client";

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedButton from '@/components/ui/animated-button';

export function TestimonialsSection() {
  // Original testimonials plus duplicated entries to ensure continuous flow
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Fashion Enthusiast',
      location: 'Mumbai',
      avatar: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'Cloud Wardrobe changed how I think about fashion. I can try expensive designer pieces without breaking the bank. The rental service is fantastic!',
      gradient: 'linear-gradient(to right, #ff7e5f, #feb47b)'
    },
    {
      name: 'Rahul Mehta',
      role: 'Vendor',
      location: 'Delhi',
      avatar: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'As a small business owner, Cloud Wardrobe gave me access to customers I never could have reached. My sales increased by 300% in just 4 months!',
      gradient: 'linear-gradient(to right, #6a11cb, #2575fc)'
    },
    {
      name: 'Anita Desai',
      role: 'Working Professional',
      location: 'Bangalore',
      avatar: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'Perfect for someone like me who attends many events. I can always have something new to wear without cluttering my wardrobe. Highly recommend!',
      gradient: 'linear-gradient(to right, #00c6ff, #0072ff)'
    },
    {
      name: 'Vikram Singh',
      role: 'Student',
      location: 'Pune',
      avatar: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'Budget-friendly and stylish! Cloud Wardrobe helps me stay trendy without spending too much. The quality of products is amazing.',
      gradient: 'linear-gradient(to right, #ff512f, #dd2476)'
    },
    {
      name: 'Meera Kapoor',
      role: 'Event Planner',
      location: 'Chennai',
      avatar: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'The variety of formal wear available is outstanding. My clients are always impressed with the selections I can offer through Cloud Wardrobe.',
      gradient: 'linear-gradient(to right, #ffb6c1, #ff69b4)'
    },
    {
      name: 'Arjun Reddy',
      role: 'Photographer',
      location: 'Hyderabad',
      avatar: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'As a fashion photographer, I love recommending Cloud Wardrobe to my clients. The pieces are trendy and look amazing in photoshoots.',
      gradient: 'linear-gradient(to right, #ff9a8b, #ffc3a0)'
    },
    {
      name: 'Nisha Patel',
      role: 'Influencer',
      location: 'Ahmedabad',
      avatar: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'Cloud Wardrobe helps me create fresh content without buying new clothes every week. Sustainable and stylish - perfect combination!',
      gradient: 'linear-gradient(to right, #a1c4fd, #c2e9fb)'
    },
    {
      name: 'Karan Malhotra',
      role: 'Business Executive',
      location: 'Kolkata',
      avatar: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'The premium suit rental service is exceptional. I always look my best for important meetings without investing in suits I rarely wear.',
      gradient: 'linear-gradient(to right, #fbc2eb, #a18cd1)'
    },
    {
      name: 'Divya Krishnan',
      role: 'College Student',
      location: 'Jaipur',
      avatar: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'As a student with a tight budget, Cloud Wardrobe lets me experiment with fashion without the commitment. Love the service!',
      gradient: 'linear-gradient(to right, #84fab0, #8fd3f4)'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers and vendors have to say about their Cloud Wardrobe experience.
          </p>
        </motion.div>

        <TestimonialSlider>
          <div className="slider" style={{"--width": "300px", "--height": "350px", "--quantity": testimonials.length} as React.CSSProperties}>
            <div className="list">
              {testimonials.map((testimonial, index) => (
                <div className="item" key={index} style={{"--position": index + 1} as React.CSSProperties}>
                  <div className="card" style={{background: testimonial.gradient}}>
                    {/* Quote Icon */}
                    <Quote className="h-6 w-6 text-white mb-3" />
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-white text-white" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-white mb-4 text-sm leading-tight">
                      "{testimonial.text.substring(0, 120)}{testimonial.text.length > 120 ? '...' : ''}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center space-x-2 justify-center mt-auto">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="text-xs">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="text-left">
                        <div className="font-semibold text-sm text-white">{testimonial.name}</div>
                        <div className="text-xs text-white/50">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TestimonialSlider>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-sm">10,000+ Reviews</div>
            <div className="text-sm">99% Satisfaction</div>
            <div className="text-sm">Trusted Platform</div>
          </div>
        </motion.div>
        
        {/* Call to Action with Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <AnimatedButton color="#f97316">
            See All Reviews
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}

const TestimonialSlider = styled.div`
  .card {
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
    margin: 0 auto;
  }
  
  .slider .list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
  }
  
  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 30s linear infinite;
    transition: filter 0.5s;
    padding: 10px;
    animation-delay: calc((30s / var(--quantity)) * (var(--position) - 1) - 30s) !important;
  }
  
  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }
  
  .slider:hover .item {
    animation-play-state: paused !important;
    filter: brightness(0.9);
  }
  
  .slider .item:hover {
    filter: brightness(1.05) !important;
    transform: translateY(-5px);
  }
`;