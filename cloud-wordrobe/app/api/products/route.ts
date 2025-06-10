import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      category: searchParams.get('category'),
      location: searchParams.get('location'),
      availableForRent: searchParams.get('rent') === 'true',
      availableForBuy: searchParams.get('buy') === 'true',
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
    };

    const products = await getProducts(filters);

    return NextResponse.json({
      products,
      total: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}