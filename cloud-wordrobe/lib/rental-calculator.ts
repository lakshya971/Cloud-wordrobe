// Advanced Rental Calculation System
export interface RentalCalculationConfig {
  basePrice: number;
  category: string;
  brand: string;
  originalPrice: number;
  location: string;
  seasonality: 'high' | 'medium' | 'low';
  availability: number; // percentage of availability
  demandLevel: 'high' | 'medium' | 'low';
}

export interface RentalPeriod {
  days: number;
  startDate: Date;
  endDate: Date;
}

export interface RentalCalculationResult {
  baseRentalPrice: number;
  totalRentalPrice: number;
  securityDeposit: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  finalTotal: number;
  discounts: {
    seasonalDiscount: number;
    loyaltyDiscount: number;
    bulkDiscount: number;
    firstTimeDiscount: number;
  };
  breakdown: {
    dailyRate: number;
    numberOfDays: number;
    subtotal: number;
    fees: number;
    totalDiscounts: number;
  };
  priceComparison: {
    buyPrice: number;
    rentPrice: number;
    savings: number;
    savingsPercentage: number;
  };
}

export interface UserProfile {
  isFirstTime: boolean;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalRentals: number;
  averageRating: number;
}

export class RentalCalculator {
  private static SEASONAL_MULTIPLIERS = {
    high: 1.3,    // Wedding season, festivals
    medium: 1.0,  // Regular season
    low: 0.8      // Off-season
  };

  private static DEMAND_MULTIPLIERS = {
    high: 1.25,
    medium: 1.0,
    low: 0.85
  };
  private static CATEGORY_MULTIPLIERS: Record<string, number> = {
    'Wedding Collection': 1.4,
    'Party Wear': 1.2,
    'Ethnic Wear': 1.1,
    'Western Wear': 1.0,
    'Casual Wear': 0.8,
    'Formal Wear': 1.15,
    'Accessories': 0.9,
    'Footwear': 0.85
  };
  private static LOCATION_MULTIPLIERS: Record<string, number> = {
    'Mumbai': 1.2,
    'Delhi': 1.15,
    'Bangalore': 1.1,
    'Chennai': 1.05,
    'Hyderabad': 1.0,
    'Pune': 0.95,
    'Kolkata': 0.9,
    'Ahmedabad': 0.85
  };

  private static LOYALTY_DISCOUNTS = {
    bronze: 0.02,    // 2%
    silver: 0.05,    // 5%
    gold: 0.08,      // 8%
    platinum: 0.12   // 12%
  };

  static calculateRentalPrice(
    config: RentalCalculationConfig,
    period: RentalPeriod,
    userProfile?: UserProfile
  ): RentalCalculationResult {
    // 1. Calculate base daily rate
    let dailyRate = this.calculateBaseDailyRate(config);

    // 2. Apply dynamic pricing factors
    dailyRate = this.applyDynamicPricing(dailyRate, config, period);

    // 3. Calculate rental subtotal
    const numberOfDays = period.days;
    const baseRentalPrice = dailyRate * numberOfDays;

    // 4. Apply bulk discounts for longer rentals
    const bulkDiscount = this.calculateBulkDiscount(numberOfDays, baseRentalPrice);

    // 5. Apply user-specific discounts
    const userDiscounts = userProfile ? this.calculateUserDiscounts(baseRentalPrice, userProfile) : {
      loyaltyDiscount: 0,
      firstTimeDiscount: 0
    };

    // 6. Apply seasonal discounts
    const seasonalDiscount = this.calculateSeasonalDiscount(baseRentalPrice, config.seasonality, period);

    // 7. Calculate fees
    const securityDeposit = this.calculateSecurityDeposit(config.originalPrice);
    const cleaningFee = this.calculateCleaningFee(config.category);
    const serviceFee = this.calculateServiceFee(baseRentalPrice);
    const taxes = this.calculateTaxes(baseRentalPrice + serviceFee);

    // 8. Calculate totals
    const totalDiscounts = bulkDiscount + userDiscounts.loyaltyDiscount + 
                          userDiscounts.firstTimeDiscount + seasonalDiscount;
    
    const discountedRentalPrice = Math.max(baseRentalPrice - totalDiscounts, baseRentalPrice * 0.3); // Min 30% of original
    const totalFees = cleaningFee + serviceFee + taxes;
    const finalTotal = discountedRentalPrice + totalFees + securityDeposit;

    // 9. Price comparison with buying
    const savings = config.originalPrice - finalTotal;
    const savingsPercentage = (savings / config.originalPrice) * 100;

    return {
      baseRentalPrice,
      totalRentalPrice: discountedRentalPrice,
      securityDeposit,
      cleaningFee,
      serviceFee,
      taxes,
      finalTotal,
      discounts: {
        seasonalDiscount,
        loyaltyDiscount: userDiscounts.loyaltyDiscount,
        bulkDiscount,
        firstTimeDiscount: userDiscounts.firstTimeDiscount
      },
      breakdown: {
        dailyRate,
        numberOfDays,
        subtotal: baseRentalPrice,
        fees: totalFees,
        totalDiscounts
      },
      priceComparison: {
        buyPrice: config.originalPrice,
        rentPrice: finalTotal,
        savings: Math.max(savings, 0),
        savingsPercentage: Math.max(savingsPercentage, 0)
      }
    };
  }

