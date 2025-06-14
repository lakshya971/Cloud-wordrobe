import { NextResponse } from 'next/server';

export async function GET() {
  // Generate a set of test tracking numbers
  const trackingNumbers = [
    {
      provider: 'Delhivery',
      trackingNumber: 'DL12345678',
      status: 'In Transit'
    },
    {
      provider: 'Blue Dart',
      trackingNumber: 'BD87654321',
      status: 'Out for Delivery'
    },
    {
      provider: 'DTDC',
      trackingNumber: 'DT19283746',
      status: 'Shipped'
    },
    {
      provider: 'FedEx',
      trackingNumber: 'FX98765432',
      status: 'Delivered'
    }
  ];

  return NextResponse.json({
    success: true,
    message: 'Use these tracking numbers to test the tracking system',
    trackingNumbers
  });
}
