import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, ownerName, email, phone, password } = body;

    // TODO: Replace this with your actual vendor registration logic
    // This is a mock response for demonstration
    if (businessName && ownerName && email && phone && password) {
      return NextResponse.json({
        success: true,
        message: 'Vendor registration successful. Please wait for approval.'
      });
    }

    return NextResponse.json(
      { success: false, message: 'Missing required fields' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Vendor registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
