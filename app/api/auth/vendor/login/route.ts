import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Replace this with your actual database authentication logic
    // This is a mock response for demonstration
    if (email && password) {
      const mockUser = {
        id: 1,
        email: email,
        name: 'Vendor Name',
        role: 'vendor',
        isVendor: true,
        vendorPaid: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return NextResponse.json({
        success: true,
        token: 'mock_vendor_token',
        user: mockUser
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Vendor login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
