import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, getUserByEmail, updateUser } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Initialize database
    await initializeDatabase();
    
    const {
      businessName,
      ownerName,
      email,
      phone,
      businessAddress,
      city,
      state,
      pincode,
      businessType,
      description,
      gstNumber,
      paymentId,
      orderId,
      signature,
    } = await request.json();

    // Validation
    if (!businessName || !ownerName || !email || !phone || !businessAddress || !city || !state || !pincode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { error: 'Payment information required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found. Please register first.' },
        { status: 404 }
      );
    }

    // Check if user is already a vendor
    if (existingUser.isVendor && existingUser.vendorPaid) {
      return NextResponse.json(
        { error: 'User is already a registered vendor' },
        { status: 409 }
      );
    }

    // Update user to vendor status
    const vendorData = {
      isVendor: true,
      vendorPaid: true,
      vendorInfo: JSON.stringify({
        businessName,
        ownerName,
        phone,
        businessAddress,
        city,
        state,
        pincode,
        businessType: businessType || 'fashion',
        description: description || '',
        gstNumber: gstNumber || '',
        registrationDate: new Date().toISOString(),
        paymentDetails: {
          paymentId,
          orderId,
          signature,
          amount: 199,
          currency: 'INR',
        },
      }),
    };

    const updated = await updateUser(existingUser.id, vendorData);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update user to vendor status' },
        { status: 500 }
      );
    }

    // Log vendor registration
    console.log('New vendor registered:', {
      userId: existingUser.id,
      email,
      businessName,
      paymentId,
      registrationDate: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Vendor registration completed successfully',
      vendorId: existingUser.id,
      businessName,
    });

  } catch (error) {
    console.error('Vendor registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
