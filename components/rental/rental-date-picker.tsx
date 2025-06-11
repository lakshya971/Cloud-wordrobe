"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRental } from '@/contexts/RentalContext';
import { RentalCalculationResult } from '@/lib/rental-calculator';

interface RentalDatePickerProps {
  productId: number;
  productName: string;
  onBookingComplete?: (bookingId: string) => void;
  onCancel?: () => void;
}

export function RentalDatePicker({ 
  productId, 
  productName, 
  onBookingComplete, 
  onCancel 
}: RentalDatePickerProps) {
  const {
    calculateRental,
    saveDraft,
    clearDraft,
    createBooking,
    checkAvailability,
    getUnavailableDates,
    currentDraft,
    userProfile
  } = useRental();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calculation, setCalculation] = useState<RentalCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [errors, setErrors] = useState<string[]>([]);

  const unavailableDates = getUnavailableDates(productId);

  // Auto-calculate when dates change
  useEffect(() => {
    if (startDate && endDate && endDate > startDate) {
      setIsCalculating(true);
      setErrors([]);

      // Validate availability
      if (!checkAvailability(productId, startDate, endDate)) {
        setErrors(['Selected dates are not available']);
        setCalculation(null);
        setIsCalculating(false);
        return;
      }

      // Validate minimum rental period
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (days < 1) {
        setErrors(['Minimum rental period is 1 day']);
        setCalculation(null);
        setIsCalculating(false);
        return;
      }

      // Calculate rental
      setTimeout(() => {
        const result = calculateRental(productId, startDate, endDate);
        setCalculation(result);
        if (result) {
          saveDraft(productId, startDate, endDate);
        }
        setIsCalculating(false);
      }, 500);
    } else {
      setCalculation(null);
      clearDraft();
    }
  }, [startDate, endDate, productId]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDateUnavailable = (date: Date): boolean => {
    return unavailableDates.some(unavailable => 
      unavailable.toDateString() === date.toDateString()
    );
  };

  const isDateInPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, monthIndex, day));
    }

    return days;
  };

  const handleDateClick = (date: Date | null) => {
    if (!date || isDateInPast(date) || isDateUnavailable(date)) return;

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else if (date > startDate) {
      // Set end date
      setEndDate(date);
    } else {
      // Set new start date
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleBooking = async () => {
    if (!calculation || !startDate || !endDate) return;

    const bookingId = createBooking(productId, productName);
    if (bookingId && onBookingComplete) {
      onBookingComplete(bookingId);
    }
  };

  const renderCalendar = () => {
    const days = generateCalendarDays(selectedMonth);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))}
          >
            ←
          </Button>
          <h3 className="font-semibold">
            {selectedMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))}
          >
            →
          </Button>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
          {weekdays.map(day => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2" />;
            }

            const isUnavailable = isDateUnavailable(date);
            const isPast = isDateInPast(date);
            const isSelected = startDate && date.toDateString() === startDate.toDateString();
            const isEndSelected = endDate && date.toDateString() === endDate.toDateString();
            const isInRange = startDate && endDate && date > startDate && date < endDate;
            const isDisabled = isPast || isUnavailable;

            return (
              <motion.button
                key={index}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => handleDateClick(date)}
                disabled={isDisabled}
                className={`
                  p-2 text-sm rounded-lg transition-all duration-200 relative
                  ${isDisabled 
                    ? 'text-muted-foreground cursor-not-allowed bg-muted/50' 
                    : 'hover:bg-orange-50 cursor-pointer'
                  }
                  ${isSelected || isEndSelected 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : ''
                  }
                  ${isInRange ? 'bg-orange-100 text-orange-900' : ''}
                `}
              >
                {date.getDate()}
                {isUnavailable && !isPast && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            Select Rental Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderCalendar()}
          
          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-100 rounded" />
              <span>Range</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-muted rounded relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full" />
                </div>
              </div>
              <span>Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Dates Summary */}
      <AnimatePresence>
        {(startDate || endDate) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {startDate ? formatDate(startDate) : 'Not selected'}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {endDate ? formatDate(endDate) : 'Not selected'}
                      </p>
                    </div>
                  </div>
                  
                  {startDate && endDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="space-y-1">
                    {errors.map((error, index) => (
                      <p key={index} className="text-sm text-red-700">{error}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculation Results */}
      <AnimatePresence>
        {isCalculating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent" />
                  <span className="text-sm text-muted-foreground">Calculating rental price...</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {calculation && !isCalculating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Rental Calculation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base rental ({calculation.breakdown.numberOfDays} days @ ₹{calculation.breakdown.dailyRate}/day)</span>
                      <span>₹{calculation.breakdown.subtotal}</span>
                    </div>
                    
                    {/* Discounts */}
                    {calculation.breakdown.totalDiscounts > 0 && (
                      <div className="space-y-1">
                        {calculation.discounts.loyaltyDiscount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              Loyalty discount ({userProfile.loyaltyTier})
                            </span>
                            <span>-₹{calculation.discounts.loyaltyDiscount}</span>
                          </div>
                        )}
                        {calculation.discounts.bulkDiscount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              Bulk discount
                            </span>
                            <span>-₹{calculation.discounts.bulkDiscount}</span>
                          </div>
                        )}
                        {calculation.discounts.firstTimeDiscount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              First-time user discount
                            </span>
                            <span>-₹{calculation.discounts.firstTimeDiscount}</span>
                          </div>
                        )}
                        {calculation.discounts.seasonalDiscount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              Seasonal discount
                            </span>
                            <span>-₹{calculation.discounts.seasonalDiscount}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <Separator />
                    
                    <div className="flex justify-between text-sm">
                      <span>Discounted rental price</span>
                      <span>₹{calculation.totalRentalPrice}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Cleaning fee</span>
                      <span>₹{calculation.cleaningFee}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>₹{calculation.serviceFee}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Taxes</span>
                      <span>₹{calculation.taxes}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Security deposit (refundable)</span>
                      <span>₹{calculation.securityDeposit}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-orange-600">₹{calculation.finalTotal}</span>
                    </div>
                  </div>

                  {/* Savings Comparison */}
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-sm">You're saving money!</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Buy price:</span>
                        <span>₹{calculation.priceComparison.buyPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rent price:</span>
                        <span>₹{calculation.priceComparison.rentPrice}</span>
                      </div>
                      <div className="flex justify-between font-medium text-green-600 mt-1">
                        <span>Your savings:</span>
                        <span>
                          ₹{calculation.priceComparison.savings} 
                          ({calculation.priceComparison.savingsPercentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Benefits */}
                  {userProfile.loyaltyTier !== 'bronze' && (
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          {userProfile.loyaltyTier.toUpperCase()} MEMBER
                        </Badge>
                      </div>
                      <p className="text-sm text-orange-700">
                        You saved ₹{calculation.discounts.loyaltyDiscount} with your {userProfile.loyaltyTier} membership!
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={onCancel}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleBooking}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      Confirm Booking - ₹{calculation.finalTotal}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
