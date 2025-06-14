import { NextResponse } from 'next/server';

export async function GET() {
  // Generate sample tracking numbers for testing
  const sampleTrackingNumbers = [
    {
      provider: "Delhivery",
      trackingNumber: "DL" + generateRandomTrackingId(),
      status: "In Transit"
    },
    {
      provider: "Blue Dart",
      trackingNumber: "BD" + generateRandomTrackingId(),
      status: "Shipped"
    },
    {
      provider: "DTDC",
      trackingNumber: "DT" + generateRandomTrackingId(),
      status: "Delivered"
    },
    {
      provider: "FedEx",
      trackingNumber: "FX" + generateRandomTrackingId(),
      status: "Out for Delivery"
    },
    {
      provider: "Ecom Express",
      trackingNumber: "EC" + generateRandomTrackingId(),
      status: "Processing"
    }
  ];

  return NextResponse.json({
    success: true,
    message: 'Test tracking numbers generated',
    trackingNumbers: sampleTrackingNumbers,
    instructions: 'Use any of these tracking numbers in the tracking page to test the functionality'
  });
}

// Helper function to generate a random tracking ID
function generateRandomTrackingId() {
  return Math.random().toString(36).substring(2, 6).toUpperCase() +
         Math.random().toString(10).substring(2, 8);
}
