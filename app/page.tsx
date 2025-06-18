"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { EnhancedFeaturesSection } from '@/components/home/EnhancedFeaturesSection';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HowItWorks } from '@/components/home/how-it-works';
import { VendorCTA } from '@/components/home/vendor-cta';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { StatsSection } from '@/components/home/stats-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-[1500px] mt-6 mx-auto">
        <div className="px-8 sm:px-12 lg:px-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <HeroSection />
          <EnhancedFeaturesSection />
          <FeaturedProducts />
          <HowItWorks />
          <TestimonialsSection />
        </div>
        
        {/* Full-width sections that break out of container */}
        <StatsSection />
        <VendorCTA />
      </main>
      
      <Footer />
    </div>
  );
}