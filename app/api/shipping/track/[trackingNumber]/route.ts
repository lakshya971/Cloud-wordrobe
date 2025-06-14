import { NextRequest, NextResponse } from 'next/server';
import ShippingService from '@/lib/shipping-service';

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

    const shippingService = ShippingService.getInstance();
    const trackingInfo = await shippingService.getTrackingInfo('', trackingNumber);

    if (!trackingInfo) {
      return NextResponse.json(
        { error: 'Tracking information not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: trackingInfo
    });

  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking information' },
      { status: 500 }
    );
  }
}

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
        estimatedDelivery: shipment.estimatedDelivery,
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
