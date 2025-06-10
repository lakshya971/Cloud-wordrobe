"use client";

import { motion } from 'framer-motion';
import { Search, Calendar, CreditCard, Package, ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

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
      <div className="container mx-auto px-4">
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
              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-6">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-7 w-7 text-orange-500" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{benefit.text}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-8">
              Join thousands of users who trust Cloud Wardrobe for their fashion needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                onClick={() => router.push('/shop')}
              >
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8"
                onClick={() => router.push('/rent')}
              >
                Explore Rentals
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}