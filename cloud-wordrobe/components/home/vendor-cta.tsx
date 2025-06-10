"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, IndianRupee, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function VendorCTA() {
  const benefits = [
    'Reach 10,000+ customers across India',
    'No monthly fees - just ₹199 one-time registration',
    'Manage inventory with our powerful dashboard',
    'Secure payment processing and instant payouts',
    'Marketing support and featured listings',
    'Mobile-friendly vendor app',
  ];

  const vendorStats = [
    { icon: IndianRupee, value: '₹50K+', label: 'Average Monthly Earnings' },
    { icon: TrendingUp, value: '300%', label: 'Sales Growth' },
    { icon: Users, value: '1000+', label: 'Active Vendors' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 mb-4">
                <TrendingUp className="w-3 h-3 mr-1" />
                Growing Business Opportunity
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Become a <span className="text-orange-500">Vendor</span>
                <br />
                Start Your Fashion Business
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Join our community of successful vendors and turn your fashion passion into profit. 
                Low entry barrier, high earning potential.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Pricing Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Registration Fee</h3>
                  <p className="text-muted-foreground text-sm">One-time payment, lifetime access</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-500">₹199</div>
                  <div className="text-sm text-muted-foreground">only</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white group">
                Start Selling Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats and Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Vendor Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {vendorStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                >
                  <Card>
                    <CardContent className="p-4 text-center">
                      <stat.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Image */}
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Successful Vendor"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Success Story</div>
                    <div className="text-sm text-muted-foreground">
                      "Increased my income by 400% in 6 months!"
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}