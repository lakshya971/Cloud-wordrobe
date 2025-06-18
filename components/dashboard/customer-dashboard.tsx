"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  ShoppingBag, 
  Calendar, 
  Heart,
  Clock,
  TrendingUp,
  DollarSign,
  Package,
  Star,
  Gift,
  MapPin,
  Truck,
  RotateCcw,
  CheckCircle,
  CreditCard,
  Award,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRental } from '@/contexts/RentalContext';

interface CustomerStats {
  totalOrders: number;
  totalSpent: number;
  activeRentals: number;
  wishlistItems: number;
  loyaltyPoints: number;
  memberSince: Date;
  totalSavings: number;
}

interface Order {
  id: number;
  productName: string;
  image: string;
  type: 'buy' | 'rent';
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned';
  date: Date;
  returnDate?: Date;
}

interface Rental {
  id: number;
  productName: string;
  image: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  status: 'active' | 'overdue' | 'completed';
}

export function CustomerDashboard() {
  const { cartItems, getCartTotal, getCartItemsCount } = useCart();
  const { wishlistItems, wishlistCount } = useWishlist();
  const { getTotalSavings, rentalBookings } = useRental();

  const [stats] = useState<CustomerStats>({
    totalOrders: 24,
    totalSpent: 28750,
    activeRentals: 3,
    wishlistItems: wishlistCount,
    loyaltyPoints: 1250,
    memberSince: new Date('2024-03-15'),
    totalSavings: getTotalSavings()
  });

  const [recentOrders] = useState<Order[]>([
    {
      id: 2001,
      productName: "Designer Ethnic Saree",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: 'rent',
      amount: 299,
      status: 'delivered',
      date: new Date('2024-12-10'),
      returnDate: new Date('2024-12-17')
    },
    {
      id: 2002,
      productName: "Casual Summer Dress",
      image: "https://images.pexels.com/photos/5710017/pexels-photo-5710017.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: 'buy',
      amount: 1999,
      status: 'shipped',
      date: new Date('2024-12-12')
    },
    {
      id: 2003,
      productName: "Wedding Lehenga Set",
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=300",
      type: 'rent',
      amount: 899,
      status: 'pending',
      date: new Date('2024-12-14'),
      returnDate: new Date('2024-12-21')
    }
  ]);

  const [activeRentals] = useState<Rental[]>([
    {
      id: 1,
      productName: "Designer Ethnic Saree",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      startDate: new Date('2024-12-10'),
      endDate: new Date('2024-12-17'),
      amount: 299,
      status: 'active'
    },
    {
      id: 2,
      productName: "Party Wear Gown",
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=300",
      startDate: new Date('2024-12-08'),
      endDate: new Date('2024-12-15'),
      amount: 599,
      status: 'overdue'
    },
    {
      id: 3,
      productName: "Formal Suit Set",
      image: "https://images.pexels.com/photos/5710017/pexels-photo-5710017.jpeg?auto=compress&cs=tinysrgb&w=300",
      startDate: new Date('2024-12-12'),
      endDate: new Date('2024-12-19'),
      amount: 799,
      status: 'active'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRemainingDays = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <div className="space-y-8">      {/* Header Section with Professional Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="bg-white rounded-lg p-6 border border-gray-200 overflow-hidden relative shadow-sm">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Dashboard</h1>
                    <p className="text-gray-600">Your fashion journey and rental insights</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                <Gift className="h-4 w-4 mr-2" />
                Loyalty Rewards
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="text-gray-600 text-sm">Total Spent</p>
                    <p className="text-xl font-semibold text-gray-900">₹{(stats.totalSpent / 1000).toFixed(1)}K</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="text-gray-600 text-sm">Active Rentals</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.activeRentals}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="text-gray-600 text-sm">Loyalty Points</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.loyaltyPoints}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-50 border border-gray-200 shadow-sm rounded-md p-1">
          <TabsTrigger 
            value="overview"
            className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            My Orders
          </TabsTrigger>
          <TabsTrigger 
            value="rentals"
            className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            Active Rentals
          </TabsTrigger>
          <TabsTrigger 
            value="profile"
            className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            Profile
          </TabsTrigger>
        </TabsList><TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-0 shadow-lg rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Cart Items</p>
                    <p className="text-3xl font-bold text-gray-800">{getCartItemsCount()}</p>
                    <p className="text-sm text-orange-600 font-semibold">₹{getCartTotal()} total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100/50 border-0 shadow-lg rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Wishlist</p>
                    <p className="text-3xl font-bold text-gray-800">{wishlistCount}</p>
                    <p className="text-sm text-pink-600 font-semibold">Saved for later</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-0 shadow-lg rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Member Since</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.memberSince.getFullYear()}</p>
                    <p className="text-sm text-blue-600 font-semibold">Loyal customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:shadow-md transition-all duration-200">
                      <div className="relative">
                        <img 
                          src={order.image} 
                          alt={order.productName}
                          className="w-14 h-14 object-cover rounded-xl shadow-md"
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{order.type === 'rent' ? 'R' : 'B'}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{order.productName}</p>
                        <p className="text-xs text-gray-600">
                          {order.type === 'rent' ? 'Rental' : 'Purchase'} • ₹{order.amount}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.date.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} border-0 rounded-lg px-3 py-1`}>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  Active Rentals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRentals.slice(0, 3).map((rental) => {
                    const remainingDays = getRemainingDays(rental.endDate);
                    return (
                      <div key={rental.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:shadow-md transition-all duration-200">
                        <div className="relative">
                          <img 
                            src={rental.image} 
                            alt={rental.productName}
                            className="w-14 h-14 object-cover rounded-xl shadow-md"
                          />
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                            rental.status === 'overdue' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-green-500 to-green-600'
                          }`}>
                            <Calendar className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">{rental.productName}</p>
                          <p className="text-xs text-gray-600">₹{rental.amount} • {remainingDays} days left</p>
                          <p className="text-xs text-gray-500">
                            Return by {rental.endDate.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(rental.status)} border-0 rounded-lg px-3 py-1`}>
                          {rental.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                    <ShoppingBag className="h-6 w-6" />
                    <span className="font-semibold">Browse Products</span>
                  </Button>
                  <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                    <Calendar className="h-6 w-6" />
                    <span className="font-semibold">Rent Items</span>
                  </Button>
                  <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                    <Heart className="h-6 w-6" />
                    <span className="font-semibold">View Wishlist</span>
                  </Button>
                  <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                    <Gift className="h-6 w-6" />
                    <span className="font-semibold">Redeem Points</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>        <TabsContent value="orders" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img 
                            src={order.image} 
                            alt={order.productName}
                            className="w-20 h-20 object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute -top-2 -right-2 p-1 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                            <span className="text-xs text-white font-bold">{order.type === 'rent' ? 'RENT' : 'BUY'}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-gray-800">{order.productName}</p>
                          <p className="text-sm text-gray-600 font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.type === 'rent' ? 'Rental' : 'Purchase'} • {order.date.toLocaleDateString()}
                          </p>
                          {order.returnDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Return by: {order.returnDate.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-800">₹{order.amount}</p>
                        <Badge className={`${getStatusColor(order.status)} border-0 rounded-lg px-3 py-1 mb-3`}>
                          {order.status}
                        </Badge>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="rounded-lg border-gray-300 hover:bg-gray-50">
                            Track
                          </Button>
                          {order.status === 'delivered' && order.type === 'buy' && (
                            <Button variant="outline" size="sm" className="rounded-lg border-gray-300 hover:bg-gray-50">
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>        <TabsContent value="rentals" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  My Rentals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRentals.map((rental) => {
                    const remainingDays = getRemainingDays(rental.endDate);
                    const isOverdue = remainingDays < 0;
                    
                    return (
                      <div key={rental.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <img 
                              src={rental.image} 
                              alt={rental.productName}
                              className="w-20 h-20 object-cover rounded-xl shadow-md"
                            />
                            <div className={`absolute -top-2 -right-2 p-2 rounded-lg ${
                              isOverdue ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-green-500 to-green-600'
                            }`}>
                              <Calendar className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-lg text-gray-800">{rental.productName}</p>
                            <p className="text-sm text-gray-600 font-medium">
                              {rental.startDate.toLocaleDateString()} - {rental.endDate.toLocaleDateString()}
                            </p>
                            <p className={`text-sm font-semibold ${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                              {isOverdue ? `Overdue by ${Math.abs(remainingDays)} days` : `${remainingDays} days remaining`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-gray-800">₹{rental.amount}</p>
                          <Badge className={`${getStatusColor(rental.status)} border-0 rounded-lg px-3 py-1 mb-3`}>
                            {rental.status}
                          </Badge>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="rounded-lg border-gray-300 hover:bg-gray-50">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Extend
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-lg border-gray-300 hover:bg-gray-50">
                              Return
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <label className="text-sm text-gray-600 font-medium">Full Name</label>
                    <p className="font-semibold text-gray-800 text-lg">John Doe</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <label className="text-sm text-gray-600 font-medium">Email</label>
                    <p className="font-semibold text-gray-800 text-lg">john.doe@example.com</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <label className="text-sm text-gray-600 font-medium">Phone</label>
                    <p className="font-semibold text-gray-800 text-lg">+91 9876543210</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                    <label className="text-sm text-gray-600 font-medium">Member Since</label>
                    <p className="font-semibold text-gray-800 text-lg">{stats.memberSince.toLocaleDateString()}</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-white font-semibold">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  Loyalty & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white shadow-lg">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Award className="h-8 w-8" />
                    </div>
                    <span className="font-bold text-2xl">Gold Member</span>
                  </div>
                  <p className="text-4xl font-bold mb-2">{stats.loyaltyPoints}</p>
                  <p className="text-purple-100 font-semibold">Points Available</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-600">Next Tier: Platinum</span>
                    <span className="text-purple-600">250 points to go</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm transition-all duration-500" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-white font-semibold">
                  Redeem Points
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
