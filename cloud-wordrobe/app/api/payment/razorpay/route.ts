import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay only if we have valid credentials
let razorpay: Razorpay | null = null;

const initializeRazorpay = () => {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (keyId && keySecret && keySecret !== 'your_razorpay_secret_key_here') {
    try {
      razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
      return true;
    } catch (error) {
      console.error('Failed to initialize Razorpay:', error);
      return false;
    }
  }
  return false;
};

export async function POST(request: NextRequest) {
  let amount: number = 100; // Default fallback amount
  let currency: string = 'INR'; // Default currency
  let receipt: string = `receipt_default_${Date.now()}`; // Default receipt

  try {
    console.log('Razorpay POST request received');
    
    const requestData = await request.json();
    amount = requestData.amount || 100;
    currency = requestData.currency || 'INR';
    receipt = requestData.receipt || `receipt_${Date.now()}`;
    const description = requestData.description || 'Cloud Wardrobe Purchase';
    const customerInfo = requestData.customerInfo || {};
    
    console.log('Request data:', { amount, currency, receipt, description });

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Try to initialize Razorpay with valid credentials
    const isRazorpayInitialized = initializeRazorpay();

    // For development/testing, create a mock order if Razorpay is not properly configured
    if (!isRazorpayInitialized) {
      console.log('Using mock order for development - Razorpay not configured');
      const mockOrder = {
        id: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency: currency,
        receipt: receipt || `receipt_${Date.now()}`,
        status: 'created'
      };

      return NextResponse.json({
        success: true,
        order_id: mockOrder.id,
        amount: mockOrder.amount,
        currency: mockOrder.currency,
        mock: true, // Flag to indicate this is a mock order
      });
    }

    // Create actual Razorpay order with enhanced options
    console.log('Creating Razorpay order with valid credentials');
    const orderOptions: any = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        description,
        customer_name: customerInfo.name || '',
        customer_email: customerInfo.email || '',
        created_at: new Date().toISOString(),
      },
    };

    const order = await razorpay!.orders.create(orderOptions);

    console.log('Order created successfully:', order.id);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      mock: false, // Flag to indicate this is a real order
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    
    // Fallback to mock order on error
    console.log('Falling back to mock order due to error');
    const mockOrder = {
      id: `order_fallback_${Date.now()}`,
      amount: (amount || 100) * 100,
      currency: currency || 'INR',
      receipt: receipt || `receipt_fallback_${Date.now()}`,
      status: 'created'
    };

    return NextResponse.json({
      success: true,
      order_id: mockOrder.id,
      amount: mockOrder.amount,
      currency: mockOrder.currency,
      mock: true,
      fallback: true, // Flag to indicate this is a fallback mock order
      error_details: error.message,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Razorpay payment endpoint',
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    configured: !!process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_SECRET !== 'your_razorpay_secret_key_here',
  });
}
