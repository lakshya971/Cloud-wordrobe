"use client";

import { motion } from 'framer-motion';
import { Search, Calendar, CreditCard, Package, ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import BookCard from './BookCard';
import AnimatedButton from '@/components/ui/animated-button';

export function HowItWorks() {
  const router = useRouter();

  const steps = [
    {
      icon: Search,
      title: 'Browse & Discover',
      description: 'Explore our curated collection of fashion items from verified vendors.',
      step: '01',
    },
    {
      icon: Calendar,
      title: 'Choose Your Option',
      description: 'Decide whether to buy the item or rent it for your needs.',
      step: '02',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Complete your order with our secure payment system.',
      step: '03',
    },
    {
      icon: Package,
      title: 'Enjoy & Return',
      description: 'Receive your items quickly and return rentals on time.',
      step: '04',
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      text: 'Quality Assured',
      description: 'All items are verified and quality checked',
    },
    {
      icon: Clock,
      text: 'Quick Delivery',
      description: 'Same day delivery in major cities',
    },
    {
      icon: Shield,
      text: 'Secure & Safe',
      description: '100% secure payments and data protection',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with Cloud Wardrobe in just four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center relative"
            >
              <div style={{ height: "320px" }}>
                <BookCard 
                  coverBgColor="#fb923c" 
                  contentBgColor="white"
                  coverContent={
                    <>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                        <step.icon className="h-10 w-8 text-orange-500" />
                      </div>
                      <p className="font-bold text-white">Step {step.step}</p>
                      <p className="text-white mt-2 text-sm">Hover to see details</p>
                    </>
                  }
                >
                  {/* Step Number */}
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-6">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-orange-500" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </BookCard>
              </div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="shadow-md h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="p-3 bg-gray-100 rounded-full mb-4 mt-2">
                    <benefit.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{benefit.text}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-10 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-8">
                  Join thousands of users who trust Cloud Wardrobe for their fashion needs
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">                <AnimatedButton
                  color="#f97316"
                  onClick={() => router.push('/shop')}
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </AnimatedButton>
                
                <AnimatedButton
                  color="#f97316"
                  onClick={() => router.push('/rent')}
                >
                  Explore Rentals
                </AnimatedButton>
              </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}