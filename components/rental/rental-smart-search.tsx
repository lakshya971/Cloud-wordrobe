"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRental } from '@/contexts/RentalContext';
import { RentalCalculator } from '@/lib/rental-calculator';
import { 
  Search, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  MapPin, 
  Star, 
  Clock, 
  Filter,
  SortAsc,
  Zap,
  Brain,
  Target,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmartSearchSuggestion {
  id: string;
  type: 'product' | 'category' | 'occasion' | 'trend' | 'ai-recommendation';
  title: string;
  subtitle?: string;
  image?: string;
  metadata: {
    price?: number;
    location?: string;
    rating?: number;
    trending?: boolean;
    aiConfidence?: number;
    occasion?: string;
    seasonality?: 'high' | 'medium' | 'low';
  };
}

interface RentalSmartSearchProps {
  onSearchChange: (query: string) => void;
  onSuggestionSelect: (suggestion: SmartSearchSuggestion) => void;
  className?: string;
}

export function RentalSmartSearch({ onSearchChange, onSuggestionSelect, className }: RentalSmartSearchProps) {
  const { userProfile, rentalBookings } = useRental();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [suggestions, setSuggestions] = useState<SmartSearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Mock data for intelligent suggestions
  const mockProducts = [
    { id: 1, name: 'Elegant Designer Saree', category: 'Ethnic Wear', price: 199, rating: 4.8, location: 'Mumbai', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 2, name: 'Royal Wedding Lehenga', category: 'Wedding Collection', price: 899, rating: 4.9, location: 'Delhi', image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 3, name: 'Cocktail Party Dress', category: 'Party Wear', price: 299, rating: 4.7, location: 'Bangalore', image: 'https://images.pexels.com/photos/1383814/pexels-photo-1383814.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 4, name: 'Business Formal Suit', category: 'Formal Wear', price: 499, rating: 4.8, location: 'Chennai', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 5, name: 'Casual Summer Dress', category: 'Western Wear', price: 149, rating: 4.6, location: 'Hyderabad', image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=100' },
  ];

  const mockCategories = [
    { name: 'Ethnic Wear', trending: true, occasions: ['Wedding', 'Festival', 'Traditional'] },
    { name: 'Party Wear', trending: true, occasions: ['Cocktail', 'Birthday', 'Celebration'] },
    { name: 'Wedding Collection', trending: false, occasions: ['Wedding', 'Engagement', 'Reception'] },
    { name: 'Formal Wear', trending: false, occasions: ['Office', 'Business', 'Corporate'] },
    { name: 'Western Wear', trending: true, occasions: ['Casual', 'Dating', 'Weekend'] },
  ];

  const mockOccasions = [
    { name: 'Wedding', seasonality: 'high' as const, popularity: 95 },
    { name: 'Party', seasonality: 'medium' as const, popularity: 85 },
    { name: 'Festival', seasonality: 'high' as const, popularity: 80 },
    { name: 'Office', seasonality: 'low' as const, popularity: 70 },
    { name: 'Date Night', seasonality: 'medium' as const, popularity: 75 },
  ];

  // Generate AI-powered suggestions based on user behavior
  const generateAISuggestions = useCallback((query: string): SmartSearchSuggestion[] => {
    const aiSuggestions: SmartSearchSuggestion[] = [];
    
    // Analyze user's rental history for personalized suggestions
    const userCategories = rentalBookings.reduce((acc, booking) => {
      // Mock category extraction from booking
      const category = booking.productName.includes('Saree') ? 'Ethnic Wear' :
                      booking.productName.includes('Dress') ? 'Party Wear' :
                      booking.productName.includes('Suit') ? 'Formal Wear' : 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteCategory = Object.entries(userCategories)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    // Season-based suggestions
    const currentMonth = new Date().getMonth();
    const isWeddingSeason = [10, 11, 0, 1].includes(currentMonth); // Nov-Feb
    const isFestivalSeason = [8, 9].includes(currentMonth); // Sep-Oct

    if (isWeddingSeason && query.toLowerCase().includes('wedding')) {
      aiSuggestions.push({
        id: 'ai-wedding-1',
        type: 'ai-recommendation',
        title: 'Wedding Season Special',
        subtitle: 'Premium lehengas with 20% off this month',
        metadata: {
          aiConfidence: 92,
          seasonality: 'high',
          trending: true
        }
      });
    }

    if (favoriteCategory && query.toLowerCase().includes(favoriteCategory.toLowerCase())) {
      aiSuggestions.push({
        id: 'ai-personal-1',
        type: 'ai-recommendation',
        title: `More ${favoriteCategory}`,
        subtitle: `Based on your ${userCategories[favoriteCategory]} previous rentals`,
        metadata: {
          aiConfidence: 88,
          trending: false
        }
      });
    }

    return aiSuggestions;
  }, [rentalBookings]);

  // Generate smart suggestions
  const generateSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const suggestions: SmartSearchSuggestion[] = [];
    const lowerQuery = query.toLowerCase();

    // Product suggestions
    const matchingProducts = mockProducts.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );

    matchingProducts.forEach(product => {
      suggestions.push({
        id: `product-${product.id}`,
        type: 'product',
        title: product.name,
        subtitle: `₹${product.price}/day in ${product.location}`,
        image: product.image,
        metadata: {
          price: product.price,
          location: product.location,
          rating: product.rating,
          trending: Math.random() > 0.7
        }
      });
    });

    // Category suggestions
    const matchingCategories = mockCategories.filter(category =>
      category.name.toLowerCase().includes(lowerQuery) ||
      category.occasions.some(occasion => occasion.toLowerCase().includes(lowerQuery))
    );

    matchingCategories.forEach(category => {
      suggestions.push({
        id: `category-${category.name}`,
        type: 'category',
        title: category.name,
        subtitle: `${category.occasions.length} occasions available`,
        metadata: {
          trending: category.trending
        }
      });
    });

    // Occasion suggestions
    const matchingOccasions = mockOccasions.filter(occasion =>
      occasion.name.toLowerCase().includes(lowerQuery)
    );

    matchingOccasions.forEach(occasion => {
      suggestions.push({
        id: `occasion-${occasion.name}`,
        type: 'occasion',
        title: `${occasion.name} Outfits`,
        subtitle: `${occasion.popularity}% customer satisfaction`,
        metadata: {
          seasonality: occasion.seasonality,
          trending: occasion.popularity > 80
        }
      });
    });

    // Add AI-powered suggestions
    const aiSuggestions = generateAISuggestions(query);
    suggestions.push(...aiSuggestions);

    // Add trending suggestions if no specific matches
    if (suggestions.length === 0) {
      suggestions.push({
        id: 'trend-1',
        type: 'trend',
        title: 'Trending Now: Ethnic Fusion',
        subtitle: 'Indo-western outfits gaining popularity',
        metadata: {
          trending: true,
          aiConfidence: 75
        }
      });
    }

    setSuggestions(suggestions.slice(0, 8)); // Limit to 8 suggestions
    setIsSearching(false);
  }, [generateAISuggestions]);

  // Handle search input changes
  useEffect(() => {
    if (debouncedQuery) {
      generateSuggestions(debouncedQuery);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, generateSuggestions, onSearchChange]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SmartSearchSuggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSuggestionSelect(suggestion);
  };

  const getSuggestionIcon = (type: SmartSearchSuggestion['type']) => {
    switch (type) {
      case 'product': return <Search className="h-4 w-4 text-gray-400" />;
      case 'category': return <Filter className="h-4 w-4 text-blue-500" />;
      case 'occasion': return <Calendar className="h-4 w-4 text-green-500" />;
      case 'trend': return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'ai-recommendation': return <Brain className="h-4 w-4 text-purple-500" />;
      default: return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isSearching ? (
            <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
        
        <Input
          type="text"
          placeholder="Search by style, occasion, or let AI help you find the perfect outfit..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => debouncedQuery && setShowSuggestions(true)}
          className="pl-10 pr-4 py-3 w-full border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
        />
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-0 h-full px-3"
            onClick={() => {
              setSearchQuery('');
              setShowSuggestions(false);
              onSearchChange('');
            }}
          >
            ×
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-xl border-gray-200 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors ${
                        selectedIndex === index ? 'bg-orange-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center gap-3">
                        {suggestion.image ? (
                          <img
                            src={suggestion.image}
                            alt={suggestion.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            {getSuggestionIcon(suggestion.type)}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 truncate">
                              {suggestion.title}
                            </span>
                            
                            {suggestion.metadata.trending && (
                              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            
                            {suggestion.type === 'ai-recommendation' && (
                              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI Pick
                              </Badge>
                            )}
                          </div>
                          
                          {suggestion.subtitle && (
                            <p className="text-sm text-gray-500 truncate">
                              {suggestion.subtitle}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-3 mt-1">
                            {suggestion.metadata.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">
                                  {suggestion.metadata.rating}
                                </span>
                              </div>
                            )}
                            
                            {suggestion.metadata.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">
                                  {suggestion.metadata.location}
                                </span>
                              </div>
                            )}
                            
                            {suggestion.metadata.aiConfidence && (
                              <div className="flex items-center gap-1">
                                <Target className="h-3 w-3 text-purple-400" />
                                <span className="text-xs text-purple-600">
                                  {suggestion.metadata.aiConfidence}% match
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {suggestion.metadata.price && (
                          <div className="text-right">
                            <span className="font-semibold text-orange-600">
                              ₹{suggestion.metadata.price}
                            </span>
                            <span className="text-xs text-gray-500">/day</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* AI Insights Footer */}
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <Brain className="h-4 w-4" />
                    <span>
                      Powered by AI • {suggestions.filter(s => s.type === 'ai-recommendation').length} smart recommendations
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Shortcuts */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="text-xs text-gray-500">Quick search:</span>
        {['Wedding', 'Party', 'Ethnic', 'Formal'].map((shortcut) => (
          <Button
            key={shortcut}
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs border-gray-200 hover:border-orange-300 hover:text-orange-600"
            onClick={() => setSearchQuery(shortcut)}
          >
            {shortcut}
          </Button>
        ))}
      </div>
    </div>
  );
}
