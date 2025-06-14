// Shipping and Tracking Service for Cloud Wardrobe
// This service handles order tracking, shipping providers integration, and real-time updates

export interface TrackingEvent {
  timestamp: Date;
  status: string;
  description: string;
  location?: string;
  isCompleted: boolean;
  estimatedDelivery?: Date;
}

export interface ShippingDetails {
  orderId: string;
  trackingNumber: string;
  provider: string;
  status: string;
  estimatedDelivery: Date;
  currentLocation?: string;
  events: TrackingEvent[];
}

export interface CourierPartner {
  id: string;
  name: string;
  trackingUrl: string;
  apiEndpoint?: string;
  isActive: boolean;
  serviceAreas: string[];
  estimatedDays: { min: number; max: number };
}

class ShippingService {
  private static instance: ShippingService;
  private courierPartners: CourierPartner[] = [
    {
      id: 'delhivery',
      name: 'Delhivery',
      trackingUrl: 'https://www.delhivery.com/track/package/{trackingNumber}',
      apiEndpoint: 'https://track.delhivery.com/api/v1/packages/json/',
      isActive: true,
      serviceAreas: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'],
      estimatedDays: { min: 1, max: 3 }
    },
    {
      id: 'bluedart',
      name: 'Blue Dart',
      trackingUrl: 'https://www.bluedart.com/web/guest/trackdartresult?trackFor={trackingNumber}',
      apiEndpoint: 'https://api.bluedart.com/track/',
      isActive: true,
      serviceAreas: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
      estimatedDays: { min: 1, max: 2 }
    },
    {
      id: 'dtdc',
      name: 'DTDC',
      trackingUrl: 'https://www.dtdc.in/tracking/tracking_results.asp?Ttype=awb_no&strCnno={trackingNumber}',
      isActive: true,
      serviceAreas: ['All India'],
      estimatedDays: { min: 2, max: 5 }
    },
    {
      id: 'fedex',
      name: 'FedEx',
      trackingUrl: 'https://www.fedex.com/fedextrack/?tracknumbers={trackingNumber}',
      apiEndpoint: 'https://api.fedex.com/track/v1/trackingnumbers',
      isActive: true,
      serviceAreas: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      estimatedDays: { min: 1, max: 2 }
    },
    {
      id: 'ecom',
      name: 'Ecom Express',
      trackingUrl: 'https://www.ecomexpress.in/track-order/?id={trackingNumber}',
      isActive: true,
      serviceAreas: ['All India'],
      estimatedDays: { min: 2, max: 4 }
    }
  ];

  static getInstance(): ShippingService {
    if (!ShippingService.instance) {
      ShippingService.instance = new ShippingService();
    }
    return ShippingService.instance;
  }

  // Generate a realistic tracking number based on provider
  generateTrackingNumber(providerId: string): string {
    const provider = this.courierPartners.find(p => p.id === providerId);
    if (!provider) {
      throw new Error('Invalid provider');
    }

    const timestamp = Date.now().toString().slice(-8);
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    switch (providerId) {
      case 'delhivery':
        return `DL${timestamp}${randomSuffix}`;
      case 'bluedart':
        return `BD${timestamp}${randomSuffix}`;
      case 'dtdc':
        return `DT${timestamp}${randomSuffix}`;
      case 'fedex':
        return `FX${timestamp}${randomSuffix}`;
      case 'ecom':
        return `EC${timestamp}${randomSuffix}`;
      default:
        return `CW${timestamp}${randomSuffix}`;
    }
  }

  // Get best shipping provider for a location
  getBestProvider(location: string, priority: 'cost' | 'speed' = 'speed'): CourierPartner {
    const availableProviders = this.courierPartners.filter(provider => 
      provider.isActive && (
        provider.serviceAreas.includes('All India') || 
        provider.serviceAreas.includes(location)
      )
    );

    if (priority === 'speed') {
      return availableProviders.reduce((best, current) => 
        current.estimatedDays.max < best.estimatedDays.max ? current : best
      );
    } else {
      // For cost, prefer Ecom Express or DTDC (typically cheaper)
      return availableProviders.find(p => p.id === 'ecom') || 
             availableProviders.find(p => p.id === 'dtdc') || 
             availableProviders[0];
    }
  }

  // Create a new shipment
  async createShipment(orderData: {
    orderId: string;
    customerInfo: any;
    items: any[];
    deliveryAddress: string;
    location: string;
    priority?: 'cost' | 'speed';
  }): Promise<{ trackingNumber: string; provider: CourierPartner; estimatedDelivery: Date }> {
    const provider = this.getBestProvider(orderData.location, orderData.priority);
    const trackingNumber = this.generateTrackingNumber(provider.id);
    
    // Calculate estimated delivery
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + provider.estimatedDays.max);
    
    // In a real implementation, you would call the provider's API here
    console.log('Creating shipment:', {
      orderId: orderData.orderId,
      trackingNumber,
      provider: provider.name,
      estimatedDelivery
    });

