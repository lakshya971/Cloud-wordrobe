"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Calendar, 
  DollarSign,
  Clock,
  Star,
  Users,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRental } from '@/contexts/RentalContext';
import { RentalCalculator } from '@/lib/rental-calculator';

interface RecommendationInsight {
  type: 'savings' | 'popularity' | 'seasonal' | 'personal' | 'trending';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  confidence: number;
}

interface ProductRecommendation {
  productId: number;
  name: string;
  image: string;
  category: string;
  vendor: string;
  location: string;
  originalPrice: number;
  recommendedDuration: number;
  projectedSavings: number;
  popularityScore: number;
  reasons: string[];
  insights: RecommendationInsight[];
}

interface RentalRecommendationsProps {
  currentProductId?: number;
}

export function RentalRecommendations({ currentProductId }: RentalRecommendationsProps) {
  const { userProfile, rentalBookings, calculateRental } = useRental();
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [insights, setInsights] = useState<RecommendationInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data for AI-powered recommendations
  const mockProducts = [
    {
      id: 7,
      name: 'Designer Bridal Lehenga',
      image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Wedding Collection',
      vendor: 'Royal Designs',
      location: 'Delhi',
      originalPrice: 15999,
      popularityScore: 95,
    },
    {
      id: 8,
      name: 'Cocktail Party Dress',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Party Wear',
      vendor: 'Glamour House',
      location: 'Mumbai',
      originalPrice: 4999,
      popularityScore: 87,
    },
    {
      id: 9,
      name: 'Traditional Saree Collection',
      image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Ethnic Wear',
      vendor: 'Heritage Textiles',
      location: 'Bangalore',
      originalPrice: 3499,
      popularityScore: 78,
    },
    {
      id: 10,
      name: 'Business Formal Suit',
      image: 'https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Formal Wear',
      vendor: 'Executive Style',
      location: 'Hyderabad',
      originalPrice: 6999,
      popularityScore: 72,
    }
  ];

  useEffect(() => {
    // Simulate AI recommendation generation
    const generateRecommendations = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));      const recommendations: ProductRecommendation[] = mockProducts
        .filter(product => product.id !== currentProductId) // Exclude current product
        .map(product => {
          // Generate optimal rental duration based on category and user history
          const optimalDuration = RentalCalculator.getOptimalRentalDuration(product.originalPrice);
          const recommendedDuration = Math.max(optimalDuration.recommended, 3);

          // Calculate projected savings
          const startDate = new Date();
          startDate.setDate(startDate.getDate() + 7); // Next week
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + recommendedDuration);

          const calculation = calculateRental(product.id, startDate, endDate);
          const projectedSavings = calculation?.priceComparison.savings || 0;

          // Generate personalized reasons
          const reasons = generateReasons(product, userProfile, rentalBookings);

          // Generate insights
          const insights = generateInsights(product, userProfile, calculation);          return {
            productId: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            vendor: product.vendor,
            location: product.location,
            originalPrice: product.originalPrice,
            popularityScore: product.popularityScore,
            recommendedDuration,
            projectedSavings,
            reasons,
            insights
          };
        });

      // Sort by projected savings and popularity
      recommendations.sort((a, b) => {
        const scoreA = a.projectedSavings * 0.6 + a.popularityScore * 0.4;
        const scoreB = b.projectedSavings * 0.6 + b.popularityScore * 0.4;
        return scoreB - scoreA;
      });

      setRecommendations(recommendations);
      
      // Generate global insights
      const globalInsights = generateGlobalInsights(recommendations, userProfile);
      setInsights(globalInsights);
      
      setLoading(false);
    };    generateRecommendations();
  }, [userProfile, rentalBookings, currentProductId, calculateRental]);

  const generateReasons = (product: any, profile: any, bookings: any[]): string[] => {
    const reasons = [];

    // Loyalty-based reasons
    if (profile.loyaltyTier === 'gold' || profile.loyaltyTier === 'platinum') {
      reasons.push(`Extra ${profile.loyaltyTier === 'platinum' ? '12%' : '8%'} discount as ${profile.loyaltyTier} member`);
    }

    // Category-based reasons
    const categoryRentals = bookings.filter(b => b.productName.includes(product.category.split(' ')[0]));
    if (categoryRentals.length > 0) {
      reasons.push(`Based on your previous ${product.category.toLowerCase()} rentals`);
    }

    // Price-based reasons
    if (product.originalPrice > 5000) {
      reasons.push('High-value item with significant rental savings');
    }

    // Popularity reasons
    if (product.popularityScore > 85) {
      reasons.push('Trending and highly rated by other users');
    }

    // Seasonal reasons
    const month = new Date().getMonth();
    if (product.category === 'Wedding Collection' && [10, 11, 0, 1].includes(month)) {
      reasons.push('Peak wedding season - book early for best dates');
    }

    // Location reasons
    if (product.location === 'Mumbai' || product.location === 'Delhi') {
      reasons.push('Premium location with fast delivery');
    }

    return reasons.slice(0, 3); // Limit to top 3 reasons
  };

  const generateInsights = (product: any, profile: any, calculation: any): RecommendationInsight[] => {
    const insights: RecommendationInsight[] = [];

    // Savings insight
    if (calculation && calculation.priceComparison.savingsPercentage > 50) {
      insights.push({
        type: 'savings',
        title: 'Exceptional Savings',
        description: `Save ${calculation.priceComparison.savingsPercentage.toFixed(0)}% compared to buying`,
        impact: 'high',
        actionable: true,
        confidence: 95
      });
    }

    // Popularity insight
    if (product.popularityScore > 90) {
      insights.push({
        type: 'popularity',
        title: 'Highly Popular',
        description: 'Top 10% most rented items in this category',
        impact: 'medium',
        actionable: false,
        confidence: 92
      });
    }

    // Personal insight
    if (profile.isFirstTime) {
      insights.push({
        type: 'personal',
        title: 'First-Time Bonus',
        description: 'Get 10% additional discount as a new user',
        impact: 'medium',
        actionable: true,
        confidence: 100
      });
    }

    return insights;
  };

  const generateGlobalInsights = (recommendations: ProductRecommendation[], profile: any): RecommendationInsight[] => {
    const insights: RecommendationInsight[] = [];

    // User behavior insight
    insights.push({
      type: 'personal',
      title: 'Your Rental Profile',
      description: `As a ${profile.loyaltyTier} member with ${profile.totalRentals} rentals, you qualify for enhanced discounts`,
      impact: 'high',
      actionable: true,
      confidence: 100
    });

    // Market insight
    const avgSavings = recommendations.reduce((sum, r) => sum + r.projectedSavings, 0) / recommendations.length;
    insights.push({
      type: 'savings',
      title: 'Market Opportunity',
      description: `Average savings of ₹${avgSavings.toFixed(0)} per rental in your preferred categories`,
      impact: 'high',
      actionable: false,
      confidence: 88
    });

    // Seasonal insight
    const month = new Date().getMonth();
    if ([10, 11, 0, 1].includes(month)) {
      insights.push({
        type: 'seasonal',
        title: 'Wedding Season Active',
        description: 'Book wedding and formal wear early for prime dates and best selection',
        impact: 'high',
        actionable: true,
        confidence: 85
      });
    }

    return insights;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'savings': return <DollarSign className="h-4 w-4" />;
      case 'popularity': return <Users className="h-4 w-4" />;
      case 'seasonal': return <Calendar className="h-4 w-4" />;
      case 'personal': return <Target className="h-4 w-4" />;
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-y-4 flex-col">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
                <Brain className="absolute inset-0 m-auto h-6 w-6 text-orange-500" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">AI is analyzing your preferences...</h3>
                <p className="text-sm text-muted-foreground">Generating personalized recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg">
            <Brain className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Recommendations</h2>
            <p className="text-muted-foreground">Personalized suggestions based on your preferences</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-orange-500 to-purple-500 text-white">
          <Zap className="h-3 w-3 mr-1" />
          Powered by AI
        </Badge>
      </div>

      {/* Global Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-l-4 ${getImpactColor(insight.impact)}`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <Progress value={insight.confidence} className="w-12 h-1" />
                    </div>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
          className="whitespace-nowrap"
        >
          All Categories
        </Button>
        {['Wedding', 'Party', 'Ethnic', 'Formal'].map(category => (
          <Button
            key={category}
            variant={selectedCategory === category.toLowerCase() ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className="whitespace-nowrap"
          >
            {category} Wear
          </Button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.productId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800">
                    {recommendation.popularityScore}% Popular
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-green-500 text-white">
                    Save ₹{recommendation.projectedSavings.toLocaleString()}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Product Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-1">{recommendation.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span>{recommendation.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{recommendation.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Original Price</p>
                        <p className="font-bold">₹{recommendation.originalPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Recommended Duration</p>
                        <p className="font-bold text-orange-600">{recommendation.recommendedDuration} days</p>
                      </div>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Why recommended for you:</h4>
                    <div className="space-y-1">
                      {recommendation.reasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights */}
                  {recommendation.insights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">AI Insights:</h4>
                      <div className="space-y-2">
                        {recommendation.insights.map((insight, idx) => (
                          <div key={idx} className={`flex items-start gap-2 p-2 rounded text-xs ${getImpactColor(insight.impact)}`}>
                            {getInsightIcon(insight.type)}
                            <div>
                              <span className="font-medium">{insight.title}: </span>
                              <span>{insight.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Explanation */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How our AI works</h3>
              <p className="text-sm text-blue-700 mb-3">
                Our recommendation engine analyzes your rental history, preferences, seasonal trends, 
                and real-time demand to suggest the best rental opportunities with maximum savings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-blue-600" />
                  <span>Personal preferences</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  <span>Market trends</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3 text-blue-600" />
                  <span>Savings optimization</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
