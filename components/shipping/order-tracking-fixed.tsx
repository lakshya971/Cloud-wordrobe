"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  Phone,
  MessageSquare,
  Calendar,
  Star,
  RefreshCw,
  Globe,
  ExternalLink,
  Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackingEvent {
  timestamp: Date;
  status: string;
  description: string;
  location?: string;
  isCompleted: boolean;
  estimatedDelivery?: Date;
}

interface ShippingDetails {
  orderId: string;
  trackingNumber: string;
  provider: string;
  status: string;
  estimatedDelivery: Date;
  currentLocation?: string;
  events: TrackingEvent[];
}

interface OrderTrackingProps {
  orderId?: string;
  trackingNumber?: string;
  className?: string;
}

export function OrderTracking({ orderId, trackingNumber, className }: OrderTrackingProps) {
  const [trackingInput, setTrackingInput] = useState(trackingNumber || '');
  const [trackingData, setTrackingData] = useState<ShippingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Auto-refresh tracking data every 30 seconds if there's active tracking
  useEffect(() => {
    if (!trackingData?.trackingNumber) return;

    const interval = setInterval(() => {
      refreshTracking();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [trackingData?.trackingNumber]);

  useEffect(() => {
    if (trackingNumber) {
      handleTrackOrder();
    }
  }, [trackingNumber]);

  const handleTrackOrder = async () => {
    if (!trackingInput.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowDetails(true); // Always show details when tracking is initiated

    try {
      const response = await fetch(`/api/shipping/track/${trackingInput}`);
      const result = await response.json();

      if (result.success) {
        setTrackingData(result.data);
        setLastUpdated(new Date());
        console.log('Tracking information found:', result.data.status);
      } else {
        throw new Error(result.error || 'Failed to fetch tracking information');
      }
    } catch (error: any) {
      setError(error.message);
      console.error('Tracking failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTracking = async () => {
    if (!trackingData?.trackingNumber) return;
    
    try {
      const response = await fetch(`/api/shipping/track/${trackingData.trackingNumber}`);
      const result = await response.json();

      if (result.success) {
        setTrackingData(result.data);
        setLastUpdated(new Date());
        console.log('Tracking information updated:', result.data.status);
      }
    } catch (error) {
      console.error('Failed to refresh tracking:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'in transit':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'out for delivery':
        return <MapPin className="h-5 w-5 text-red-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <div className="h-5 w-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'out for delivery':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'in transit':
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const calculateProgress = (events: TrackingEvent[]) => {
    const completedEvents = events.filter(event => event.isCompleted).length;
    return (completedEvents / events.length) * 100;
  };

  const copyTrackingNumber = () => {
    if (trackingData?.trackingNumber) {
      navigator.clipboard.writeText(trackingData.trackingNumber);
      console.log('Tracking number copied successfully');
    }
  };

  const openProviderTracking = () => {
    if (trackingData?.trackingNumber) {
      // This would use the shipping service to get the actual URL
      const url = `https://www.google.com/search?q=${trackingData.provider}+track+${trackingData.trackingNumber}`;
      window.open(url, '_blank');
    }
  };

  // Quick tracking tips
  const trackingTips = [
    { icon: Package, text: "Enter your order ID or tracking number" },
    { icon: Clock, text: "Real-time updates every 30 seconds" },
    { icon: Globe, text: "Track across multiple carriers" }
  ];

  // Sample carriers we support
  const supportedCarriers = [
    "FedEx", "DHL", "Blue Dart", "DTDC", "Delhivery"
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-4", className)}>
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Track Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3">
            {/* Search Bar */}
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter tracking number or order ID"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleTrackOrder}
                disabled={isLoading}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <motion.div
                    className="animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </motion.div>
                ) : (
                  "Track"
                )}
              </Button>
            </div>

            {/* Tracking Tips */}
            {!showDetails && !error && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                {trackingTips.map((tip, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                    <tip.icon className="h-4 w-4 text-gray-500" />
                    <span>{tip.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Supported Carriers */}
            {!showDetails && !error && (
              <div className="mt-2">
                <div className="text-sm text-gray-500 mb-1">Supported Carriers:</div>
                <div className="flex flex-wrap gap-2">
                  {supportedCarriers.map((carrier, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {carrier}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mt-2">
                {error}
              </div>
            )}

            {/* Tracking Details - only show when there's data */}
            <AnimatePresence>
              {showDetails && trackingData && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 border-t pt-4 mt-4"
                >
                  {/* Last Updated */}
                  {lastUpdated && (
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                  )}

                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Order ID</div>
                      <div className="font-semibold">{trackingData.orderId}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Tracking Number</div>
                      <div className="font-semibold flex items-center">
                        {trackingData.trackingNumber}
                        <button 
                          onClick={copyTrackingNumber} 
                          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Estimated Delivery</div>
                      <div className="font-semibold">
                        {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Status and Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(trackingData.status)}
                        <span className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium border",
                          getStatusColor(trackingData.status)
                        )}>
                          {trackingData.status}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openProviderTracking}
                        className="flex items-center space-x-1"
                      >
                        <Globe className="h-4 w-4" />
                        <span>View on {trackingData.provider}</span>
                      </Button>
                    </div>
                    <Progress value={calculateProgress(trackingData.events)} className="h-2" />
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    {trackingData.events.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg">
                        <div className={cn(
                          "mt-1 h-3 w-3 rounded-full",
                          event.isCompleted ? "bg-green-500" : "bg-gray-300"
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{event.status}</div>
                          <div className="text-sm text-gray-600">{event.description}</div>
                          <div className="text-sm text-gray-400">
                            {new Date(event.timestamp).toLocaleString()}
                            {event.location && ` • ${event.location}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
