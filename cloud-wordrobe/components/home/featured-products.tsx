"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Star, Calendar, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';

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
  };

  const ProductCard = ({ product }: { product: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 text-white hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(product.id);
            }}
          >
            <Heart 
              className={`h-4 w-4 ${
                likedProducts.has(product.id) 
                  ? 'fill-red-500 text-red-500' 
                  : ''
              }`} 
            />
          </Button>

          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 'rent');
                }}
              >
                <Calendar className="h-3 w-3 mr-1" />
                Rent ₹{product.rentPrice}
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 'buy');
                }}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Buy
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {product.location}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground mb-2">by {product.vendor}</p>

          <div className="flex items-center space-x-1 mb-3">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-orange-500">₹{product.rentPrice}</span>
                <span className="text-xs text-muted-foreground">/3 days</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Buy: ₹{product.buyPrice}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends and most-loved pieces from our vendors.
          </p>
        </motion.div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="topRented">Top Rented</TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="latest">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.latest.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topRented">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.topRented.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline">
            View All Products
          </Button>        </motion.div>
      </div>
    </section>
  );
}
