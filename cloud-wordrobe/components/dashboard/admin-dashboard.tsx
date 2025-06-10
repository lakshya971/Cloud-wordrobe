"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Users, 
  Store, 
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
  BarChart3,
  Settings,
  UserCheck,
  UserX,
  ShoppingBag,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MessageSquare,
  CreditCard,
  Activity,
  Target,
  Globe,
  Zap,
  Award,
  Filter,
  Download,
  Upload,
  RefreshCw,
  PieChart,
  LineChart
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalRevenue: number;
  pendingVendors: number;
  activeOrders: number;
  monthlyGrowth: number;
  platformFee: number;
  conversionRate: number;
  avgOrderValue: number;
  customerSatisfaction: number;
  systemUptime: number;
}

interface AnalyticsData {
  period: string;
  users: number;
  revenue: number;
  orders: number;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  storage: number;
  apiCalls: number;
}

interface Vendor {
  id: number;
  name: string;
  email: string;
  storeName: string;
  status: 'pending' | 'approved' | 'rejected';
  joinDate: Date;
  products: number;
  revenue: number;
  rating: number;
}

interface Product {
  id: number;
  name: string;
  vendor: string;
  category: string;
  price: number;
  status: 'active' | 'pending' | 'rejected';
  views: number;
  sales: number;
}

export function AdminDashboard() {
  const [stats] = useState<AdminStats>({
    totalUsers: 15847,
    totalVendors: 324,
    totalProducts: 8562,
    totalRevenue: 2850000,
    pendingVendors: 23,
    activeOrders: 156,
    monthlyGrowth: 23.8,
    platformFee: 285000,
    conversionRate: 3.24,
    avgOrderValue: 2850,
    customerSatisfaction: 4.7,
    systemUptime: 99.9
  });

  const [analyticsData] = useState<AnalyticsData[]>([
    { period: 'Jan', users: 1200, revenue: 180000, orders: 340 },
    { period: 'Feb', users: 1350, revenue: 220000, orders: 410 },
    { period: 'Mar', users: 1580, revenue: 285000, orders: 520 },
    { period: 'Apr', users: 1750, revenue: 315000, orders: 640 },
    { period: 'May', users: 1920, revenue: 380000, orders: 750 },
    { period: 'Jun', users: 2150, revenue: 450000, orders: 890 }
  ]);

  const [systemMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    storage: 78,
    apiCalls: 12456
  });

  const [pendingVendors] = useState<Vendor[]>([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@fashionhub.com",
      storeName: "Fashion Hub Store",
      status: 'pending',
      joinDate: new Date('2024-12-01'),
      products: 0,
      revenue: 0,
      rating: 0
    },
    {
      id: 2,
      name: "Anita Sharma",
      email: "anita@example.com",
      storeName: "Elegant Collection",
      status: 'pending',
      joinDate: new Date('2024-12-08'),
      products: 0,
      revenue: 0,
      rating: 0
    }
  ]);

  const [recentProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Designer Ethnic Saree",
      vendor: "Fashion Hub",
      category: "Ethnic Wear",
      price: 4999,
      status: 'pending',
      views: 245,
      sales: 0
    },
    {
      id: 2,
      name: "Premium Lehenga Set",
      vendor: "Bridal Dreams",
      category: "Ethnic Wear",
      price: 8999,
      status: 'pending',
      views: 189,
      sales: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleVendorAction = (vendorId: number, action: 'approve' | 'reject') => {
    console.log(`${action} vendor ${vendorId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header Section with Material-UI Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white overflow-hidden relative shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-blue-100">Complete platform overview and management</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-200" />
                  <div>
                    <p className="text-blue-100 text-sm">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-purple-200" />
                  <div>
                    <p className="text-purple-100 text-sm">Active Vendors</p>
                    <p className="text-2xl font-bold">{stats.totalVendors}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-200" />
                  <div>
                    <p className="text-green-100 text-sm">Monthly Revenue</p>
                    <p className="text-2xl font-bold">₹{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-orange-200" />
                  <div>
                    <p className="text-orange-100 text-sm">Growth Rate</p>
                    <p className="text-2xl font-bold">+{stats.monthlyGrowth}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
          <TabsTrigger 
            value="overview"
            className="rounded-xl text-gray-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="rounded-xl text-gray-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            Users
          </TabsTrigger>
          <TabsTrigger 
            value="vendors"
            className="rounded-xl text-gray-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            Vendors
          </TabsTrigger>
          <TabsTrigger 
            value="products"
            className="rounded-xl text-gray-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            Products
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="rounded-xl text-gray-600 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
          >
            Analytics
          </TabsTrigger>
        </TabsList>        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-0 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Total Products</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalProducts.toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-0 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Platform Fee</p>
                    <p className="text-3xl font-bold text-gray-800">₹{(stats.platformFee / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-0 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.conversionRate}%</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-0 shadow-xl rounded-2xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Satisfaction</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.customerSatisfaction}/5</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chart Component Placeholder</p>
                    <p className="text-sm text-gray-500">Revenue trend over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-500" />
                  User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chart Component Placeholder</p>
                    <p className="text-sm text-gray-500">Customer vs Vendor ratio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>{systemMetrics.cpu}%</span>
                  </div>
                  <Progress value={systemMetrics.cpu} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory</span>
                    <span>{systemMetrics.memory}%</span>
                  </div>
                  <Progress value={systemMetrics.memory} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{systemMetrics.storage}%</span>
                  </div>
                  <Progress value={systemMetrics.storage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uptime</span>
                    <span>{stats.systemUptime}%</span>
                  </div>
                  <Progress value={stats.systemUptime} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Pending Vendor Approvals
                <Badge variant="secondary">{pendingVendors.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Store className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">{vendor.storeName}</p>
                        <p className="text-xs text-gray-500">{vendor.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(vendor.status)}>
                        {vendor.status}
                      </Badge>
                      <Button size="sm" onClick={() => handleVendorAction(vendor.id, 'approve')}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleVendorAction(vendor.id, 'reject')}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                Recent Product Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">by {product.vendor}</p>
                        <p className="text-sm text-gray-500">{product.category} • ₹{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-600">Growth Analytics</p>
                    <p className="text-sm text-gray-500">User acquisition and retention metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle>Revenue Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                  <div className="text-center">
                    <DollarSign className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue Analytics</p>
                    <p className="text-sm text-gray-500">Income streams and profitability</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
