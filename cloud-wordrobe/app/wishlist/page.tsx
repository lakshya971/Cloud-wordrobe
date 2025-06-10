"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingCart, X, Star, Truck, Shield, RotateCcw, Share2, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

export default function WishlistPage() {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { toast } = useToast();
  const router = useRouter();
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      buyPrice: item.price,
      rentPrice: Math.round(item.price * 0.1),
      vendor: item.vendor,
      rating: item.rating || 4.5,
      reviews: item.reviews || 25,
      location: item.location || 'Mumbai',
      availableForBuy: true,
      availableForRent: true
    }, 'buy');

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  const handleRemoveFromWishlist = (itemId: number) => {
    const itemToRemove = wishlistItems.find(item => item.id === itemId);
    removeFromWishlist(itemId);
    
    if (itemToRemove) {
      toast({
        title: "Removed from wishlist",
        description: `${itemToRemove.name} has been removed from your wishlist.`,
      });
    }
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };
  const handleBuyNow = (item: any) => {
    // Add to cart first
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      buyPrice: item.price,
      rentPrice: Math.round(item.price * 0.1),
      vendor: item.vendor,
      rating: item.rating || 4.5,
      reviews: item.reviews || 25,
      location: item.location || 'Mumbai',
      availableForBuy: true,
      availableForRent: true
    }, 'buy');

    // Remove from wishlist
    removeFromWishlist(item.id);

    toast({
      title: "Item moved to cart",
      description: `${item.name} has been moved to cart.`,
    });

    // Redirect to cart page
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };

  const handleMoveAllToCart = () => {
    let itemsAdded = 0;
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        buyPrice: item.price,
        rentPrice: Math.round(item.price * 0.1),
        vendor: item.vendor,
        rating: item.rating || 4.5,
        reviews: item.reviews || 25,
        location: item.location || 'Mumbai',
        availableForBuy: true,
        availableForRent: true
      }, 'buy');
      itemsAdded++;
    });
    
    clearWishlist();
    
    toast({
      title: "All items moved to cart",
      description: `${itemsAdded} ${itemsAdded === 1 ? 'item' : 'items'} moved to cart successfully.`,
    });

    // Redirect to cart page after a brief delay
    setTimeout(() => {
      router.push('/cart');
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">My Wishlist</span>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-orange-500" />                <h1 className="text-2xl font-bold">
                  My Wishlist
                </h1>
              </div>
              {wishlistItems.length > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                </Badge>
              )}
            </div>
            {wishlistItems.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleClearWishlist}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </motion.div>

        {/* Content */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg p-16 text-center shadow-sm"
          >
            <div className="max-w-md mx-auto">
              <Heart className="h-20 w-20 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You have no items in your wishlist. Start adding items that you like to your wishlist. 
                It will appear here so you can easily find them later.
              </p>
              <Link href="/shop">
                <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200 border-0 rounded-lg overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="relative md:w-64 h-64 md:h-48 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-sm"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {/* Discount Badge */}
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                              50% OFF
                            </Badge>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 p-4 md:p-6">
                          <div className="flex flex-col h-full">
                            {/* Product Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">                                <h3 className="font-semibold text-lg text-gray-900 leading-tight pr-4">
                                  {item.name}
                                </h3>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-3">by {item.vendor}</p>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                                  <Star className="h-3 w-3 fill-current" />
                                  <span>{item.rating || 4.5}</span>
                                </div>
                                <span className="text-xs text-gray-500">({item.reviews || 25} reviews)</span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                                <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                                <span className="text-green-600 font-medium">50% off</span>
                              </div>

                              {/* Features */}
                              <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                  <Truck className="h-3 w-3" />
                                  <span>Free Delivery</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Shield className="h-3 w-3" />
                                  <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <RotateCcw className="h-3 w-3" />
                                  <span>Easy Returns</span>
                                </div>
                              </div>
                            </div>                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                              <Button 
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5"
                                onClick={() => handleAddToCart(item)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-2.5"
                                onClick={() => handleBuyNow(item)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Buy Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>            {/* Summary Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-sm border-0 mt-6"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">                  <h3 className="font-semibold text-lg mb-2">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} in Wishlist
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      Total Value: <span className="font-medium text-gray-900">₹{wishlistItems.reduce((sum, item) => sum + item.originalPrice, 0).toLocaleString()}</span>
                    </p>
                    <p>
                      Discounted Price: <span className="font-medium text-gray-900">₹{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                    </p>
                    <p className="text-green-600 font-medium">
                      You Save: ₹{wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <Button 
                    variant="outline" 
                    onClick={handleClearWishlist}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Wishlist
                  </Button>
                  <Button 
                    onClick={handleMoveAllToCart}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Move All to Cart
                  </Button>
                  <Link href="/shop">
                    <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 w-full sm:w-auto">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
