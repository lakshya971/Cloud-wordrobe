"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import ProductFlipCard from './ProductFlipCard';
import { ChevronRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .btn-group {
    display: inline-flex;
    border-radius: 0.5em;
    overflow: hidden;
  }
  .btn {
    font: inherit;
    background-color: #f0f0f0;
    border: 0;
    color: #242424;
    font-size: 1.15rem;
    padding: 0.375em 1em;
    text-shadow: 0 0.0625em 0 #fff;
    box-shadow: inset 0 0.0625em 0 0 #f4f4f4, 0 0.0625em 0 0 #efefef,
      0 0.125em 0 0 #ececec, 0 0.25em 0 0 #e0e0e0, 0 0.3125em 0 0 #dedede,
      0 0.375em 0 0 #dcdcdc, 0 0.425em 0 0 #cacaca, 0 0.425em 0.5em 0 #cecece;
    transition: 0.23s ease;
    cursor: pointer;
    font-weight: bold;
    margin: -1px;
  }
  .middle {
    border-radius: 0;
  }
  .right {
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }
  .left {
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
  }
  .btn:active {
    transform: translate(0, 0.225em);
    box-shadow: inset 0 0.03em 0 0 #f4f4f4, 0 0.03em 0 0 #efefef,
      0 0.0625em 0 0 #ececec, 0 0.125em 0 0 #e0e0e0, 0 0.125em 0 0 #dedede,
      0 0.2em 0 0 #dcdcdc, 0 0.225em 0 0 #cacaca, 0 0.225em 0.375em 0 #cecece;
    letter-spacing: 0.1em;
    color: skyblue;
  }
  .btn:focus {
    color: skyblue;
  }
`;

export function FeaturedProducts() {
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const { addToCart } = useCart();

  const toggleLike = (productId: number) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const products = {
    featured: [
      {
        id: 1,
        name: 'Designer Ethnic Wear',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 2999,
        rentPrice: 299,
        rating: 4.8,
        reviews: 124,
        vendor: 'Fashion Hub',
        location: 'Mumbai',
      },
      {
        id: 2,
        name: 'Premium Party Dress',
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 3999,
        rentPrice: 399,
        rating: 4.9,
        reviews: 87,
        vendor: 'Glamour Collection',
        location: 'Delhi',
      },
      {
        id: 3,
        name: 'Casual Summer Outfit',
        image: 'https://images.pexels.com/photos/5710017/pexels-photo-5710017.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 1899,
        rentPrice: 189,
        rating: 4.7,
        reviews: 203,
        vendor: 'Style Street',
        location: 'Bangalore',
      },
      {
        id: 4,
        name: 'Wedding Collection',
        image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 8999,
        rentPrice: 899,
        rating: 5.0,
        reviews: 45,
        vendor: 'Bridal Dreams',
        location: 'Pune',
      },
    ],
    latest: [
      {
        id: 5,
        name: 'Trendy Streetwear',
        image: 'https://images.pexels.com/photos/5710017/pexels-photo-5710017.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 2299,
        rentPrice: 229,
        rating: 4.6,
        reviews: 67,
        vendor: 'Urban Style',
        location: 'Chennai',
      },
      {
        id: 6,
        name: 'Vintage Collection',
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 1799,
        rentPrice: 179,
        rating: 4.5,
        reviews: 134,
        vendor: 'Retro Vibes',
        location: 'Delhi',
      },
    ],
    topRented: [
      {
        id: 7,
        name: 'Festival Special',
        image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 12999,
        rentPrice: 1299,
        rating: 4.9,
        reviews: 234,
        vendor: 'Traditional Elegance',
        location: 'Jaipur',
      },
      {
        id: 8,
        name: 'Party Dress',
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 5999,
        rentPrice: 599,
        rating: 4.7,
        reviews: 189,
        vendor: 'Night Out Fashion',
        location: 'Goa',
      },
    ],
  };  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96"></div>
      <div className="absolute top-20 left-10 w-64 h-64"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-gray-900 text-sm font-medium mb-3">
            Explore Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends and most-loved pieces from our vendors.
          </p>
        </motion.div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="flex rounded-xl p-1 max-w-xl mx-auto mb-10 bg-orange-50/80 border border-orange-100 shadow-sm">
            <TabsTrigger value="featured" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-orange-600 rounded-lg py-3 transition-all duration-300">
              <Sparkles size={16} className="mr-2" />
              <span>Featured</span>
            </TabsTrigger>
            <TabsTrigger value="latest" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-orange-600 rounded-lg py-3 transition-all duration-300">
              <Clock size={16} className="mr-2" />
              <span>Latest</span>
            </TabsTrigger>
            <TabsTrigger value="topRented" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-orange-600 rounded-lg py-3 transition-all duration-300">
              <TrendingUp size={16} className="mr-2" />
              <span>Top Rented</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.featured.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductFlipCard
                    product={product} 
                    likedProducts={likedProducts}
                    toggleLike={toggleLike}
                    addToCart={addToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="latest">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.latest.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductFlipCard
                    product={product} 
                    likedProducts={likedProducts}
                    toggleLike={toggleLike}
                    addToCart={addToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="topRented">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.topRented.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductFlipCard
                    product={product} 
                    likedProducts={likedProducts}
                    toggleLike={toggleLike}
                    addToCart={addToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
        </motion.div>
      </div>
    </section>
  );
}
