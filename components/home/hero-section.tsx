"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Play, Star, Users, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 via-orange-100 to-orange-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden -mx-8 sm:-mx-12 lg:-mx-16 px-8 sm:px-12 lg:px-16 mb-16 rounded-2xl">
      <div className="w-full py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 w-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-fit"
            >
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">
                <Star className="w-3 h-3 mr-1" />
                Trusted by 10,000+ customers
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words"
              >
                <span className="font-wasted-vindey font-bold tracking-widest bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Buy it.
                </span>
                <br />
                <span className="font-wasted-vindey font-bold tracking-widest bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Rent it.
                </span>
                <br />
                <span className="font-wasted-vindey font-bold tracking-widest bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Wear it.
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg break-words"
              >
                A Smart Wardrobe Powered by the Community. Discover, rent, and buy fashion from verified vendors across India.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white group w-full">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="group w-full sm:w-auto"
                onClick={() => window.open('https://youtu.be/B5F61l-SKwI?si=jtvpebrA8MSEhdn9', '_blank')}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 w-full"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <Users className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold whitespace-nowrap">5000+</div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">Happy Customers</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 min-w-0">
                <ShoppingBag className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold whitespace-nowrap">1000+</div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">Products</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1.0] // Custom ease-in-out curve
            }}
            className="relative w-full"
          >
            <div className="relative h-99 lg:h-[500px] rounded-2xl overflow-hidden w-full">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fashion Collection"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-[calc(100%-2rem)] cursor-pointer hover:bg-white/95 transition-all duration-300 hover:scale-105"
                onClick={() => router.push('/rent')}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-sm font-medium whitespace-nowrap">Available for Rent</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-orange-500">₹199</div>
                  <div className="text-xs lg:text-sm text-muted-foreground whitespace-nowrap">Rent for 3 days</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}