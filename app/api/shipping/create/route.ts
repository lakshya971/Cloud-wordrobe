import { NextRequest, NextResponse } from 'next/server';
import ShippingService from '@/lib/shipping-service';

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerInfo, items, deliveryAddress, location, priority } = await request.json();

    if (!orderId || !customerInfo || !items || !deliveryAddress) {
      return NextResponse.json(
        { error: 'Missing required shipping information' },
        { status: 400 }
      );
    }

    const shippingService = ShippingService.getInstance();
    
    // Calculate shipping cost
    const shippingCost = shippingService.calculateShippingCost(items, location || 'Mumbai', priority || 'cost');
    
    // Create shipment
    const shipment = await shippingService.createShipment({
      orderId,
      customerInfo,
      items,
      deliveryAddress,
      location: location || 'Mumbai',
      priority: priority || 'speed'
    });

    return NextResponse.json({
      success: true,
      data: {
        trackingNumber: shipment.trackingNumber,
        provider: shipment.provider.name,
        providerId: shipment.provider.id,
        estimatedDelivery: shipment.estimatedDelivery,
        shippingCost,
        trackingUrl: shippingService.getTrackingUrl(shipment.trackingNumber)
      }
    });

  } catch (error) {
    console.error('Shipping creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'Mumbai';
    const items = searchParams.get('items') || '1';
    const priority = searchParams.get('priority') as 'cost' | 'speed' || 'cost';

    const shippingService = ShippingService.getInstance();
    
    // Get available providers
    const providers = shippingService.getAvailableProviders();
    
    // Calculate shipping cost estimate
    const mockItems = Array.from({ length: parseInt(items) }, (_, i) => ({ quantity: 1 }));
    const shippingCost = shippingService.calculateShippingCost(mockItems, location, priority);
    
    // Get best provider recommendation
    const bestProvider = shippingService.getBestProvider(location, priority);

    return NextResponse.json({
      success: true,
      data: {
        providers: providers.map(p => ({
          id: p.id,
          name: p.name,
          estimatedDays: p.estimatedDays,
          serviceAreas: p.serviceAreas
        })),
        shippingCost,
        bestProvider: {
          id: bestProvider.id,
          name: bestProvider.name,
          estimatedDays: bestProvider.estimatedDays
        }
      }
    });

  } catch (error) {
    console.error('Shipping info error:', error);
    return NextResponse.json(
      { error: 'Failed to get shipping information' },
      { status: 500 }
    );
  }
}
