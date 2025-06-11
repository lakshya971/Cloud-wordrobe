"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RentalCalculator, RentalCalculationResult, UserProfile, AvailabilityManager } from '@/lib/rental-calculator';

interface RentalBooking {
  id: string;
  productId: number;
  productName: string;
  startDate: Date;
  endDate: Date;
  days: number;
  totalAmount: number;
  securityDeposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  calculation: RentalCalculationResult;
  bookingDate: Date;
}

interface RentalDraft {
  productId: number;
  startDate: Date | null;
  endDate: Date | null;
  calculation: RentalCalculationResult | null;
}

interface RentalContextType {
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Booking Management
  currentDraft: RentalDraft | null;
  rentalBookings: RentalBooking[];
  
  // Rental Calculation
  calculateRental: (productId: number, startDate: Date, endDate: Date) => RentalCalculationResult | null;
  saveDraft: (productId: number, startDate: Date, endDate: Date) => void;
  clearDraft: () => void;
  
  // Booking Flow
  createBooking: (productId: number, productName: string) => string | null;
  cancelBooking: (bookingId: string) => void;
  
  // Availability
  checkAvailability: (productId: number, startDate: Date, endDate: Date) => boolean;
  getUnavailableDates: (productId: number) => Date[];
  
  // Analytics
  getTotalSavings: () => number;
  getRentalHistory: () => RentalBooking[];
  getLoyaltyProgress: () => { current: number; nextTier: string; required: number };
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

// Mock product data for rental calculations
const MOCK_PRODUCTS = {
  1: { category: 'Ethnic Wear', brand: 'Fashion Hub', originalPrice: 2999, location: 'Mumbai' },
  2: { category: 'Wedding Collection', brand: 'Bridal Dreams', originalPrice: 8999, location: 'Delhi' },
  3: { category: 'Western Wear', brand: 'Urban Style', originalPrice: 1999, location: 'Bangalore' },
  4: { category: 'Party Wear', brand: 'Night Out Fashion', originalPrice: 3999, location: 'Chennai' },
  5: { category: 'Formal Wear', brand: 'Corporate Wear', originalPrice: 4999, location: 'Hyderabad' },
  6: { category: 'Accessories', brand: 'Style Street', originalPrice: 899, location: 'Pune' },
};

// Mock existing bookings for availability
const MOCK_BOOKINGS: Record<number, Array<{startDate: Date; endDate: Date}>> = {
  1: [
    { startDate: new Date('2024-12-25'), endDate: new Date('2024-12-27') },
    { startDate: new Date('2024-12-31'), endDate: new Date('2025-01-02') },
  ],
  2: [
    { startDate: new Date('2024-12-20'), endDate: new Date('2024-12-22') },
  ],
};

export function RentalProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    isFirstTime: true,
    loyaltyTier: 'bronze',
    totalRentals: 0,
    averageRating: 5.0,
  });

  const [currentDraft, setCurrentDraft] = useState<RentalDraft | null>(null);
  const [rentalBookings, setRentalBookings] = useState<RentalBooking[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userRentalProfile');
    const savedBookings = localStorage.getItem('rentalBookings');
    
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    }
    
    if (savedBookings) {
      try {
        const bookings = JSON.parse(savedBookings);
        // Convert date strings back to Date objects
        const parsedBookings = bookings.map((booking: any) => ({
          ...booking,
          startDate: new Date(booking.startDate),
          endDate: new Date(booking.endDate),
          bookingDate: new Date(booking.bookingDate),
        }));
        setRentalBookings(parsedBookings);
      } catch (error) {
        console.error('Error loading rental bookings:', error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('userRentalProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('rentalBookings', JSON.stringify(rentalBookings));
  }, [rentalBookings]);

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const calculateRental = (productId: number, startDate: Date, endDate: Date): RentalCalculationResult | null => {
    const product = MOCK_PRODUCTS[productId as keyof typeof MOCK_PRODUCTS];
    if (!product) return null;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return null;

    // Determine seasonality based on date
    const month = startDate.getMonth();
    let seasonality: 'high' | 'medium' | 'low' = 'medium';
    
    // Wedding season (Nov-Feb), Festival season (Sep-Oct)
    if ([10, 11, 0, 1, 8, 9].includes(month)) {
      seasonality = 'high';
    } else if ([6, 7].includes(month)) { // Monsoon
      seasonality = 'low';
    }

    // Calculate availability and demand
    const existingBookings = MOCK_BOOKINGS[productId] || [];
    const occupancyRate = AvailabilityManager.calculateOccupancyRate(
      existingBookings,
      { startDate: new Date(startDate.getFullYear(), startDate.getMonth(), 1), 
        endDate: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) }
    );

    const availability = 100 - occupancyRate;
    const demandLevel: 'high' | 'medium' | 'low' = 
      occupancyRate > 70 ? 'high' : occupancyRate > 40 ? 'medium' : 'low';

    return RentalCalculator.calculateRentalPrice(
      {
        basePrice: Math.round(product.originalPrice * 0.04), // 4% base rate
        category: product.category,
        brand: product.brand,
        originalPrice: product.originalPrice,
        location: product.location,
        seasonality,
        availability,
        demandLevel,
      },
      {
        days,
        startDate,
        endDate,
      },
      userProfile
    );
  };

  const saveDraft = (productId: number, startDate: Date, endDate: Date) => {
    const calculation = calculateRental(productId, startDate, endDate);
    setCurrentDraft({
      productId,
      startDate,
      endDate,
      calculation,
    });
  };

  const clearDraft = () => {
    setCurrentDraft(null);
  };

  const createBooking = (productId: number, productName: string): string | null => {
    if (!currentDraft || !currentDraft.calculation || !currentDraft.startDate || !currentDraft.endDate) {
      return null;
    }

    const bookingId = `rental_${Date.now()}_${productId}`;
    const newBooking: RentalBooking = {
      id: bookingId,
      productId,
      productName,
      startDate: currentDraft.startDate,
      endDate: currentDraft.endDate,
      days: currentDraft.calculation.breakdown.numberOfDays,
      totalAmount: currentDraft.calculation.finalTotal,
      securityDeposit: currentDraft.calculation.securityDeposit,
      status: 'pending',
      calculation: currentDraft.calculation,
      bookingDate: new Date(),
    };

    setRentalBookings(prev => [...prev, newBooking]);
    
    // Update user profile
    const newTotalRentals = userProfile.totalRentals + 1;
    let newTier = userProfile.loyaltyTier;
    
    // Upgrade loyalty tier based on rentals
    if (newTotalRentals >= 20) newTier = 'platinum';
    else if (newTotalRentals >= 10) newTier = 'gold';
    else if (newTotalRentals >= 5) newTier = 'silver';

    updateUserProfile({
      totalRentals: newTotalRentals,
      loyaltyTier: newTier,
      isFirstTime: false,
    });

    clearDraft();
    return bookingId;
  };

  const cancelBooking = (bookingId: string) => {
    setRentalBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  const checkAvailability = (productId: number, startDate: Date, endDate: Date): boolean => {
    const existingBookings = MOCK_BOOKINGS[productId] || [];
    const userBookings = rentalBookings
      .filter(b => b.productId === productId && b.status !== 'cancelled')
      .map(b => ({ startDate: b.startDate, endDate: b.endDate }));
    
    const allBookings = [...existingBookings, ...userBookings];
    return AvailabilityManager.checkAvailability('', startDate, endDate, allBookings);
  };

  const getUnavailableDates = (productId: number): Date[] => {
    const existingBookings = MOCK_BOOKINGS[productId] || [];
    const userBookings = rentalBookings
      .filter(b => b.productId === productId && b.status !== 'cancelled')
      .map(b => ({ startDate: b.startDate, endDate: b.endDate }));
    
    const allBookings = [...existingBookings, ...userBookings];
    const unavailableDates: Date[] = [];
    
    allBookings.forEach(booking => {
      const currentDate = new Date(booking.startDate);
      while (currentDate <= booking.endDate) {
        unavailableDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    return unavailableDates;
  };

  const getTotalSavings = (): number => {
    return rentalBookings
      .filter(booking => booking.status !== 'cancelled')
      .reduce((total, booking) => total + booking.calculation.priceComparison.savings, 0);
  };

  const getRentalHistory = (): RentalBooking[] => {
    return rentalBookings.sort((a, b) => b.bookingDate.getTime() - a.bookingDate.getTime());
  };

  const getLoyaltyProgress = () => {
    const tierRequirements = {
      bronze: 0,
      silver: 5,
      gold: 10,
      platinum: 20,
    };

    const currentTier = userProfile.loyaltyTier;
    const current = userProfile.totalRentals;
    
    let nextTier = 'platinum';
    let required = 20;

    if (currentTier === 'bronze') {
      nextTier = 'silver';
      required = 5;
    } else if (currentTier === 'silver') {
      nextTier = 'gold';
      required = 10;
    } else if (currentTier === 'gold') {
      nextTier = 'platinum';
      required = 20;
    }

    return { current, nextTier, required };
  };

  const value: RentalContextType = {
    userProfile,
    updateUserProfile,
    currentDraft,
    rentalBookings,
    calculateRental,
    saveDraft,
    clearDraft,
    createBooking,
    cancelBooking,
    checkAvailability,
    getUnavailableDates,
    getTotalSavings,
    getRentalHistory,
    getLoyaltyProgress,
  };

  return (
    <RentalContext.Provider value={value}>
      {children}
    </RentalContext.Provider>
  );
}

export const useRental = () => {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