  private static calculateBaseDailyRate(config: RentalCalculationConfig): number {
    // Base rate is typically 3-5% of original price per day
    const basePercentage = 0.04; // 4%
    let dailyRate = config.originalPrice * basePercentage;

    // Apply category multiplier
    const categoryMultiplier = this.CATEGORY_MULTIPLIERS[config.category] || 1.0;
    dailyRate *= categoryMultiplier;

    // Apply location multiplier
    const locationMultiplier = this.LOCATION_MULTIPLIERS[config.location] || 1.0;
    dailyRate *= locationMultiplier;

    return Math.round(dailyRate);
  }

  private static applyDynamicPricing(
    dailyRate: number,
    config: RentalCalculationConfig,
    period: RentalPeriod
  ): number {
    // Apply seasonal pricing
    const seasonalMultiplier = this.SEASONAL_MULTIPLIERS[config.seasonality];
    dailyRate *= seasonalMultiplier;

    // Apply demand-based pricing
    const demandMultiplier = this.DEMAND_MULTIPLIERS[config.demandLevel];
    dailyRate *= demandMultiplier;

    // Apply availability-based pricing
    if (config.availability < 20) {
      dailyRate *= 1.3; // High demand, low availability
    } else if (config.availability > 80) {
      dailyRate *= 0.9; // Low demand, high availability
    }

    // Weekend pricing (Friday-Sunday)
    const isWeekend = [0, 5, 6].includes(period.startDate.getDay()) || 
                     [0, 5, 6].includes(period.endDate.getDay());
    if (isWeekend) {
      dailyRate *= 1.15;
    }

    return Math.round(dailyRate);
  }

  private static calculateBulkDiscount(days: number, basePrice: number): number {
    if (days >= 30) return basePrice * 0.2;      // 20% for 30+ days
    if (days >= 14) return basePrice * 0.15;     // 15% for 14+ days
    if (days >= 7) return basePrice * 0.1;       // 10% for 7+ days
    if (days >= 3) return basePrice * 0.05;      // 5% for 3+ days
    return 0;
  }

  private static calculateUserDiscounts(basePrice: number, userProfile: UserProfile) {
    const loyaltyDiscount = basePrice * this.LOYALTY_DISCOUNTS[userProfile.loyaltyTier];
    const firstTimeDiscount = userProfile.isFirstTime ? basePrice * 0.1 : 0; // 10% first time

    return {
      loyaltyDiscount: Math.round(loyaltyDiscount),
      firstTimeDiscount: Math.round(firstTimeDiscount)
    };
  }

