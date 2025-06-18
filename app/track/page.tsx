"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { OrderTrackingFixed, SimpleOrderTracking } from '@/components/shipping';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  Shield, 
  Clock,
  ArrowLeft,
  Globe,
  Award,
  Users
} from 'lucide-react';

export default function TrackingPage() {  const searchParams = useSearchParams();
  const trackingNumber = searchParams ? searchParams.get('tracking') : null;
  const orderId = searchParams ? searchParams.get('order') : null;
  
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load recent orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    setRecentOrders(orders.slice(0, 3)); // Show last 3 orders
  }, []);

  const stats = [
    {
      icon: Package,
      label: 'Orders Shipped Today',
      value: '1,247',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Truck,
      label: 'Average Delivery Time',
      value: '2.3 days',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Shield,
      label: 'Delivery Success Rate',
      value: '99.2%',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Users,
      label: 'Happy Customers',
      value: '50,000+',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: 'Real-time Tracking',
      description: 'Get live updates on your order status with GPS tracking'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across India within 1-3 days'
    },
    {
      icon: Shield,
      title: 'Secure Handling',
      description: 'Your orders are handled with care and delivered safely'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Premium packaging and professional handling guaranteed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Tracking Section */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >              <OrderTrackingFixed 
                trackingNumber={trackingNumber || undefined} 
                orderId={orderId || undefined}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Recent Orders */}
            {recentOrders.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentOrders.map((order, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-gray-50 cursor-pointer border"
                      onClick={() => {
                        window.location.href = `/track?order=${order.id}`;
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Order #{order.id}</div>
                          <div className="text-sm text-gray-500">{order.status}</div>
                        </div>
                      </div>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Today's Deliveries</span>
                    </div>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span className="text-sm">On Time</span>
                    </div>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Safety Rate</span>
                    </div>
                    <span className="font-medium">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
