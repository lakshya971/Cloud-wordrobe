import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

    // Get the secret key from environment
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpaySecret || razorpaySecret === 'your_razorpay_secret_key_here') {
      // For development/testing, accept mock payments
      if (razorpay_payment_id.startsWith('pay_mock_')) {
        console.log('Mock payment verification - accepting for development');
        return NextResponse.json({
          success: true,
          message: 'Mock payment verified successfully',
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
        });
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment gateway not configured properly' 
        },
        { status: 500 }
      );
    }

    // Verify the payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid payment signature' 
        },
        { status: 400 }
      );
    }

    // Payment is verified successfully
    console.log('Payment verified successfully:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });

    // Here you can:
    // 1. Update your database with the payment details
    // 2. Send confirmation emails
    // 3. Update order status
    // 4. Clear the cart
    // 5. Trigger any post-payment workflows

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Payment verification failed' 
      },
      { status: 500 }
    );
  }
}