  private static calculateSeasonalDiscount(
    basePrice: number,
    seasonality: string,
    period: RentalPeriod
  ): number {
    // Off-season discounts
    if (seasonality === 'low') {
      return Math.round(basePrice * 0.15); // 15% off-season discount
    }
    
    // Mid-week discounts
    const isWeekday = ![0, 5, 6].includes(period.startDate.getDay());
    if (isWeekday && seasonality === 'medium') {
      return Math.round(basePrice * 0.08); // 8% weekday discount
    }

    return 0;
  }

  private static calculateSecurityDeposit(originalPrice: number): number {
    // Security deposit is typically 20-30% of original price
    return Math.round(originalPrice * 0.25);
  }
  private static calculateCleaningFee(category: string): number {
    const cleaningFees: Record<string, number> = {
      'Wedding Collection': 200,
      'Party Wear': 150,
      'Ethnic Wear': 100,
      'Western Wear': 80,
      'Formal Wear': 100,
      'Casual Wear': 50,
      'Accessories': 30,
      'Footwear': 40
    };
    return cleaningFees[category] || 75;
  }

  private static calculateServiceFee(rentalPrice: number): number {
    // Service fee is 8-12% of rental price
    return Math.round(rentalPrice * 0.1);
  }

  private static calculateTaxes(subtotal: number): number {
    // GST in India is typically 18% for services, 12% for textiles
    return Math.round(subtotal * 0.12);
  }

  // Utility methods for business logic
  static getOptimalRentalDuration(originalPrice: number): {
    recommended: number;
    minProfitable: number;
    maxRecommended: number;
  } {
    return {
      recommended: Math.ceil(originalPrice / 1000), // Rough heuristic
      minProfitable: 1,
      maxRecommended: 30
    };
  }

  static isRentalProfitable(
    originalPrice: number,
    rentalDays: number,
    calculation: RentalCalculationResult
  ): boolean {
    // Rental is profitable if user saves at least 40% compared to buying
    return calculation.priceComparison.savingsPercentage >= 40;
  }

  static getRecommendedRentalVsBuy(
    originalPrice: number,
    usageFrequency: 'rare' | 'occasional' | 'frequent'
  ): 'rent' | 'buy' | 'either' {
    const priceThreshold = {
      rare: 5000,      // Expensive items, rarely used - recommend rent
      occasional: 3000, // Medium items, occasionally used - either
      frequent: 1000    // Any items used frequently - recommend buy
    };

    if (usageFrequency === 'frequent') return 'buy';
    if (originalPrice > priceThreshold[usageFrequency]) return 'rent';
    if (usageFrequency === 'occasional') return 'either';
    return 'buy';
  }
}

// Availability Management
export class AvailabilityManager {
  static checkAvailability(
    productId: string,
    startDate: Date,
    endDate: Date,
    existingBookings: Array<{startDate: Date; endDate: Date}>
  ): boolean {
    return !existingBookings.some(booking => 
      (startDate <= booking.endDate && endDate >= booking.startDate)
    );
  }

  static getAvailableSlots(
    productId: string,
    month: Date,
    existingBookings: Array<{startDate: Date; endDate: Date}>
  ): Date[] {
    const availableDates: Date[] = [];
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(month.getFullYear(), month.getMonth(), day);
      const isAvailable = !existingBookings.some(booking =>
        currentDate >= booking.startDate && currentDate <= booking.endDate
      );
      
      if (isAvailable) {
        availableDates.push(currentDate);
      }
    }
    
    return availableDates;
  }

  static calculateOccupancyRate(
    existingBookings: Array<{startDate: Date; endDate: Date}>,
    period: {startDate: Date; endDate: Date}
  ): number {
    const totalDays = Math.ceil((period.endDate.getTime() - period.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const occupiedDays = existingBookings.reduce((total, booking) => {
      const overlapStart = new Date(Math.max(booking.startDate.getTime(), period.startDate.getTime()));
      const overlapEnd = new Date(Math.min(booking.endDate.getTime(), period.endDate.getTime()));
      
      if (overlapStart < overlapEnd) {
        return total + Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24));
      }
      return total;
    }, 0);
    
    return (occupiedDays / totalDays) * 100;
  }
}
