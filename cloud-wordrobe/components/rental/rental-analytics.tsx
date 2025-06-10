"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRental } from '@/contexts/RentalContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  Star, 
  Award, 
  BarChart3, 
  PieChart, 
  Activity,
  Target,
  Zap,
  ShoppingBag,
  Clock,
  Users,
  Heart,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  totalRentals: number;
  totalSavings: number;
  averageRentalDuration: number;
  favoriteCategories: Array<{ category: string; count: number; percentage: number }>;
  monthlyTrends: Array<{ month: string; rentals: number; savings: number }>;
  seasonalPreferences: Array<{ season: string; percentage: number }>;
  priceRangePreferences: Array<{ range: string; percentage: number }>;
  loyaltyMetrics: {
    currentTier: string;
    nextTier: string;
    progress: number;
    benefits: string[];
    tierSavings: number;
  };
}

export function RentalAnalytics() {
  const { userProfile, rentalBookings, getTotalSavings, getLoyaltyProgress } = useRental();
  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  // Generate analytics data
  const analyticsData: AnalyticsData = useMemo(() => {
    const completedBookings = rentalBookings.filter(b => b.status !== 'cancelled');
    
    // Basic metrics
    const totalRentals = completedBookings.length;
    const totalSavings = getTotalSavings();
    const averageRentalDuration = totalRentals > 0 
      ? Math.round(completedBookings.reduce((sum, b) => sum + b.days, 0) / totalRentals) 
      : 0;

    // Favorite categories
    const categoryCount: Record<string, number> = {};
    completedBookings.forEach(booking => {
      // Mock category based on product name patterns
      let category = 'Other';
      if (booking.productName.toLowerCase().includes('ethnic')) category = 'Ethnic Wear';
      else if (booking.productName.toLowerCase().includes('wedding')) category = 'Wedding Collection';
      else if (booking.productName.toLowerCase().includes('party')) category = 'Party Wear';
      else if (booking.productName.toLowerCase().includes('formal')) category = 'Formal Wear';
      else if (booking.productName.toLowerCase().includes('western')) category = 'Western Wear';
      
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const favoriteCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / totalRentals) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Monthly trends (last 6 months)
    const monthlyTrends = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const monthBookings = completedBookings.filter(booking => {
        const bookingMonth = `${booking.bookingDate.getFullYear()}-${String(booking.bookingDate.getMonth() + 1).padStart(2, '0')}`;
        return bookingMonth === monthKey;
      });

      monthlyTrends.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        rentals: monthBookings.length,
        savings: monthBookings.reduce((sum, b) => sum + b.calculation.priceComparison.savings, 0)
      });
    }

    // Seasonal preferences
    const seasonalCount = { Spring: 0, Summer: 0, Monsoon: 0, Winter: 0 };
    completedBookings.forEach(booking => {
      const month = booking.startDate.getMonth();
      if ([2, 3, 4].includes(month)) seasonalCount.Spring++;
      else if ([5, 6].includes(month)) seasonalCount.Summer++;
      else if ([7, 8, 9].includes(month)) seasonalCount.Monsoon++;
      else seasonalCount.Winter++;
    });

    const seasonalPreferences = Object.entries(seasonalCount)
      .map(([season, count]) => ({
        season,
        percentage: totalRentals > 0 ? Math.round((count / totalRentals) * 100) : 0
      }));

    // Price range preferences
    const priceRanges = { 'Under ₹500': 0, '₹500-₹1000': 0, '₹1000-₹2000': 0, 'Above ₹2000': 0 };
    completedBookings.forEach(booking => {
      const amount = booking.totalAmount;
      if (amount < 500) priceRanges['Under ₹500']++;
      else if (amount < 1000) priceRanges['₹500-₹1000']++;
      else if (amount < 2000) priceRanges['₹1000-₹2000']++;
      else priceRanges['Above ₹2000']++;
    });

    const priceRangePreferences = Object.entries(priceRanges)
      .map(([range, count]) => ({
        range,
        percentage: totalRentals > 0 ? Math.round((count / totalRentals) * 100) : 0
      }));

    // Loyalty metrics
    const loyaltyProgress = getLoyaltyProgress();
    const tierBenefits = {
      bronze: ['5% discount on all rentals', 'Free delivery above ₹500'],
      silver: ['10% discount on all rentals', 'Free delivery', 'Priority customer support'],
      gold: ['15% discount on all rentals', 'Free delivery & pickup', 'Priority support', 'Exclusive collections'],
      platinum: ['20% discount on all rentals', 'Free delivery & pickup', 'VIP support', 'Exclusive collections', 'Early access to new arrivals']
    };

    const tierSavings = {
      bronze: totalSavings * 0.05,
      silver: totalSavings * 0.10,
      gold: totalSavings * 0.15,
      platinum: totalSavings * 0.20
    };

    const loyaltyMetrics = {
      currentTier: userProfile.loyaltyTier,
      nextTier: loyaltyProgress.nextTier,
      progress: (loyaltyProgress.current / loyaltyProgress.required) * 100,
      benefits: tierBenefits[userProfile.loyaltyTier as keyof typeof tierBenefits] || [],
      tierSavings: tierSavings[userProfile.loyaltyTier as keyof typeof tierSavings] || 0
    };

    return {
      totalRentals,
      totalSavings,
      averageRentalDuration,
      favoriteCategories,
      monthlyTrends,
      seasonalPreferences,
      priceRangePreferences,
      loyaltyMetrics
    };
  }, [rentalBookings, userProfile, getTotalSavings, getLoyaltyProgress]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-500';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      default: return 'bg-orange-500';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'rentals': return <ShoppingBag className="h-4 w-4" />;
      case 'savings': return <DollarSign className="h-4 w-4" />;
      case 'duration': return <Clock className="h-4 w-4" />;
      case 'rating': return <Star className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-orange-500" />
            Rental Analytics
          </h2>
          <p className="text-muted-foreground">
            Insights into your rental journey and preferences
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Rentals</p>
                      <p className="text-2xl font-bold">{analyticsData.totalRentals}</p>
                    </div>
                    <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+23% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
                      <p className="text-2xl font-bold">₹{analyticsData.totalSavings.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">vs buying price</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                      <p className="text-2xl font-bold">{analyticsData.averageRentalDuration} days</p>
                    </div>
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Activity className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-blue-500">per rental</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">{userProfile.averageRating.toFixed(1)}</p>
                    </div>
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-500">given by you</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Rental Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyTrends.map((trend, index) => (
                  <div key={trend.month} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{trend.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Rentals: {trend.rentals}</span>
                        <span className="text-sm text-green-600">Saved: ₹{trend.savings.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={trend.rentals > 0 ? (trend.rentals / Math.max(...analyticsData.monthlyTrends.map(t => t.rentals))) * 100 : 0} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Favorite Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Favorite Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.favoriteCategories.map((category, index) => (
                    <div key={category.category} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-orange-500' : index === 1 ? 'bg-blue-500' : 'bg-gray-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{category.category}</span>
                          <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                        </div>
                        <Progress value={category.percentage} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Seasonal Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.seasonalPreferences.map((season, index) => (
                    <div key={season.season} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        season.season === 'Winter' ? 'bg-blue-500' : 
                        season.season === 'Spring' ? 'bg-green-500' : 
                        season.season === 'Summer' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{season.season}</span>
                          <span className="text-sm text-muted-foreground">{season.percentage}%</span>
                        </div>
                        <Progress value={season.percentage} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Range Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Price Range Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.priceRangePreferences.map((range, index) => (
                    <div key={range.range} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 ? 'bg-green-500' : 
                        index === 1 ? 'bg-yellow-500' : 
                        index === 2 ? 'bg-orange-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{range.range}</span>
                          <span className="text-sm text-muted-foreground">{range.percentage}%</span>
                        </div>
                        <Progress value={range.percentage} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty" className="space-y-6">
          {/* Current Tier Status */}
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Award className="h-6 w-6 text-orange-500" />
                    {analyticsData.loyaltyMetrics.currentTier.toUpperCase()} Member
                  </h3>
                  <p className="text-muted-foreground">
                    Next tier: {analyticsData.loyaltyMetrics.nextTier}
                  </p>
                </div>
                <Badge className={`${getTierColor(analyticsData.loyaltyMetrics.currentTier)} text-white text-lg px-4 py-2`}>
                  {analyticsData.loyaltyMetrics.currentTier.charAt(0).toUpperCase() + analyticsData.loyaltyMetrics.currentTier.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {analyticsData.loyaltyMetrics.nextTier}</span>
                  <span>{Math.round(analyticsData.loyaltyMetrics.progress)}%</span>
                </div>
                <Progress value={analyticsData.loyaltyMetrics.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Tier Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Your Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {analyticsData.loyaltyMetrics.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700">
                  <strong>Tier Savings:</strong> You've saved an extra ₹{analyticsData.loyaltyMetrics.tierSavings.toLocaleString()} 
                  through your {analyticsData.loyaltyMetrics.currentTier} tier benefits!
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI-Powered Insights */}
          <div className="grid gap-4">
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Smart Recommendation</h4>
                    <p className="text-sm text-purple-600 mb-3">
                      Based on your rental patterns, you prefer party wear during winter months. 
                      Consider booking your next formal event outfit early for the upcoming wedding season to get better prices.
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Confidence: 89%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Savings Opportunity</h4>
                    <p className="text-sm text-blue-600 mb-3">
                      You could save an additional ₹2,400 this year by increasing your average rental duration 
                      from {analyticsData.averageRentalDuration} to 5 days. Bulk rentals offer better value!
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Potential Savings: ₹2,400
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Community Insight</h4>
                    <p className="text-sm text-green-600 mb-3">
                      You're in the top 15% of users in your city for sustainable fashion choices. 
                      Your rental habits have prevented 12kg of textile waste!
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Environmental Impact: 12kg saved
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-500" />
                Suggested Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Reach {analyticsData.loyaltyMetrics.nextTier} Tier</h5>
                    <p className="text-sm text-muted-foreground">
                      Complete {analyticsData.loyaltyMetrics.nextTier === 'silver' ? '3' : '7'} more rentals
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Start
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Save ₹5,000 This Year</h5>
                    <p className="text-sm text-muted-foreground">
                      You're {Math.round((analyticsData.totalSavings / 5000) * 100)}% of the way there
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Track
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">Try 3 New Categories</h5>
                    <p className="text-sm text-muted-foreground">
                      Explore beyond your favorite styles
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Explore
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
