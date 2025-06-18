"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, MapPin } from 'lucide-react';

// Custom hook for fast visible count+1 effect
const useCountAnimation = (targetValue: string, speed: number = 50) => {
  const [count, setCount] = useState(0);
  const [activeCount, setActiveCount] = useState(false);
  const [suffix, setSuffix] = useState('');
  const countRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Extract number and suffix (like '+' or 'k')
    let numericValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));
    const suffixMatch = targetValue.match(/[^0-9.].*/);
    const extractedSuffix = suffixMatch ? suffixMatch[0] : '';
    setSuffix(extractedSuffix);
    
    // Don't animate if animation is not active
    if (!activeCount) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Determine step size based on target value
    let step = 1;
    
    // For large numbers, use larger steps to make animation faster
    if (numericValue > 10000) {
      step = 500;
    } else if (numericValue > 1000) {
      step = 100;
    } else if (numericValue > 100) {
      step = 5;
    }
    
    // For decimal numbers
    const isDecimal = targetValue.includes('.');
    
    // Set the interval for incrementing the count
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        // For decimal numbers
        if (isDecimal) {
          const nextCount = parseFloat((prevCount + 0.1).toFixed(1));
          if (nextCount >= numericValue) {
            clearInterval(intervalRef.current!);
            return numericValue;
          }
          return nextCount;
        } 
        // For whole numbers
        else {
          const nextCount = prevCount + step;
          if (nextCount >= numericValue) {
            clearInterval(intervalRef.current!);
            return numericValue;
          }
          return nextCount;
        }
      });
    }, speed);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [targetValue, speed, activeCount]);
  
  // Activate counting
  const startCounting = () => setActiveCount(true);
  
  return { count, suffix, startCounting };
};

// Counting Number Component with visible +1 effect
interface CountingNumberProps {
  value: string;
  delay?: number;
}

function CountingNumber({ value, delay = 0 }: CountingNumberProps) {
  const [isInView, setIsInView] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const incrementTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delay * 500); // Reduced delay time to make it faster
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      if (incrementTimerRef.current) {
        clearTimeout(incrementTimerRef.current);
      }
    };
  }, [delay]);
  
  const { count, suffix, startCounting } = useCountAnimation(isInView ? value : '0', 30); // Faster speed
  
  // Start counting when in view
  useEffect(() => {
    if (isInView) {
      startCounting();
      
      // Show +1 effect periodically
      const showIncrementEffect = () => {
        setShowIncrement(true);
        incrementTimerRef.current = setTimeout(() => {
          setShowIncrement(false);
          incrementTimerRef.current = setTimeout(showIncrementEffect, 
            Math.random() * 300 + 100); // Random timing for more natural feel
        }, 300);
      };
      
      incrementTimerRef.current = setTimeout(showIncrementEffect, 200);
    }
    
    return () => {
      if (incrementTimerRef.current) {
        clearTimeout(incrementTimerRef.current);
      }
    };
  }, [isInView, startCounting]);
  
  // Format numbers with commas
  const formattedCount = count >= 1000 ? 
    Math.floor(count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
    count.toString();
  
  return (
    <div ref={ref} className="relative inline-block">
      <span className="relative z-10">{formattedCount}{suffix}</span>
      {showIncrement && (
        <span 
          className="absolute -top-4 right-0 text-green-500 text-sm font-bold z-20 animate-fadeUp"
          style={{
            animation: 'fadeUp 0.5s ease-out forwards',
          }}
        >
          +1
        </span>
      )}
    </div>
  );
}

// CSS for animations
const fadeUpAnimation = `
  @keyframes fadeUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-15px);
    }
  }
`;

export function StatsSection() {
  // Add global style for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fadeUpAnimation;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Happy Customers',
      description: 'Satisfied users across India',
    },
    {
      icon: ShoppingBag,
      value: '50,000+',
      label: 'Products',
      description: 'Curated fashion items',
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Average Rating',
      description: 'Based on customer reviews',
    },
    {
      icon: MapPin,
      value: '25+',
      label: 'Cities',
      description: 'Serving customers nationwide',
    },
  ];

  return (
    <section className="py-20 text-black bg-gray-50 rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-16">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            See how Cloud Wardrobe is transforming the fashion industry across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-black mb-4 group-hover:bg-white/30 transition-colors duration-300"
                >
                  <IconComponent className="h-8 w-8" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  <CountingNumber value={stat.value} delay={index * 0.1} />
                </motion.div>

                <h3 className="text-xl font-semibold mb-2">
                  {stat.label}
                </h3>

                <p className="opacity-80 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}