import { NextResponse } from 'next/server';
import { fetchProductsFromGoogleSheets } from '@/lib/sheets';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const products = await fetchProductsFromGoogleSheets();
    return NextResponse.json(
      {
        success: true,
        count: products.length,
        source: 'google-sheets',
        products,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('API /api/products error:', error);
    return NextResponse.json(
      {
        success: false,
        count: 0,
        products: [],
        error: 'Failed to fetch products from Google Sheet',
      },
      { status: 500 }
    );
  }
}
