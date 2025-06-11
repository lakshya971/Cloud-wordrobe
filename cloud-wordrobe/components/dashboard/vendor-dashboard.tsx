"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
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
  Search,
  X,
  Camera,
  FileText,
  Send,
  Trash2,
  Reply,
  Archive
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

  // State for modals and functionality
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState({
    addProduct: false,
    analytics: false,
    messages: false,
    bulkUpload: false
  });

  // Toast for notifications
  const { toast } = useToast();

  // Form state for Add Product Modal
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    buyPrice: '',
    rentPrice: '',
    stock: '',
    images: [] as File[],
    brand: '',
    material: '',
    size: '',
    color: '',
    occasion: ''
  });

  // State for messages
  const [messages] = useState([
    {
      id: 1,
      type: 'inquiry',
      from: 'Priya Sharma',
      avatar: 'PS',
      subject: 'Product Inquiry - Designer Saree',
      message: 'Hi, I would like to know more about the fabric and washing instructions for the designer saree.',
      time: '2 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 2,
      type: 'order',
      from: 'Rahul Kumar',
      avatar: 'RK',
      subject: 'Order Issue - Wedding Lehenga',
      message: 'There seems to be a small stain on the lehenga I received. Could you please help with this?',
      time: '4 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: 3,
      type: 'review',
      from: 'Anjali Patel',
      avatar: 'AP',
      subject: 'Review Request',
      message: 'I loved the fusion wear! The quality was excellent. Would definitely rent again.',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);

  // Analytics data
  const [analyticsData] = useState({
    weeklyViews: [
      { day: 'Mon', views: 1200, sales: 15 },
      { day: 'Tue', views: 1500, sales: 22 },
      { day: 'Wed', views: 1800, sales: 18 },
      { day: 'Thu', views: 2100, sales: 25 },
      { day: 'Fri', views: 2400, sales: 32 },
      { day: 'Sat', views: 2800, sales: 45 },
      { day: 'Sun', views: 2200, sales: 38 }
    ],
    topCategories: [
      { name: 'Wedding Collection', percentage: 35, revenue: 285000 },
      { name: 'Ethnic Wear', percentage: 28, revenue: 198000 },
      { name: 'Western Wear', percentage: 22, revenue: 145000 },
      { name: 'Fusion Wear', percentage: 15, revenue: 89000 }
    ],
    recentActivities: [
      { action: 'Product viewed', product: 'Designer Saree', count: 45, time: '1 hour ago' },
      { action: 'Order placed', product: 'Wedding Lehenga', count: 3, time: '2 hours ago' },
      { action: 'Review received', product: 'Fusion Dress', count: 2, time: '3 hours ago' }
    ]
  });  // Quick Action Handlers
  const handleAddProduct = () => {
    setIsLoading(prev => ({ ...prev, addProduct: true }));
    setTimeout(() => {
      setShowAddProductModal(true);
      setIsLoading(prev => ({ ...prev, addProduct: false }));
    }, 500);
  };

  const handleViewAnalytics = () => {
    setIsLoading(prev => ({ ...prev, analytics: true }));
    setTimeout(() => {
      setShowAnalyticsModal(true);
      setIsLoading(prev => ({ ...prev, analytics: false }));
    }, 500);
  };

  const handleMessages = () => {
    setIsLoading(prev => ({ ...prev, messages: true }));
    setTimeout(() => {
      setShowMessagesModal(true);
      setIsLoading(prev => ({ ...prev, messages: false }));
    }, 500);
  };

  const handleBulkUpload = () => {
    setIsLoading(prev => ({ ...prev, bulkUpload: true }));
    setTimeout(() => {
      setShowBulkUploadModal(true);
      setIsLoading(prev => ({ ...prev, bulkUpload: false }));
    }, 500);
  };

  // Form handlers
  const handleProductFormChange = (field: string, value: string | File[]) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProductSubmit = () => {
    if (!productForm.name || !productForm.category || !productForm.buyPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, addProduct: true }));

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Product added successfully to your inventory",
      });
      setShowAddProductModal(false);
      setProductForm({
        name: '',
        description: '',
        category: '',
        buyPrice: '',
        rentPrice: '',
        stock: '',
        images: [],
        brand: '',
        material: '',
        size: '',
        color: '',
        occasion: ''
      });
      setIsLoading(prev => ({ ...prev, addProduct: false }));
    }, 1000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleProductFormChange('images', [...productForm.images, ...files]);
  };

  const removeImage = (index: number) => {
    const newImages = productForm.images.filter((_, i) => i !== index);
    handleProductFormChange('images', newImages);
  };

  const handleBulkUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(prev => ({ ...prev, bulkUpload: true }));
      // Simulate bulk upload processing
      toast({
        title: "Processing...",
        description: "Your bulk upload is being processed. This may take a few minutes.",
      });
      
      setTimeout(() => {
        toast({
          title: "Bulk Upload Complete!",
          description: `Successfully processed ${Math.floor(Math.random() * 50) + 10} products from your CSV file.`,
        });
        setShowBulkUploadModal(false);
        setIsLoading(prev => ({ ...prev, bulkUpload: false }));
      }, 3000);
    }
  };

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
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                <Store className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Vendor Dashboard</h1>
                <p className="text-gray-600 text-lg">
                  Manage your store, products, and track performance
                </p>
              </div>
            </div>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                    <p className="text-xs text-blue-600 font-medium">Active listings</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 rounded-xl">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-emerald-600 font-medium">All time earnings</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500 rounded-xl">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Store Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                    <p className="text-xs text-amber-600 font-medium">{stats.totalReviews} reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.growthRate}%</p>
                    <p className="text-xs text-purple-600 font-medium">This month</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-xl p-1">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="products" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Products
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Orders
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-blue-500" />
                    Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="font-semibold text-blue-600">{stats.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{ width: `${stats.conversionRate * 10}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Return Customers</span>
                      <span className="font-semibold text-emerald-600">{stats.returnCustomers}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full" style={{ width: `${stats.returnCustomers}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-600">{stats.totalSales}</p>
                      <p className="text-xs text-gray-600">Total Sales</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-xl">
                      <p className="text-2xl font-bold text-purple-600">{stats.activeRentals}</p>
                      <p className="text-xs text-gray-600">Active Rentals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5 text-green-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">New Order Received</p>
                      <p className="text-xs text-gray-500">Wedding Lehenga Set - ₹1,999</p>
                    </div>
                    <span className="text-xs text-gray-400">2m ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Product Viewed</p>
                      <p className="text-xs text-gray-500">Designer Saree - 15 views today</p>
                    </div>
                    <span className="text-xs text-gray-400">15m ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Review Received</p>
                      <p className="text-xs text-gray-500">5-star rating on Fusion Wear</p>
                    </div>
                    <span className="text-xs text-gray-400">1h ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Stock Alert</p>
                      <p className="text-xs text-gray-500">Low stock on 3 products</p>
                    </div>
                    <span className="text-xs text-gray-400">2h ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-purple-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-semibold text-gray-800">Top Rated Vendor</p>
                    <p className="text-xs text-gray-600">Maintained 4.8+ rating</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-xl font-bold text-blue-600">156</p>
                      <p className="text-xs text-gray-600">Products</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <p className="text-xl font-bold text-green-600">2.8K</p>
                      <p className="text-xs text-gray-600">Sales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-2 hover:border-blue-300 hover:bg-blue-50"
                    onClick={handleAddProduct}
                    disabled={isLoading.addProduct}
                  >
                    {isLoading.addProduct ? (
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Plus className="h-6 w-6 text-blue-500" />
                    )}
                    <span className="text-sm">Add Product</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-2 hover:border-green-300 hover:bg-green-50"
                    onClick={handleViewAnalytics}
                    disabled={isLoading.analytics}
                  >
                    {isLoading.analytics ? (
                      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    )}
                    <span className="text-sm">View Analytics</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-2 hover:border-purple-300 hover:bg-purple-50"
                    onClick={handleMessages}
                    disabled={isLoading.messages}
                  >
                    {isLoading.messages ? (
                      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <MessageSquare className="h-6 w-6 text-purple-500" />
                    )}
                    <span className="text-sm">Messages</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-2 hover:border-orange-300 hover:bg-orange-50"
                    onClick={handleBulkUpload}
                    disabled={isLoading.bulkUpload}
                  >
                    {isLoading.bulkUpload ? (
                      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="h-6 w-6 text-orange-500" />
                    )}
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

      {/* Add Product Modal */}
      <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-500" />
              Add New Product
            </DialogTitle>
            <DialogDescription>
              Add a new product to your inventory. Fill in all the required details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Designer Wedding Lehenga"
                    value={productForm.name}
                    onChange={(e) => handleProductFormChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={productForm.category} onValueChange={(value) => handleProductFormChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding Collection</SelectItem>
                      <SelectItem value="ethnic">Ethnic Wear</SelectItem>
                      <SelectItem value="western">Western Wear</SelectItem>
                      <SelectItem value="fusion">Fusion Wear</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Sabyasachi"
                    value={productForm.brand}
                    onChange={(e) => handleProductFormChange('brand', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    placeholder="e.g., Silk, Cotton, Chiffon"
                    value={productForm.material}
                    onChange={(e) => handleProductFormChange('material', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product in detail..."
                  value={productForm.description}
                  onChange={(e) => handleProductFormChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing & Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyPrice">Buy Price (₹) *</Label>
                  <Input
                    id="buyPrice"
                    type="number"
                    placeholder="0"
                    value={productForm.buyPrice}
                    onChange={(e) => handleProductFormChange('buyPrice', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentPrice">Rent Price (₹/day)</Label>
                  <Input
                    id="rentPrice"
                    type="number"
                    placeholder="0"
                    value={productForm.rentPrice}
                    onChange={(e) => handleProductFormChange('rentPrice', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={productForm.stock}
                    onChange={(e) => handleProductFormChange('stock', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select value={productForm.size} onValueChange={(value) => handleProductFormChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Red, Blue, Multicolor"
                    value={productForm.color}
                    onChange={(e) => handleProductFormChange('color', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion</Label>
                  <Select value={productForm.occasion} onValueChange={(value) => handleProductFormChange('occasion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="party">Party</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="traditional">Traditional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Images</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Upload Images
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="text-sm text-gray-500">
                    Upload up to 5 images (JPG, PNG)
                  </span>
                </div>
                
                {productForm.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {productForm.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAddProductModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProductSubmit} className="bg-blue-600 hover:bg-blue-700">
                Add Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Modal */}
      <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Analytics Dashboard
            </DialogTitle>
            <DialogDescription>
              Detailed analytics and insights for your store performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Eye className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">12.4K</p>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-xs text-green-600">+15% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <ShoppingBag className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">195</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xs text-green-600">+8% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">6.2%</p>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-xs text-green-600">+2.1% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">₹1.24L</p>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-xs text-green-600">+28% this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.weeklyViews.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 text-center font-semibold">{day.day}</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600">Views: {day.views}</span>
                            <span className="text-sm text-gray-600">Sales: {day.sales}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(day.views / 3000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCategories.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm font-semibold">₹{(category.revenue / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{category.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.product} - {activity.count} times</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Messages Modal */}
      <Dialog open={showMessagesModal} onOpenChange={setShowMessagesModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              Customer Messages
            </DialogTitle>
            <DialogDescription>
              Manage customer inquiries, orders, and reviews
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Message Filters */}
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">All Messages</Badge>
              <Badge variant="outline">Inquiries</Badge>
              <Badge variant="outline">Order Issues</Badge>
              <Badge variant="outline">Reviews</Badge>
              <Badge variant="outline">Unread</Badge>
            </div>

            {/* Messages List */}
            <div className="space-y-3">
              {messages.map((message) => (
                <Card key={message.id} className={`${!message.read ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {message.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{message.from}</h4>
                            <Badge 
                              className={`text-xs ${
                                message.priority === 'high' ? 'bg-red-100 text-red-700' :
                                message.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {message.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <h5 className="font-medium text-sm mb-2">{message.subject}</h5>
                        <p className="text-sm text-gray-600 mb-3">{message.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Archive className="h-3 w-3 mr-1" />
                            Archive
                          </Button>
                          {message.type === 'order' && (
                            <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Reply Section */}
            <Card className="border-dashed">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Quick Reply</h4>
                <div className="space-y-3">
                  <Textarea placeholder="Type your message here..." rows={3} />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Template
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Attach
                      </Button>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>      {/* Bulk Upload Modal */}
      <Dialog open={showBulkUploadModal} onOpenChange={setShowBulkUploadModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-orange-500" />
              Bulk Upload Products
            </DialogTitle>
            <DialogDescription>
              Upload multiple products at once using CSV or Excel file
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 overflow-y-auto flex-1 pr-2">
            {/* Upload Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 text-blue-800">Instructions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Download our sample CSV template to get started</li>
                  <li>• Ensure all required fields are filled: Name, Category, Buy Price</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Supported formats: CSV, Excel (.xlsx)</li>
                  <li>• Maximum 500 products per upload</li>
                </ul>
              </CardContent>
            </Card>

            {/* Download Template */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-semibold">CSV Template</h4>
                  <p className="text-sm text-gray-600">Download the sample template</p>
                </div>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Upload your CSV/Excel file</h4>
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById('bulk-upload')?.click()}
              >
                Choose File
              </Button>
              <input
                id="bulk-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={handleBulkUploadFile}
              />
            </div>

            {/* Upload Status */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">No file selected</span>
                  </div>
                  <Button variant="ghost" size="sm" disabled>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Process
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample Data Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sample Data Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name*</th>
                        <th className="text-left p-2">Category*</th>
                        <th className="text-left p-2">Buy Price*</th>
                        <th className="text-left p-2">Rent Price</th>
                        <th className="text-left p-2">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Designer Saree</td>
                        <td className="p-2">ethnic</td>
                        <td className="p-2">5999</td>
                        <td className="p-2">899</td>
                        <td className="p-2">10</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Wedding Lehenga</td>
                        <td className="p-2">wedding</td>
                        <td className="p-2">15999</td>
                        <td className="p-2">2499</td>                        <td className="p-2">5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
