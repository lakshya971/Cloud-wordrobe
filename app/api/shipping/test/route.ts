import { NextRequest, NextResponse } from 'next/server';
import ShippingService from '@/lib/shipping-service';

export async function GET() {
  try {
    const shippingService = ShippingService.getInstance();
    
    // Generate sample tracking numbers for testing
    const providers = ['delhivery', 'bluedart', 'dtdc', 'fedex', 'ecom'];
    const sampleTrackingNumbers = providers.map(provider => ({
      provider,
      trackingNumber: shippingService.generateTrackingNumber(provider),
      providerName: shippingService.getAvailableProviders().find(p => p.id === provider)?.name
    }));

    return NextResponse.json({
      success: true,
      message: 'Test tracking numbers generated',
      trackingNumbers: sampleTrackingNumbers,
      instructions: 'Use any of these tracking numbers in the tracking page to test the functionality'
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate test data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'create_test_order') {
      const shippingService = ShippingService.getInstance();
      
      // Create a test shipment
      const testOrder = {
        orderId: `CW${Date.now()}`,
        customerInfo: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+91 9876543210'
        },
        items: [
          { id: 1, name: 'Designer Dress', quantity: 1, price: 2999 },
          { id: 2, name: 'Casual Shirt', quantity: 2, price: 1299 }
        ],
        deliveryAddress: '123 Test Street, Mumbai, Maharashtra 400001',
        location: 'Mumbai',
        priority: 'speed' as 'speed' | 'cost' // Explicitly type priority
      };

      const shipment = await shippingService.createShipment(testOrder);
      
      return NextResponse.json({
        success: true,
        message: 'Test order created successfully',
        order: testOrder,
        shipment,
        trackingNumber: shipment.trackingNumber,
        instructions: `Use tracking number "${shipment.trackingNumber}" to test the tracking feature`
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Test order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create test order' },
      { status: 500 }
    );
  }
}
