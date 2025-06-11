"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useRental } from '@/contexts/RentalContext';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  Phone,
  MessageSquare,
  Star,
  RotateCcw,
  Camera,
  Shield,
  HeartHandshake
} from 'lucide-react';

interface RentalStatusStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: Date;
  estimatedTime?: string;
  details?: string[];
}

interface DeliveryInfo {
  driverName: string;
  driverPhone: string;
  driverRating: number;
  vehicleNumber: string;
  estimatedArrival: Date;
  currentLocation: string;
}

interface RentalStatusTrackerProps {
  bookingId: string;
}

export function RentalStatusTracker({ bookingId }: RentalStatusTrackerProps) {
  const { rentalBookings } = useRental();
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [trackingSteps, setTrackingSteps] = useState<RentalStatusStep[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Find the booking by ID
    const booking = rentalBookings.find(b => b.id === bookingId);
    if (booking) {
      setActiveBooking(booking);
      generateTrackingSteps(booking);
      generateDeliveryInfo(booking);
    }
  }, [bookingId, rentalBookings]);

  const generateTrackingSteps = (booking: any) => {
    const now = new Date();
    const bookingDate = booking.bookingDate;
    const startDate = booking.startDate;
    const endDate = booking.endDate;
    
    // Calculate delivery date (1 day before start)
    const deliveryDate = new Date(startDate);
    deliveryDate.setDate(deliveryDate.getDate() - 1);
    
    // Calculate pickup date (1 day after end)
    const pickupDate = new Date(endDate);
    pickupDate.setDate(pickupDate.getDate() + 1);

    const steps: RentalStatusStep[] = [
      {
        id: 'booking-confirmed',
        title: 'Booking Confirmed',
        description: 'Your rental request has been confirmed',
        status: 'completed',
        timestamp: bookingDate,
        details: [
          `Booking ID: ${booking.id.slice(-8)}`,
          `Security deposit: ₹${booking.securityDeposit.toLocaleString()}`,
          'Confirmation email sent'
        ]
      },
      {
        id: 'preparing',
        title: 'Preparing Your Order',
        description: 'Quality check and packaging in progress',
        status: now > bookingDate ? 'completed' : 'pending',
        timestamp: now > bookingDate ? new Date(bookingDate.getTime() + 2 * 60 * 60 * 1000) : undefined,
        estimatedTime: '2-4 hours',
        details: [
          'Professional cleaning and steaming',
          'Quality inspection completed',
          'Protective packaging applied'
        ]
      },
      {
        id: 'ready-for-delivery',
        title: 'Ready for Delivery',
        description: 'Your outfit is ready and assigned to delivery partner',
        status: now >= deliveryDate ? 'completed' : now > bookingDate ? 'current' : 'pending',
        timestamp: now >= deliveryDate ? deliveryDate : undefined,
        estimatedTime: 'By end of day',
        details: [
          'Delivery partner assigned',
          'Real-time tracking available',
          'SMS notifications enabled'
        ]
      },
      {
        id: 'out-for-delivery',
        title: 'Out for Delivery',
        description: 'Your order is on the way',
        status: now >= deliveryDate && now < startDate ? 'current' : now >= startDate ? 'completed' : 'pending',
        timestamp: now >= deliveryDate ? deliveryDate : undefined,
        estimatedTime: '2-4 hours',
        details: [
          'Live GPS tracking',
          'Contact driver directly',
          'Contactless delivery available'
        ]
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Outfit delivered successfully',
        status: now >= startDate ? 'completed' : 'pending',
        timestamp: now >= startDate ? startDate : undefined,
        details: [
          'Try immediately and report any issues',
          'Care instructions included',
          'Enjoy your rental period'
        ]
      },
      {
        id: 'pickup-scheduled',
        title: 'Pickup Scheduled',
        description: 'Return pickup has been scheduled',
        status: now >= endDate ? 'current' : 'pending',
        estimatedTime: 'Next day after rental ends',
        details: [
          'Automatic pickup scheduling',
          'Flexible pickup time slots',
          'SMS reminder sent'
        ]
      },
      {
        id: 'returned',
        title: 'Returned',
        description: 'Item successfully returned',
        status: now > pickupDate ? 'completed' : 'pending',
        timestamp: now > pickupDate ? pickupDate : undefined,
        details: [
          'Quality inspection completed',
          'Security deposit refunded',
          'Thank you for choosing us!'
        ]
      }
    ];

    setTrackingSteps(steps);
  };

  const generateDeliveryInfo = (booking: any) => {
    // Mock delivery partner info
    const info: DeliveryInfo = {
      driverName: 'Rajesh Kumar',
      driverPhone: '+91 98765 43210',
      driverRating: 4.8,
      vehicleNumber: 'DL 01 AB 1234',
      estimatedArrival: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      currentLocation: 'Fashion District, Mumbai'
    };
    
    setDeliveryInfo(info);
  };

  const getStepIcon = (step: RentalStatusStep) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (step.status === 'current') {
      return <div className="h-5 w-5 bg-orange-500 rounded-full animate-pulse" />;
    } else {
      return <div className="h-5 w-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'current': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'pending': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const currentStep = trackingSteps.find(step => step.status === 'current');
  const completedSteps = trackingSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / trackingSteps.length) * 100;

  if (!activeBooking) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Booking not found or still loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-50 to-purple-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Rental Status</h2>
              <p className="text-sm text-gray-600">{activeBooking.productName}</p>
            </div>
            <Badge className={`${getStatusColor(activeBooking.status)} border`}>
              {activeBooking.status.charAt(0).toUpperCase() + activeBooking.status.slice(1)}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      {currentStep && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900">{currentStep.title}</h3>
                  <p className="text-sm text-orange-700">{currentStep.description}</p>
                  {currentStep.estimatedTime && (
                    <p className="text-xs text-orange-600 mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      ETA: {currentStep.estimatedTime}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Delivery Tracking */}
          {(currentStep.id === 'out-for-delivery' || currentStep.id === 'ready-for-delivery') && deliveryInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  Live Delivery Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <HeartHandshake className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{deliveryInfo.driverName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{deliveryInfo.driverRating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Currently at: {deliveryInfo.currentLocation}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>ETA: {deliveryInfo.estimatedArrival.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Driver
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Vehicle: {deliveryInfo.vehicleNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}

      {/* Detailed Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detailed Timeline</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  {getStepIcon(step)}
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${
                      step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{step.title}</h4>
                    {step.timestamp && (
                      <span className="text-xs text-gray-500">
                        {step.timestamp.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  
                  {step.estimatedTime && step.status === 'pending' && (
                    <p className="text-xs text-orange-600">
                      Estimated time: {step.estimatedTime}
                    </p>
                  )}
                  
                  <AnimatePresence>
                    {showDetails && step.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <ul className="text-xs text-gray-500 space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3">
              <Camera className="h-4 w-4" />
              <span className="text-xs">Report Issue</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Extend Rental</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3">
              <RotateCcw className="h-4 w-4" />
              <span className="text-xs">Easy Return</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-3">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Insurance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <HeartHandshake className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">Need Help?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Our support team is here to help with any questions or concerns.
              </p>
              <div className="flex gap-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Chat Support
                </Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  <Phone className="h-3 w-3 mr-1" />
                  Call Us
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
