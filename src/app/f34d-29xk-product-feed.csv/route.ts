import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/v1/products/product-feed.csv`,
    );

    if (!res.ok) {
      return new NextResponse('Failed to fetch product feed', { status: 502 });
    }

    const csvData = await res.arrayBuffer();

    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="product-feed.csv"',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return new NextResponse('Error fetching feed', { status: 500 });
  }
}
