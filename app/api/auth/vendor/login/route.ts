import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, initializeDatabase } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    // Initialize database on first request
    await initializeDatabase();
    
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify user is a vendor
    if (!user.isVendor) {
      return NextResponse.json(
        { success: false, message: 'Not a vendor account. Please use customer login.' },
        { status: 403 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: 'vendor', // Ensure role is set to vendor
        isVendor: true,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return the token and user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error('Vendor login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
