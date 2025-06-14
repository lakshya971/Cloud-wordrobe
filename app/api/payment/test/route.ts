import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // This is just a mock success response for testing
    return NextResponse.json({
      success: true,
      message: 'Payment test successful',
      amount,
      transactionId: `TEST_${Date.now()}`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
