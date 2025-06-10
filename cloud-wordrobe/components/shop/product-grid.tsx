"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heart, Star, Calendar, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRental } from '@/contexts/RentalContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  image: string;
  buyPrice?: number;
  rentPrice?: number;
  rating: number;
  reviews: number;
  vendor: string;
  location: string;
  category: string;
  availableForBuy: boolean;
  availableForRent: boolean;
}

interface FilterState {
  category: string;
  priceRange: [number, number];
  location: string;
  type: 'all' | 'buy' | 'rent';
  sort: string;
  categories: string[];
  locations: string[];
  brands: string[];
}

interface ProductGridProps {
  filters: FilterState;
  searchQuery: string;
}

export function ProductGrid({ filters, searchQuery }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { userProfile, calculateRental } = useRental();
  const { toast } = useToast();

  // Mock data for now - replace with API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Designer Ethnic Wear Set',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 2999,
        rentPrice: 299,
        rating: 4.8,
        reviews: 124,
        vendor: 'Fashion Hub',
        location: 'Mumbai',
        category: 'Ethnic Wear',
        availableForBuy: true,
        availableForRent: true,
      },
      {
        id: 2,
        name: 'Wedding Lehenga Collection',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 8999,
        rentPrice: 899,
        rating: 4.9,
        reviews: 89,
        vendor: 'Bridal Dreams',
        location: 'Delhi',
        category: 'Wedding Collection',
        availableForBuy: true,
        availableForRent: true,
      },
      {
        id: 3,
        name: 'Casual Western Outfit',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 1599,
        rentPrice: 159,
        rating: 4.6,
        reviews: 67,
        vendor: 'Urban Style',
        location: 'Bangalore',
        category: 'Western Wear',
        availableForBuy: true,
        availableForRent: true,
      },
      {
        id: 4,
        name: 'Party Wear Dress',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 3499,
        rentPrice: 349,
        rating: 4.7,
        reviews: 156,
        vendor: 'Night Out Fashion',
        location: 'Chennai',
        category: 'Party Wear',
        availableForBuy: true,
        availableForRent: true,
      },
      {
        id: 5,
        name: 'Formal Business Suit',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 4999,
        rentPrice: 499,
        rating: 4.8,
        reviews: 203,
        vendor: 'Corporate Wear',
        location: 'Hyderabad',
        category: 'Formal Wear',
        availableForBuy: true,
        availableForRent: true,
      },
      {
        id: 6,
        name: 'Designer Accessories Set',
        image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
        buyPrice: 899,
        rentPrice: 89,
        rating: 4.5,
        reviews: 45,
        vendor: 'Style Street',
        location: 'Pune',
        category: 'Accessories',
        availableForBuy: true,
        availableForRent: true,
      },
    ];

    // Filter products based on current filters
    let filteredProducts = mockProducts.filter((product) => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Type filter
      if (filters.type === 'buy' && !product.availableForBuy) return false;
      if (filters.type === 'rent' && !product.availableForRent) return false;

      // Category filter
      if (Array.isArray(filters.categories) && filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Location filter
      if (Array.isArray(filters.locations) && filters.locations.length > 0 && !filters.locations.includes(product.location)) {
        return false;
      }

      // Brand/Vendor filter
      if (Array.isArray(filters.brands) && filters.brands.length > 0 && !filters.brands.includes(product.vendor)) {
        return false;
      }

      // Price range filter
      const relevantPrice = filters.type === 'rent' ? product.rentPrice : 
                           filters.type === 'buy' ? product.buyPrice :
                           Math.min(product.buyPrice || Infinity, product.rentPrice || Infinity);
      
      if (relevantPrice && (relevantPrice < filters.priceRange[0] || relevantPrice > filters.priceRange[1])) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => {
          const priceA = filters.type === 'rent' ? (a.rentPrice || 0) : (a.buyPrice || 0);
          const priceB = filters.type === 'rent' ? (b.rentPrice || 0) : (b.buyPrice || 0);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => {
          const priceA = filters.type === 'rent' ? (a.rentPrice || 0) : (a.buyPrice || 0);
          const priceB = filters.type === 'rent' ? (b.rentPrice || 0) : (b.buyPrice || 0);
          return priceB - priceA;
        });
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        // Keep original order for latest
        break;
    }

    setProducts(filteredProducts);
    setLoading(false);
  }, [filters, searchQuery]);

  const toggleLike = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.buyPrice || product.rentPrice || 0,
        originalPrice: Math.round((product.buyPrice || product.rentPrice || 0) * 1.5),
        vendor: product.vendor,
        available: product.availableForBuy || product.availableForRent,
        category: product.category,
        location: product.location,
        rating: product.rating,
        reviews: product.reviews
      });
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleQuickRental = (product: Product) => {
    // Quick rental for 3 days with instant calculation
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Tomorrow
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3); // 3 days
    
    const calculation = calculateRental(product.id, startDate, endDate);
    
    if (calculation) {
      toast({
        title: "Quick Rental Preview",
        description: `3-day rental: ₹${calculation.finalTotal.toLocaleString()} (Save ₹${calculation.priceComparison.savings.toLocaleString()})`,
      });
      
      // Navigate to product detail page for full booking
      router.push(`/product/${product.id}`);
    } else {
      // Fallback to regular cart add
      addToCart(product, 'rent');
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-48 rounded-lg mb-4"></div>
            <div className="bg-muted h-4 rounded mb-2"></div>
            <div className="bg-muted h-4 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground text-lg mb-4">No products found</div>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} results
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}>
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Wishlist and View buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/20 hover:bg-white/20 text-white hover:text-orange-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product);
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/20 hover:bg-white/20 text-white hover:text-orange-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/product/${product.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                {/* Availability Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.availableForRent && (
                    <Badge className="bg-orange-500 text-white text-xs">
                      Rent Available
                    </Badge>
                  )}
                  {product.availableForBuy && (
                    <Badge variant="secondary" className="text-xs">
                      Buy Available
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    {product.availableForRent && (
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickRental(product);
                        }}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Rent
                      </Button>
                    )}
                    {product.availableForBuy && (
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
                    )}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm group-hover:text-orange-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">by {product.vendor}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                
                <div className="mt-auto space-y-2">
                  {product.availableForRent && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Rent:</span>
                      <span className="text-sm font-bold text-orange-500">₹{product.rentPrice}</span>
                    </div>
                  )}
                  {product.availableForBuy && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Buy:</span>
                      <span className="text-sm font-bold">₹{product.buyPrice}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  );
}