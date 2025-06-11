import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, initializeDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Initialize database on first request
    await initializeDatabase();
    
    const { email, password, name, phone } = await request.json();

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

    // Create user
    const userId = await createUser({
      email,
      password: hashedPassword,
      name,
      phone,
      role: 'customer',
      isVendor: false,
      vendorPaid: false,
    });

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