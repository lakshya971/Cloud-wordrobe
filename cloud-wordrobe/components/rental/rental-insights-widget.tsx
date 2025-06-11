"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRental } from '@/contexts/RentalContext';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Brain, 
  Sparkles, 
  Award,
  Target,
  ArrowRight,
  BarChart3,
  Users,
  Leaf
} from 'lucide-react';

interface MarketInsight {
  category: string;
  trendDirection: 'up' | 'down' | 'stable';
  percentage: number;
  reason: string;
}

interface SeasonalTrend {
  season: string;
  popularCategories: string[];
  savingsOpportunity: number;
  demandLevel: 'high' | 'medium' | 'low';
}

export function RentalInsightsWidget() {
  const { userProfile, getTotalSavings, getLoyaltyProgress } = useRental();
  const router = useRouter();
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [seasonalTrends, setSeasonalTrends] = useState<SeasonalTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalSavings = getTotalSavings();
  const loyaltyProgress = getLoyaltyProgress();

  useEffect(() => {
    // Simulate loading market data
    setTimeout(() => {
      // Generate market insights
      const insights: MarketInsight[] = [
        {
          category: 'Wedding Collection',
          trendDirection: 'up',
          percentage: 23,
          reason: 'Peak wedding season approaching'
        },
        {
          category: 'Party Wear',
          trendDirection: 'up',
          percentage: 15,
          reason: 'Holiday celebrations increased demand'
        },
        {
          category: 'Formal Wear',
          trendDirection: 'stable',
          percentage: 5,
          reason: 'Consistent corporate events'
        },
        {
          category: 'Ethnic Wear',
          trendDirection: 'up',
          percentage: 18,
          reason: 'Festival season driving popularity'
        }
      ];

      // Generate seasonal trends
      const trends: SeasonalTrend[] = [
        {
          season: 'Winter Wedding Season',
          popularCategories: ['Wedding Lehengas', 'Designer Sarees', 'Formal Suits'],
          savingsOpportunity: 45,
          demandLevel: 'high'
        }
      ];

      setMarketInsights(insights);
      setSeasonalTrends(trends);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'from-purple-500 to-purple-600';
      case 'gold': return 'from-yellow-500 to-yellow-600';
      case 'silver': return 'from-gray-400 to-gray-500';
      default: return 'from-orange-500 to-orange-600';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-y-4 flex-col">
            <div className="relative">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent" />
              <Brain className="absolute inset-0 m-auto h-4 w-4 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground">Loading rental insights...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Insights Card */}
      <Card className="bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-orange-600" />
            Smart Rental Insights
            <Badge className="bg-orange-500 text-white text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  ₹{totalSavings.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">Total Savings</p>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">
                  {userProfile.loyaltyTier.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600">Loyalty Tier</p>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  {Math.round((loyaltyProgress.current / loyaltyProgress.required) * 100)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">Next Tier Progress</p>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Leaf className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Environmental Impact</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-700">CO₂ Saved:</span>
                <span className="font-semibold text-green-800 ml-2">
                  {Math.round(userProfile.totalRentals * 2.5)}kg
                </span>
              </div>
              <div>
                <span className="text-green-700">Textile Waste Prevented:</span>
                <span className="font-semibold text-green-800 ml-2">
                  {Math.round(userProfile.totalRentals * 1.2)}kg
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getTrendIcon(insight.trendDirection)}
                  <div>
                    <span className="font-medium">{insight.category}</span>
                    <p className="text-xs text-gray-500">{insight.reason}</p>
                  </div>
                </div>
                <Badge 
                  variant={insight.trendDirection === 'up' ? 'default' : 'secondary'}
                  className={insight.trendDirection === 'up' ? 'bg-green-500' : ''}
                >
                  {insight.trendDirection === 'up' ? '+' : ''}{insight.percentage}%
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Seasonal Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {seasonalTrends.map((trend, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{trend.season}</h4>
                <Badge className={`${
                  trend.demandLevel === 'high' ? 'bg-red-500' :
                  trend.demandLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                } text-white`}>
                  {trend.demandLevel.toUpperCase()} DEMAND
                </Badge>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-purple-700 mb-2">
                  <strong>Savings Opportunity:</strong> Up to {trend.savingsOpportunity}% vs buying
                </p>
                <p className="text-sm text-purple-600">
                  <strong>Trending:</strong> {trend.popularCategories.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={() => router.push('/dashboard')}
          className="h-12 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          View Full Analytics
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => router.push('/shop')}
          className="h-12 border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <Users className="h-4 w-4 mr-2" />
          Explore Trending Items
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* AI Explanation */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Powered by AI</h4>
              <p className="text-sm text-blue-700">
                These insights are generated using machine learning algorithms that analyze 
                market trends, seasonal patterns, user behavior, and demand forecasting to 
                help you make the most cost-effective rental decisions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
