"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, MapPin } from 'lucide-react';

export function StatsSection() {
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
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-16">
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
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-4 group-hover:bg-white/30 transition-colors duration-300"
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
                  {stat.value}
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