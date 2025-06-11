"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Share2, 
  ShoppingCart, 
  Calendar, 
  MapPin, 
  User, 
  Shield, 
  Truck, 
  RotateCcw,
  Plus,
  Minus,
  Zap,
  Info
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRental } from '@/contexts/RentalContext';
import { useToast } from '@/hooks/use-toast';
import { RentalDatePicker } from '@/components/rental/rental-date-picker';
import { RentalBookingModal } from '@/components/rental/rental-booking-modal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Product {
  id: number;
  name: string;
  images: string[];
  buyPrice?: number;
  rentPrice?: number;
  rating: number;
  reviews: number;
  vendor: string;
  location: string;
  category: string;
  availableForBuy: boolean;
  availableForRent: boolean;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  sizes: string[];
  colors: string[];
  material: string;
  careInstructions: string[];
}

// Mock product data - replace with API call
const mockProduct: Product = {
  id: 1,
  name: "Elegant Designer Saree with Golden Border",
  images: [
    "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1383814/pexels-photo-1383814.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  buyPrice: 4999,
  rentPrice: 199,
  rating: 4.8,
  reviews: 156,
  vendor: "Bridal Dreams",
  location: "Mumbai",
  category: "Ethnic Wear",
  availableForBuy: true,
  availableForRent: true,
  description: "Exquisite designer saree crafted with premium silk fabric and intricate golden border work. Perfect for weddings, festivals, and special occasions. This timeless piece combines traditional elegance with contemporary styling.",
  features: [
    "Premium silk fabric",
    "Hand-crafted golden border",
    "Includes matching blouse piece",
    "Traditional weaving technique",
    "Dry clean only"
  ],
  specifications: {
    "Fabric": "Pure Silk",
    "Length": "6.5 meters",
    "Blouse Length": "0.8 meters", 
    "Pattern": "Traditional",
    "Occasion": "Wedding, Festival",
    "Care": "Dry Clean Only"
  },
  sizes: ["Free Size"],
  colors: ["Red", "Maroon", "Gold"],
  material: "100% Pure Silk",
  careInstructions: [
    "Dry clean only",
    "Store in a cool, dry place",
    "Avoid direct sunlight",
    "Handle with care to preserve embroidery"
  ]
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { currentDraft, userProfile } = useRental();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [rentalDates, setRentalDates] = useState<{ start: Date | null, end: Date | null }>({
    start: null,
    end: null
  });

  useEffect(() => {
    // In a real app, fetch product data based on params.id
    // For now, using mock data
    setTimeout(() => {
      setProduct(mockProduct);
      setSelectedSize(mockProduct.sizes[0]);
      setSelectedColor(mockProduct.colors[0]);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleAddToCart = (type: 'buy' | 'rent') => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      buyPrice: product.buyPrice,
      rentPrice: product.rentPrice,
      vendor: product.vendor,
      rating: product.rating,
      reviews: product.reviews,
      location: product.location,
      availableForBuy: product.availableForBuy,
      availableForRent: product.availableForRent
    }, type);

    toast({
      title: `Added to cart`,
      description: `${product.name} has been added to your cart for ${type}.`,
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;

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
        image: product.images[0],
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
  const handleRentalBooking = () => {
    if (!product) return;
    setShowRentalModal(true);
  };

  const handleBookingComplete = (bookingId: string) => {
    setShowRentalModal(false);
    toast({
      title: "Booking Confirmed!",
      description: `Your rental booking has been confirmed. Booking ID: ${bookingId.slice(-8)}`,
    });
    // Redirect to rental dashboard
    router.push('/dashboard?tab=rentals');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out this amazing product: ${product?.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-muted h-96 rounded-lg"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-muted h-20 w-20 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-muted h-8 rounded"></div>
                <div className="bg-muted h-4 rounded w-2/3"></div>
                <div className="bg-muted h-6 rounded w-1/3"></div>
                <div className="bg-muted h-32 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push('/shop')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <button onClick={() => router.push('/shop')} className="hover:text-orange-500">
            Shop
          </button>
          <span className="mx-2">/</span>
          <span className="hover:text-orange-500">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image overlay badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.availableForRent && (
                  <Badge className="bg-orange-500 text-white">
                    <Calendar className="h-3 w-3 mr-1" />
                    Available for Rent
                  </Badge>
                )}
                {product.availableForBuy && (
                  <Badge variant="secondary">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Available for Purchase
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-orange-500 scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and basic info */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                {product.name}
              </motion.h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{product.vendor}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              {product.availableForRent && (
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Rent this item</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Perfect for special occasions</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-500">₹{product.rentPrice}</div>
                    <div className="text-xs text-muted-foreground">per day</div>
                  </div>
                </div>
              )}

              {product.availableForBuy && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span className="font-medium">Buy this item</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Own it forever</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹{product.buyPrice}</div>
                    <div className="text-xs text-muted-foreground">one-time payment</div>
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              {product.sizes.length > 1 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                          selectedSize === size
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Color</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                          selectedColor === color
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {product.availableForRent && (
                <div className="space-y-2">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                    onClick={handleRentalBooking}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Rental - ₹{product.rentPrice}/day
                  </Button>
                  
                  {/* Show current draft info if exists */}
                  {currentDraft && currentDraft.productId === product.id && currentDraft.calculation && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-800">Draft Saved</span>
                      </div>
                      <div className="text-xs text-orange-600 mt-1">
                        {currentDraft.startDate && currentDraft.endDate && (
                          <span>
                            {currentDraft.calculation.breakdown.numberOfDays} days • 
                            Total: ₹{currentDraft.calculation.finalTotal.toLocaleString()} • 
                            Save: ₹{currentDraft.calculation.priceComparison.savings.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Loyalty benefit highlight */}
                  {userProfile.loyaltyTier !== 'bronze' && (
                    <div className="bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                          {userProfile.loyaltyTier.toUpperCase()}
                        </Badge>
                        <span className="text-purple-700">
                          Get {userProfile.loyaltyTier === 'platinum' ? '12%' : userProfile.loyaltyTier === 'gold' ? '8%' : '5%'} extra discount!
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {product.availableForBuy && (
                <Button
                  variant="outline"
                  className="w-full border-2"
                  size="lg"
                  onClick={() => handleAddToCart('buy')}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - ₹{product.buyPrice}
                </Button>
              )}

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={handleWishlistToggle}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button variant="ghost" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-xs font-medium">Secure Payment</div>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-xs font-medium">Free Delivery</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-xs font-medium">Easy Returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex border-b">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'care', label: 'Care Instructions' },
              { id: 'reviews', label: 'Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">About this product</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="font-semibold mb-4">Product Specifications</h3>
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h3 className="font-semibold mb-4">Care Instructions</h3>
                <ul className="space-y-3">
                  {product.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {product.reviews} reviews
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-muted-foreground">
                    Reviews feature coming soon. Customer reviews will be displayed here.
                  </div>                </div>
              </div>
            )}
          </div>
        </div>
      </main>

        {/* Rental Booking Modal */}
        <RentalBookingModal
          isOpen={showRentalModal}
          onClose={() => setShowRentalModal(false)}
          product={product ? {
            id: product.id,
            name: product.name,
            image: product.images[0],
            buyPrice: product.buyPrice || 0,
            rentPrice: product.rentPrice || 0,
            rating: product.rating,
            reviews: product.reviews,
            vendor: product.vendor,
            location: product.location,
            category: product.category,
            brand: product.vendor,
            description: product.description
          } : null}
        />

      <Footer />
    </div>
  );
}
