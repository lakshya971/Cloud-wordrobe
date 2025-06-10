"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock, 
  CreditCard, 
  Package, 
  Star, 
  RefreshCw,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useRental } from '@/contexts/RentalContext';

export function RentalDashboard() {
  const {
    userProfile,
    rentalBookings,
    getTotalSavings,
    getRentalHistory,
    getLoyaltyProgress,
    cancelBooking
  } = useRental();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const totalSavings = getTotalSavings();
  const rentalHistory = getRentalHistory();
  const loyaltyProgress = getLoyaltyProgress();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLoyaltyTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredBookings = rentalHistory.filter(booking => {
    const matchesSearch = booking.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRentals: userProfile.totalRentals,
    totalSavings: totalSavings,
    activeRentals: rentalBookings.filter(b => b.status === 'active').length,
    avgRating: userProfile.averageRating
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rental Dashboard</h1>
          <p className="text-muted-foreground">Manage your rentals and track your savings</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`${getLoyaltyTierColor(userProfile.loyaltyTier)} font-semibold`}>
            {userProfile.loyaltyTier.toUpperCase()} MEMBER
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Rentals</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalRentals}</p>
                </div>
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
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
                  <p className="text-3xl font-bold text-gray-900">₹{stats.totalSavings.toLocaleString()}</p>
                </div>
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
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Rentals</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeRentals}</p>
                </div>
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
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Loyalty Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-500" />
              Loyalty Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`${getLoyaltyTierColor(userProfile.loyaltyTier)} font-semibold`}>
                    {userProfile.loyaltyTier.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {loyaltyProgress.current} of {loyaltyProgress.required} rentals
                  </span>
                </div>
                {loyaltyProgress.nextTier !== 'platinum' && (
                  <span className="text-sm font-medium">
                    Next: {loyaltyProgress.nextTier.toUpperCase()}
                  </span>
                )}
              </div>
              
              {loyaltyProgress.nextTier !== 'platinum' && (
                <div className="space-y-2">
                  <Progress 
                    value={(loyaltyProgress.current / loyaltyProgress.required) * 100} 
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {loyaltyProgress.required - loyaltyProgress.current} more rentals to reach {loyaltyProgress.nextTier}
                  </p>
                </div>
              )}

              {loyaltyProgress.nextTier === 'platinum' && userProfile.loyaltyTier === 'platinum' && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">You've reached the highest tier!</span>
                  </div>
                  <p className="text-sm text-purple-600 mt-1">
                    Enjoy maximum discounts and exclusive benefits.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rental History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              Rental History
            </CardTitle>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rentals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No rentals found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start renting to see your history here'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{booking.productName}</h4>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p className="font-medium text-gray-900">Duration</p>
                            <p>{booking.days} days</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Start Date</p>
                            <p>{booking.startDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">End Date</p>
                            <p>{booking.endDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Total Amount</p>
                            <p className="font-semibold text-orange-600">₹{booking.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span>Security: ₹{booking.securityDeposit.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">
                              Saved: ₹{booking.calculation.priceComparison.savings.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {booking.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Package className="h-6 w-6" />
                <span>Browse Products</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Upcoming Rentals</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <RefreshCw className="h-6 w-6" />
                <span>Extend Rental</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
