import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, initializeDatabase } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    // Initialize database on first request
    await initializeDatabase();
    
    const { email, password, name, phone, userType = 'customer' } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Set user properties based on type
    const isVendor = userType === 'vendor';
    const role = isVendor ? 'vendor' : 'customer';
    
    // Create user
    const userId = await createUser({
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      isVendor,
      vendorPaid: isVendor, // Vendors are considered paid upon registration
    });

    // For vendor registration, create JWT token and auto-login
    if (isVendor) {
      const token = jwt.sign(
        {
          userId: userId,
          email: email,
          role: role,
          isVendor: isVendor,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const user = {
        id: userId,
        email,
        name,
        phone,
        role,
        isVendor,
        vendorPaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return NextResponse.json({
        message: 'Vendor account created successfully',
        user,
        token,
        userId
      }, { status: 201 });
    }

    return NextResponse.json(
      { message: 'User created successfully', userId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}