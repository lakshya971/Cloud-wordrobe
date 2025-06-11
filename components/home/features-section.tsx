"use client";

import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Calendar, 
  Shield, 
  Truck, 
  Users, 
  CreditCard,
  Star,
  Smartphone
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function FeaturesSection() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Buy or Rent',
      description: 'Choose to purchase or rent any item based on your needs and budget.',
      color: 'text-orange-500',
    },
    {
      icon: Calendar,
      title: 'Flexible Rental',
      description: 'Rent for days, weeks, or months with transparent pricing.',
      color: 'text-blue-500',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All payments are secured with industry-standard encryption.',
      color: 'text-green-500',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick delivery and pickup services across major cities.',
      color: 'text-purple-500',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Shop from local vendors and support small businesses.',
      color: 'text-pink-500',
    },
    {
      icon: CreditCard,
      title: 'Easy Payments',
      description: 'Multiple payment options including UPI, cards, and wallets.',
      color: 'text-indigo-500',
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'All products are verified and quality checked before listing.',
      color: 'text-yellow-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Seamless experience across all devices and platforms.',
      color: 'text-teal-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 rounded-2xl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Cloud Wardrobe?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of fashion with our innovative platform designed for modern shoppers and entrepreneurs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color} bg-current/10`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}