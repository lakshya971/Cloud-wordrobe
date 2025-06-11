import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!webhookSecret) {
      console.log('Webhook secret not configured, skipping verification');
      return NextResponse.json({ success: true });
    }

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    console.log('Webhook event received:', event.event);

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity);
        break;
      
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(payment: any) {
  console.log('Payment captured:', payment.id);
  
  // Here you can:
  // 1. Update order status in database
  // 2. Send confirmation emails
  // 3. Trigger fulfillment workflows
  // 4. Update inventory
  
  // Example: Update order status
  // await updateOrderStatus(payment.order_id, 'paid');
}

async function handlePaymentFailed(payment: any) {
  console.log('Payment failed:', payment.id);
  
  // Handle failed payments:
  // 1. Send notification to customer
  // 2. Log for analysis
  // 3. Update order status
}

async function handleOrderPaid(order: any) {
  console.log('Order paid:', order.id);
  
  // Handle completed orders:
  // 1. Start fulfillment process
  // 2. Update inventory
  // 3. Send notifications
}
