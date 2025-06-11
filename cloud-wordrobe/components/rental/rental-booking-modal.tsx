"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRental } from '@/contexts/RentalContext';
import { RentalDatePicker } from './rental-date-picker';
import { RentalRecommendations } from './rental-recommendations';
import { 
  Calendar, 
  Clock, 
  Shield, 
  Star, 
  Award, 
  Zap, 
  Truck, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  image: string;
  buyPrice: number;
  rentPrice: number;
  rating: number;
  reviews: number;
  vendor: string;
  location: string;
  category: string;
  brand?: string;
  description?: string;
}

interface RentalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function RentalBookingModal({ isOpen, onClose, product }: RentalBookingModalProps) {
  const { 
    userProfile, 
    currentDraft, 
    createBooking, 
    clearDraft,
    getLoyaltyProgress,
    getTotalSavings 
  } = useRental();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  const totalSteps = 3;
  const loyaltyProgress = getLoyaltyProgress();
  const totalSavings = getTotalSavings();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setBookingConfirmed(false);
      setConfirmationId(null);
      clearDraft();
    }
  }, [isOpen, clearDraft]);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    if (product && currentDraft) {
      const bookingId = createBooking(product.id, product.name);
      if (bookingId) {
        setConfirmationId(bookingId);
        setBookingConfirmed(true);
      }
    }
  };

  const handleClose = () => {
    clearDraft();
    onClose();
  };

  const getLoyaltyBadgeColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-500';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      default: return 'bg-orange-500';
    }
  };

  const getStepIcon = (step: number, current: number) => {
    if (step < current) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (step === current) return <div className="h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{step}</div>;
    return <div className="h-5 w-5 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">{step}</div>;
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-orange-500" />
            Rent {product.name}
            <Badge className={`${getLoyaltyBadgeColor(userProfile.loyaltyTier)} text-white`}>
              {userProfile.loyaltyTier.toUpperCase()} MEMBER
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  {getStepIcon(step, currentStep)}
                  <span className="text-xs mt-1 font-medium">
                    {step === 1 ? 'Select Dates' : step === 2 ? 'Review & Pay' : 'Confirmation'}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-20 h-0.5 mx-4 ${step < currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>

          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />

          <AnimatePresence mode="wait">
            {/* Step 1: Date Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Info */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">by {product.vendor}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge variant="secondary">{product.location}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Benefits */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-500" />
                        Your Benefits
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Loyalty Tier:</span>
                          <Badge className={`${getLoyaltyBadgeColor(userProfile.loyaltyTier)} text-white text-xs`}>
                            {userProfile.loyaltyTier}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Savings:</span>
                          <span className="font-semibold text-green-600">₹{totalSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Next Tier Progress:</span>
                          <span className="text-xs">
                            {loyaltyProgress.current}/{loyaltyProgress.required} rentals
                          </span>
                        </div>
                        <Progress 
                          value={(loyaltyProgress.current / loyaltyProgress.required) * 100} 
                          className="h-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>                {/* Date Picker */}
                <RentalDatePicker productId={product.id} productName={product.name} />

                {/* Next Button */}
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNextStep}
                    disabled={!currentDraft || !currentDraft.startDate || !currentDraft.endDate}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Continue to Review
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Review & Payment */}
            {currentStep === 2 && currentDraft && currentDraft.calculation && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Tabs defaultValue="booking" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="booking">Booking Details</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing Breakdown</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommended</TabsTrigger>
                  </TabsList>

                  <TabsContent value="booking" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-500" />
                          Rental Summary
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Rental Period:</span>
                              <span className="font-medium">
                                {currentDraft.calculation.breakdown.numberOfDays} days
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Start Date:</span>
                              <span className="font-medium">
                                {currentDraft.startDate?.toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>End Date:</span>
                              <span className="font-medium">
                                {currentDraft.endDate?.toLocaleDateString()}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-semibold">
                              <span>Total Amount:</span>
                              <span className="text-orange-500">
                                ₹{currentDraft.calculation.finalTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="font-medium">
                                Save ₹{currentDraft.calculation.priceComparison.savings.toLocaleString()} vs buying
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600">
                              <Shield className="h-4 w-4" />
                              <span className="text-sm">
                                Security Deposit: ₹{currentDraft.calculation.securityDeposit.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-600">                              <Award className="h-4 w-4" />
                              <span className="text-sm">
                                Loyalty Discount Applied: {currentDraft.calculation.discounts.loyaltyDiscount}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Service Features */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Truck className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                          <h5 className="font-semibold text-sm">Free Delivery</h5>
                          <p className="text-xs text-muted-foreground">
                            Door-to-door service included
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <RotateCcw className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h5 className="font-semibold text-sm">Easy Returns</h5>
                          <p className="text-xs text-muted-foreground">
                            Hassle-free pickup service
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <h5 className="font-semibold text-sm">Damage Protection</h5>
                          <p className="text-xs text-muted-foreground">
                            Covered by security deposit
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-4">Detailed Pricing Breakdown</h4>                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Base Rental ({currentDraft.calculation.breakdown.numberOfDays} days)</span>
                            <span>₹{(currentDraft.calculation.breakdown.dailyRate * currentDraft.calculation.breakdown.numberOfDays).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Service Fee</span>
                            <span>₹{currentDraft.calculation.serviceFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Cleaning Fee</span>
                            <span>₹{currentDraft.calculation.cleaningFee.toLocaleString()}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{currentDraft.calculation.breakdown.subtotal.toLocaleString()}</span>
                          </div>
                          {currentDraft.calculation.discounts.loyaltyDiscount > 0 && (
                            <div className="flex justify-between text-green-600 text-sm">
                              <span>Loyalty Discount (-{currentDraft.calculation.discounts.loyaltyDiscount}%)</span>
                              <span>-₹{((currentDraft.calculation.breakdown.subtotal * currentDraft.calculation.discounts.loyaltyDiscount) / 100).toLocaleString()}</span>
                            </div>
                          )}
                          {currentDraft.calculation.discounts.seasonalDiscount > 0 && (
                            <div className="flex justify-between text-green-600 text-sm">
                              <span>Seasonal Discount (-{currentDraft.calculation.discounts.seasonalDiscount}%)</span>
                              <span>-₹{((currentDraft.calculation.breakdown.subtotal * currentDraft.calculation.discounts.seasonalDiscount) / 100).toLocaleString()}</span>
                            </div>
                          )}
                          {currentDraft.calculation.discounts.bulkDiscount > 0 && (
                            <div className="flex justify-between text-green-600 text-sm">
                              <span>Bulk Discount (-{currentDraft.calculation.discounts.bulkDiscount}%)</span>
                              <span>-₹{((currentDraft.calculation.breakdown.subtotal * currentDraft.calculation.discounts.bulkDiscount) / 100).toLocaleString()}</span>
                            </div>
                          )}
                          {currentDraft.calculation.discounts.firstTimeDiscount > 0 && (
                            <div className="flex justify-between text-green-600 text-sm">
                              <span>First Time Discount (-{currentDraft.calculation.discounts.firstTimeDiscount}%)</span>
                              <span>-₹{((currentDraft.calculation.breakdown.subtotal * currentDraft.calculation.discounts.firstTimeDiscount) / 100).toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span>Taxes</span>
                            <span>₹{currentDraft.calculation.taxes.toLocaleString()}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Final Total</span>
                            <span className="text-orange-500">₹{currentDraft.calculation.finalTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>                  <TabsContent value="recommendations">
                    <RentalRecommendations />
                  </TabsContent>
                </Tabs>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back to Dates
                  </Button>
                  <Button 
                    onClick={handleConfirmBooking}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && bookingConfirmed && confirmationId && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-6"
              >
                <div className="space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">
                    Your rental booking has been successfully confirmed.
                  </p>
                </div>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Booking Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Booking ID:</strong>
                        <br />
                        <code className="bg-white px-2 py-1 rounded text-xs">{confirmationId}</code>
                      </div>
                      <div>
                        <strong>Product:</strong>
                        <br />
                        {product.name}
                      </div>
                      <div>
                        <strong>Rental Period:</strong>
                        <br />
                        {currentDraft?.calculation?.breakdown.numberOfDays} days
                      </div>
                      <div>
                        <strong>Total Amount:</strong>
                        <br />
                        <span className="text-green-600 font-semibold">
                          ₹{currentDraft?.calculation?.finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>A confirmation email has been sent to your registered email address.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Your item will be delivered 1 day before your rental start date.</span>
                  </div>
                </div>

                <Button onClick={handleClose} className="w-full">
                  Continue Shopping
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
