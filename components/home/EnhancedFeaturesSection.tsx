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
import styled from 'styled-components';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, description, color }: FeatureCardProps) => {
  return (
    <StyledWrapper className="h-full">
      <div className="card">
        <div className="icon-wrapper">
          <Icon className={`feature-icon ${color}`} />
        </div>
        <p className="card-title">{title}</p>
        <p className="small-desc">{description}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export function EnhancedFeaturesSection() {  const features = [
    {
      icon: ShoppingBag,
      title: 'Buy or Rent Options',
      description: 'Experience ultimate flexibility with our dual marketplace. Purchase items you love forever, or rent premium pieces for special occasions. Perfect for budget-conscious fashionistas and sustainable shopping.',
      color: 'text-orange-500',
    },
    {
      icon: Calendar,
      title: 'Flexible Rental Periods',
      description: 'From a single day event to month-long adventures, choose rental periods that fit your lifestyle. Transparent pricing with no hidden fees, and the freedom to extend your rental if needed.',
      color: 'text-orange-600',
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Your data and transactions are protected with military-grade encryption. We partner with leading payment gateways to ensure every purchase is secure and your privacy is maintained.',
      color: 'text-orange-500',
    },
    {
      icon: Truck,
      title: 'Lightning Fast Delivery',
      description: 'Same-day delivery in major cities, next-day everywhere else. Professional packaging, real-time tracking, and hassle-free returns. We bring the boutique experience to your doorstep.',
      color: 'text-orange-600',
    },
    {
      icon: Users,
      title: 'Empowering Local Vendors',
      description: 'Join a thriving community of local designers and boutique owners. Every purchase supports small businesses and promotes sustainable fashion while discovering unique, exclusive pieces.',
      color: 'text-orange-500',
    },
    {
      icon: CreditCard,
      title: 'Seamless Payments',
      description: 'Pay your way with UPI, credit/debit cards, digital wallets, or even EMI options. One-click payments, saved preferences, and instant refunds make shopping effortless.',
      color: 'text-orange-600',
    },
    {
      icon: Star,
      title: 'Premium Quality Promise',
      description: 'Every item undergoes rigorous quality checks and authentication. Our AI-powered verification system and expert reviewers ensure you receive only the finest, authentic products.',
      color: 'text-orange-500',
    },
    {
      icon: Smartphone,
      title: 'Omnichannel Experience',
      description: 'Start shopping on mobile, continue on desktop, or browse on tablet. Your cart, wishlist, and preferences sync seamlessly across all devices for uninterrupted shopping.',
      color: 'text-orange-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };  return (    <section className="py-24 bg-white">
      <div className="w-full px-5 md:px-8 lg:px-16"><motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-5"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Choose Cloud Wardrobe?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Revolutionizing fashion commerce with cutting-edge technology, sustainable practices, and unparalleled user experience. Join thousands of satisfied customers in the future of shopping.
          </motion.p>
        </motion.div>        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 px-5"
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white px-6 py-3 rounded-full shadow-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>Trusted by 50,000+ customers</span>
            <span className="text-gray-300">•</span>
            <span>99.9% uptime</span>
            <span className="text-gray-300">•</span>
            <span>24/7 support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  .card-title {
    color: #262626;
    font-size: 1.25em;
    line-height: 1.3;
    font-weight: 700;
    margin-bottom: 0.75em;
    margin-top: 0.5em;
  }

  .small-desc {
    font-size: 0.9em;
    font-weight: 400;
    line-height: 1.6em;
    color: #4a5568;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  }

  .feature-icon {
    width: 2.5em;
    height: 2.5em;
    transition: all 0.3s ease;
  }
  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2em;
    height: 2em;
    overflow: hidden;
    top: 0;
    right: 0;
    background: linear-gradient(135deg, #f97316, #ea580c);
    border-radius: 0 12px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans-serif;
    font-size: 1.2em;
    font-weight: bold;
  }
  .card {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 2em 1.5em;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(145deg, #ffffff, #f7fafc);
    font-family: 'Inter', 'Arial', sans-serif;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .card:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: linear-gradient(135deg, #f97316, #ea580c);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .card:hover:before {
    transform: scale(32);
  }

  .card:hover .small-desc {
    transition: all 0.6s ease-out;
    color: rgba(255, 255, 255, 0.9);
  }

  .card:hover .card-title {
    transition: all 0.6s ease-out;
    color: #ffffff;
  }

  .card:hover .feature-icon {
    color: #ffffff !important;
    transform: scale(1.1);
  }

  .text-orange-500 { color: #f97316; }
  .text-blue-500 { color: #3b82f6; }
  .text-green-500 { color: #10b981; }
  .text-purple-500 { color: #8b5cf6; }
  .text-pink-500 { color: #ec4899; }
  .text-indigo-500 { color: #6366f1; }
  .text-yellow-500 { color: #eab308; }
  .text-teal-500 { color: #14b8a6; }
`;

export default EnhancedFeaturesSection;
