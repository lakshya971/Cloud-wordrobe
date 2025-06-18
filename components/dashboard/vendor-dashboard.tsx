"use client";

import React, { useState } from 'react';
import './dashboard-styles.css';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ShoppingBag,
  Heart,
  MessageSquare,
  Target,
  Award,
  Zap,
  Activity,
  Upload,
  Download,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';

interface VendorStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  avgRating: number;
  totalReviews: number;
  activeRentals: number;
  pendingOrders: number;
  monthlyRevenue: number;
  conversionRate: number;
  returnCustomers: number;
  inventoryValue: number;
  growthRate: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  buyPrice?: number;
  rentPrice?: number;
  status: 'active' | 'inactive' | 'pending';
  views: number;
  sales: number;
  rating: number;
  reviews: number;
  stock: number;
  revenue: number;
}

export function VendorDashboard() {
  const [stats] = useState<VendorStats>({
    totalProducts: 156,
    totalSales: 2847,
    totalRevenue: 856400,
    avgRating: 4.8,
    totalReviews: 1247,
    activeRentals: 89,
    pendingOrders: 23,
    monthlyRevenue: 124500,
    conversionRate: 6.2,
    returnCustomers: 78,
    inventoryValue: 1245000,
    growthRate: 28.5
  });

  const [topProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Designer Ethnic Saree Collection",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Ethnic Wear",
      buyPrice: 4999,
      rentPrice: 899,
      status: 'active',
      views: 2456,
      sales: 89,
      rating: 4.9,
      reviews: 156,
      stock: 12,
      revenue: 89000
    },
    {
      id: 2,
      name: "Wedding Lehenga Premium Set",
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Wedding Collection",
      buyPrice: 12999,
      rentPrice: 1999,
      status: 'active',
      views: 1847,
      sales: 67,
      rating: 4.8,
      reviews: 98,
      stock: 8,
      revenue: 134000
    },
    {
      id: 3,
      name: "Contemporary Fusion Wear",
      image: "https://images.pexels.com/photos/5710017/pexels-photo-5710017.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Western Wear",
      buyPrice: 3999,
      rentPrice: 599,
      status: 'active',
      views: 1234,
      sales: 45,
      rating: 4.7,
      reviews: 67,
      stock: 15,
      revenue: 67000
    }
  ]);  return (
    <div className="dashboard-container">
      <div className="space-y-6 p-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Store className="h-7 w-7 text-gray-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Vendor Dashboard</h1>
                <p className="text-gray-600">
                  Manage your store, products, and track performance
                </p>
              </div>
            </div>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Package className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Products</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.totalProducts}</p>
                    <p className="text-xs text-gray-500">Active listings</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                    <p className="text-xl font-semibold text-gray-900">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500">All time earnings</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Star className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Store Rating</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.avgRating}</p>
                    <p className="text-xs text-gray-500">{stats.totalReviews} reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Growth Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.growthRate}%</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-md p-1">
              <TabsTrigger value="overview" className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900">
                Overview
              </TabsTrigger>
              <TabsTrigger value="products" className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900">
                Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900">
                Orders
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-md text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="h-4 w-4 text-gray-700" />
                    Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="font-medium text-gray-700">{stats.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${stats.conversionRate * 10}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Return Customers</span>
                      <span className="font-medium text-gray-700">{stats.returnCustomers}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${stats.returnCustomers}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-xl font-medium text-gray-800">{stats.totalSales}</p>
                      <p className="text-xs text-gray-600">Total Sales</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-xl font-medium text-gray-800">{stats.activeRentals}</p>
                      <p className="text-xs text-gray-600">Active Rentals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm bg-white">                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="h-4 w-4 text-gray-700" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">New Order Received</p>
                      <p className="text-xs text-gray-500">Wedding Lehenga Set - ₹1,999</p>
                    </div>
                    <span className="text-xs text-gray-400">2m ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Product Viewed</p>
                      <p className="text-xs text-gray-500">Designer Saree - 15 views today</p>
                    </div>
                    <span className="text-xs text-gray-400">15m ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Review Received</p>
                      <p className="text-xs text-gray-500">5-star rating on Fusion Wear</p>
                    </div>
                    <span className="text-xs text-gray-400">1h ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Stock Alert</p>
                      <p className="text-xs text-gray-500">Low stock on 3 products</p>
                    </div>
                    <span className="text-xs text-gray-400">2h ago</span>
                  </div>
                </CardContent>
              </Card>              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Award className="h-4 w-4 text-gray-700" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-md border border-gray-200">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="h-5 w-5 text-gray-700" />
                    </div>
                    <p className="font-medium text-gray-800">Top Rated Vendor</p>
                    <p className="text-xs text-gray-600">Maintained 4.8+ rating</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white border border-gray-200 rounded-md">
                      <p className="text-lg font-medium text-gray-800">156</p>
                      <p className="text-xs text-gray-600">Products</p>
                    </div>
                    <div className="text-center p-3 bg-white border border-gray-200 rounded-md">
                      <p className="text-lg font-medium text-gray-800">2.8K</p>
                      <p className="text-xs text-gray-600">Sales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>            {/* Quick Actions */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="h-4 w-4 text-gray-700" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <Plus className="h-5 w-5 text-gray-700" />
                    <span className="text-sm">Add Product</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <BarChart3 className="h-5 w-5 text-gray-700" />
                    <span className="text-sm">View Analytics</span>
                  </Button>                  <Button variant="outline" className="h-20 flex-col gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                    <span className="text-sm">Messages</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <Upload className="h-5 w-5 text-gray-700" />
                    <span className="text-sm">Bulk Upload</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Top Performing Products
                  </span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {product.views} views
                          </span>
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {product.sales} sales
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">₹{product.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>          {/* Additional Tab Content */}
          <TabsContent value="products" className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    My Products
                  </span>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-white border rounded-xl hover:shadow-md transition-all">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            Buy: ₹{product.buyPrice?.toLocaleString()}
                          </span>
                          <span className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                            Rent: ₹{product.rentPrice}/day
                          </span>
                          <span className="text-sm bg-gray-50 text-gray-700 px-2 py-1 rounded-full">
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-2">
                          {product.status}
                        </Badge>
                        <p className="text-xs text-gray-500">{product.views} views</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-purple-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-green-500" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Order management functionality</p>
                  <p className="text-sm text-gray-500">Track and manage all your orders in one place</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Sales Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-600">Sales Performance Chart</p>
                      <p className="text-sm text-gray-500">Revenue and sales trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                      <span className="text-sm font-medium">Product Views</span>
                      <span className="text-lg font-bold text-blue-600">12.4K</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-lg font-bold text-green-600">{stats.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                      <span className="text-sm font-medium">Return Customers</span>
                      <span className="text-lg font-bold text-purple-600">{stats.returnCustomers}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                      <span className="text-sm font-medium">Inventory Value</span>
                      <span className="text-lg font-bold text-orange-600">₹{(stats.inventoryValue / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
