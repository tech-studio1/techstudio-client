import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get form data from SSLCommerz callback
    const formData = await request.formData();
    const tran_id = formData.get('tran_id') as string;

    // Get the base URL from headers
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    // Redirect to fail page with 303 status (changes POST to GET)
    return NextResponse.redirect(`${baseUrl}/payment/fail`, 303);
  } catch (error) {
    console.error('Payment fail callback error:', error);
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    return NextResponse.redirect(`${protocol}://${host}/payment/fail`, 303);
  }
}

export async function GET(request: NextRequest) {
  // Also handle GET requests
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  return NextResponse.redirect(`${protocol}://${host}/payment/fail`, 303);
}
