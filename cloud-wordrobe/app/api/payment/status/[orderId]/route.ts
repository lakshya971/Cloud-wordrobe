import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // For development/testing - simulate payment status check
    if (orderId.startsWith('order_mock_') || orderId.startsWith('order_fallback_')) {
      // Simulate random payment status for testing
      const statuses = ['pending', 'paid', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return NextResponse.json({
        orderId,
        status: randomStatus,
        paymentId: randomStatus === 'paid' ? `pay_mock_${Date.now()}` : null,
        amount: 100, // Mock amount
        timestamp: new Date().toISOString(),
        mock: true,
      });
    }

    // For production - integrate with actual Razorpay API
    // You would fetch the order status from Razorpay here
    
    try {
      // Initialize Razorpay (you should move this to a service)
      const Razorpay = require('razorpay');
      
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // Fetch order details from Razorpay
      const order = await razorpay.orders.fetch(orderId);
      
      // Fetch payments for this order
      const payments = await razorpay.orders.fetchPayments(orderId);
      
      let status = 'pending';
      let paymentId = null;
      
      if (payments.items && payments.items.length > 0) {
        const latestPayment = payments.items[0];
        
        switch (latestPayment.status) {
          case 'captured':
            status = 'paid';
            paymentId = latestPayment.id;
            break;
          case 'failed':
            status = 'failed';
            break;
          case 'authorized':
            status = 'pending';
            break;
          default:
            status = 'pending';
        }
      }

      return NextResponse.json({
        orderId: order.id,
        status,
        paymentId,
        amount: order.amount / 100, // Convert from paise to rupees
        currency: order.currency,
        timestamp: new Date().toISOString(),
        orderStatus: order.status,
        mock: false,
      });

    } catch (razorpayError) {
      console.error('Razorpay API error:', razorpayError);
      
      // Fallback to mock response if Razorpay is not configured
      return NextResponse.json({
        orderId,
        status: 'pending',
        paymentId: null,
        amount: 100,
        timestamp: new Date().toISOString(),
        mock: true,
        fallback: true,
        error: 'Payment gateway not configured',
      });
    }

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check payment status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    const body = await request.json();
    
    // Handle manual payment confirmation
    // This could be used for offline payments or manual verification
    
    return NextResponse.json({
      orderId,
      status: 'confirmed',
      message: 'Payment manually confirmed',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Manual payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