    return { trackingNumber, provider, estimatedDelivery };
  }

  // Generate realistic tracking events
  generateTrackingEvents(
    trackingNumber: string, 
    provider: CourierPartner, 
    orderDate: Date,
    estimatedDelivery: Date
  ): TrackingEvent[] {
    const events: TrackingEvent[] = [];
    const now = new Date();
    
    // Order placed
    events.push({
      timestamp: orderDate,
      status: 'Order Placed',
      description: 'Your order has been confirmed and is being processed',
      isCompleted: true
    });

    // Processing (2-6 hours after order)
    const processingTime = new Date(orderDate.getTime() + (Math.random() * 4 + 2) * 60 * 60 * 1000);
    if (now >= processingTime) {
      events.push({
        timestamp: processingTime,
        status: 'Processing',
        description: 'Your order is being prepared for shipment',
        location: 'Fulfillment Center, Mumbai',
        isCompleted: true
      });
    }

    // Shipped (6-24 hours after order)
    const shippedTime = new Date(orderDate.getTime() + (Math.random() * 18 + 6) * 60 * 60 * 1000);
    if (now >= shippedTime) {
      events.push({
        timestamp: shippedTime,
        status: 'Shipped',
        description: `Package picked up by ${provider.name}`,
        location: 'Mumbai Distribution Center',
        isCompleted: true
      });
    }

    // In Transit events (generate 1-3 events based on estimated delivery)
    const transitEvents = Math.floor(Math.random() * 3) + 1;
    const timePerTransit = (estimatedDelivery.getTime() - shippedTime.getTime()) / (transitEvents + 1);
    
    for (let i = 1; i <= transitEvents; i++) {
      const transitTime = new Date(shippedTime.getTime() + timePerTransit * i);
      if (now >= transitTime) {
        const locations = ['Hub Delhi', 'Transit Warehouse Pune', 'Regional Center Bangalore', 'Local Facility'];
        events.push({
          timestamp: transitTime,
          status: 'In Transit',
          description: `Package is moving towards destination`,
          location: locations[Math.floor(Math.random() * locations.length)],
          isCompleted: true
        });
      }
    }

    // Out for Delivery (on delivery day)
    const outForDeliveryTime = new Date(estimatedDelivery);
    outForDeliveryTime.setHours(8, 0, 0, 0); // 8 AM on delivery day
    if (now >= outForDeliveryTime && now < estimatedDelivery) {
      events.push({
        timestamp: outForDeliveryTime,
        status: 'Out for Delivery',
        description: 'Package is out for delivery and will be delivered today',
        location: 'Local Delivery Center',
        isCompleted: true,
        estimatedDelivery
      });
    }

    // Delivered
    if (now >= estimatedDelivery) {
      events.push({
        timestamp: estimatedDelivery,
        status: 'Delivered',
        description: 'Package delivered successfully',
        location: 'Customer Address',
        isCompleted: true
      });
    }

    return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  // Get tracking information for an order
  async getTrackingInfo(orderId: string, trackingNumber: string): Promise<ShippingDetails | null> {
    try {
      // In a real implementation, you would call the provider's API
      // For now, we'll simulate realistic tracking data
      
      const providerId = trackingNumber.substring(0, 2);
      const providerMap: { [key: string]: string } = {
        'DL': 'delhivery',
        'BD': 'bluedart',
        'DT': 'dtdc',
        'FX': 'fedex',
        'EC': 'ecom'
      };
      
      const provider = this.courierPartners.find(p => p.id === providerMap[providerId]);
      if (!provider) {
        throw new Error('Provider not found');
      }

      // Generate realistic order date (1-5 days ago)
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 5 + 1));
      
      // Generate estimated delivery (1-3 days from order)
      const estimatedDelivery = new Date(orderDate);
      estimatedDelivery.setDate(estimatedDelivery.getDate() + provider.estimatedDays.max);
      
      const events = this.generateTrackingEvents(trackingNumber, provider, orderDate, estimatedDelivery);
      const latestEvent = events[events.length - 1];
      
      return {
        orderId,
        trackingNumber,
        provider: provider.name,
        status: latestEvent.status,
        estimatedDelivery,
        currentLocation: latestEvent.location,
        events
      };
    } catch (error) {
      console.error('Error fetching tracking info:', error);
      return null;
    }
  }

  // Get tracking URL for external provider
  getTrackingUrl(trackingNumber: string): string {
    const providerId = trackingNumber.substring(0, 2);
    const providerMap: { [key: string]: string } = {
      'DL': 'delhivery',
      'BD': 'bluedart',
      'DT': 'dtdc',
      'FX': 'fedex',
      'EC': 'ecom'
    };
    
    const provider = this.courierPartners.find(p => p.id === providerMap[providerId]);
    if (provider) {
      return provider.trackingUrl.replace('{trackingNumber}', trackingNumber);
    }
    
    return '#';
  }

  // Estimate shipping cost (mock implementation)
  calculateShippingCost(items: any[], deliveryLocation: string, priority: 'cost' | 'speed' = 'cost'): number {
    const baseWeight = items.reduce((total, item) => total + (item.quantity || 1), 0) * 0.5; // 0.5kg per item
    const distance = this.getDistanceCategory(deliveryLocation);
    
    let baseCost = 50; // Base shipping cost
    
    // Weight-based pricing
    if (baseWeight > 2) {
      baseCost += (baseWeight - 2) * 20;
    }
    
    // Distance-based pricing
    switch (distance) {
      case 'local':
        baseCost += 0;
        break;
      case 'regional':
        baseCost += 30;
        break;
      case 'national':
        baseCost += 60;
        break;
    }
    
    // Priority pricing
    if (priority === 'speed') {
      baseCost *= 1.5;
    }
    
    return Math.round(baseCost);
  }

  private getDistanceCategory(location: string): 'local' | 'regional' | 'national' {
    const localCities = ['Mumbai', 'Navi Mumbai', 'Thane'];
    const regionalCities = ['Pune', 'Nashik', 'Aurangabad', 'Nagpur'];
    
    if (localCities.includes(location)) return 'local';
    if (regionalCities.includes(location)) return 'regional';
    return 'national';
  }

  // Get all available providers
  getAvailableProviders(): CourierPartner[] {
    return this.courierPartners.filter(p => p.isActive);
  }
}

export default ShippingService;
