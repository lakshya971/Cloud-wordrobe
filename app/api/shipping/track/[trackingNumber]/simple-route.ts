import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    const { trackingNumber } = params;

    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    // Mock tracking data for demo purposes
    const mockTrackingData = {
      orderId: `ORD${Math.floor(Math.random() * 100000)}`,
      trackingNumber,
      provider: getProviderFromTrackingNumber(trackingNumber),
      status: getRandomStatus(),
      estimatedDelivery: new Date(Date.now() + 86400000), // Tomorrow
      currentLocation: 'Mumbai Distribution Center',
      events: generateTrackingEvents(trackingNumber)
    };

    return NextResponse.json({
      success: true,
      data: mockTrackingData
    });

  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking information' },
      { status: 500 }
    );
  }
}

// Helper functions
function getProviderFromTrackingNumber(trackingNumber: string): string {
  const firstTwoChars = trackingNumber.substring(0, 2).toUpperCase();
  const providers: {[key: string]: string} = {
    'DL': 'Delhivery',
    'BD': 'Blue Dart',
    'DT': 'DTDC',
    'FX': 'FedEx',
    'EC': 'Ecom Express'
  };
  
  return providers[firstTwoChars] || 'Cloud Wardrobe Logistics';
}

function getRandomStatus(): string {
  const statuses = ['Order Placed', 'Processing', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateTrackingEvents(trackingNumber: string) {
  const now = new Date();
  const events = [];
  
  // Order placed (3 days ago)
  const orderPlacedDate = new Date(now);
  orderPlacedDate.setDate(now.getDate() - 3);
  events.push({
    timestamp: orderPlacedDate,
    status: 'Order Placed',
    description: 'Your order has been confirmed and is being processed',
    isCompleted: true
  });
  
  // Processing (2 days ago)
  const processingDate = new Date(now);
  processingDate.setDate(now.getDate() - 2);
  events.push({
    timestamp: processingDate,
    status: 'Processing',
    description: 'Your order is being prepared for shipment',
    location: 'Fulfillment Center, Mumbai',
    isCompleted: true
  });
  
  // Shipped (1 day ago)
  const shippedDate = new Date(now);
  shippedDate.setDate(now.getDate() - 1);
  events.push({
    timestamp: shippedDate,
    status: 'Shipped',
    description: `Package picked up by ${getProviderFromTrackingNumber(trackingNumber)}`,
    location: 'Mumbai Distribution Center',
    isCompleted: true
  });
  
  // In Transit (Today)
  events.push({
    timestamp: new Date(),
    status: 'In Transit',
    description: 'Package is moving towards destination',
    location: 'Mumbai Distribution Center',
    isCompleted: true
  });
  
  return events;
}
