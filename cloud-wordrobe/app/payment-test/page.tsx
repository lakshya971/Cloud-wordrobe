"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { QrCode, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import QRPaymentModal from '@/components/ui/qr-payment-modal';
import { paymentService } from '@/lib/payment-service';

const PaymentTestPage = () => {
  const [amount, setAmount] = useState('100');
  const [customerName, setCustomerName] = useState('Test Customer');
  const [customerEmail, setCustomerEmail] = useState('test@example.com');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrPaymentData, setQrPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQRPayment = async () => {
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      const orderData = await paymentService.createOrder({
        amount: parseInt(amount),
        currency: 'INR',
        description: 'Test QR Payment',
        customerInfo: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        enableQRCode: true,
      });

      const qrData = paymentService.generateUPILink(orderData, {
        amount: parseInt(amount),
        description: 'Test QR Payment',
        customerInfo: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        enableQRCode: true,
      });

      setQrPaymentData({
        amount: parseInt(amount),
        orderId: orderData.order_id,
        qrCodeData: qrData,
        customerInfo: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
      });

      setShowQRModal(true);
      toast.success('QR Code generated successfully!');
    } catch (error) {
      toast.error('Failed to generate QR code');
      console.error('QR generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegularPayment = async () => {
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await paymentService.processPayment({
        amount: parseInt(amount),
        currency: 'INR',
        description: 'Test Regular Payment',
        customerInfo: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        enableQRCode: false,
        preferredMethod: 'default',
      });

      if (result.success) {
        toast.success('Payment completed successfully!');
      } else {
        toast.error(result.error || 'Payment failed');
      }
    } catch (error) {
      toast.error('Payment processing failed');
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQRPaymentSuccess = (paymentData: any) => {
    toast.success('QR Payment completed successfully!');
    setShowQRModal(false);
    console.log('Payment successful:', paymentData);
  };

  const handleQRPaymentFailed = (error: string) => {
    toast.error(`Payment failed: ${error}`);
    setShowQRModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-6 w-6 text-orange-500" />
              Payment Gateway Test
            </CardTitle>
            <p className="text-sm text-gray-600">
              Test the QR code payment functionality and regular Razorpay integration
            </p>
          </CardHeader>
        </Card>

        {/* Test Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount (₹) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Customer Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <QrCode className="h-5 w-5" />
                QR Code Payment
              </CardTitle>
              <p className="text-sm text-gray-600">
                Generate QR code for UPI payment
              </p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleQRPayment}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    Generate QR Code
                  </div>
                )}
              </Button>
              <div className="mt-3 space-y-1">
                <Badge variant="outline" className="text-xs">PhonePe</Badge>
                <Badge variant="outline" className="text-xs">Google Pay</Badge>
                <Badge variant="outline" className="text-xs">Paytm</Badge>
                <Badge variant="outline" className="text-xs">BHIM</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <CreditCard className="h-5 w-5" />
                Regular Payment
              </CardTitle>
              <p className="text-sm text-gray-600">
                Standard Razorpay checkout
              </p>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleRegularPayment}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Open Razorpay
                  </div>
                )}
              </Button>
              <div className="mt-3 space-y-1">
                <Badge variant="outline" className="text-xs">Cards</Badge>
                <Badge variant="outline" className="text-xs">Net Banking</Badge>
                <Badge variant="outline" className="text-xs">Wallets</Badge>
                <Badge variant="outline" className="text-xs">UPI</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><strong>QR Code Payment:</strong> Generates a UPI QR code that can be scanned with any UPI app</li>
              <li><strong>Regular Payment:</strong> Opens the standard Razorpay checkout with all payment options</li>
              <li><strong>Development Mode:</strong> Uses mock orders for testing when Razorpay is not configured</li>
              <li><strong>Auto-detection:</strong> Checks payment status automatically every 10 seconds</li>
            </ul>
          </CardContent>
        </Card>

        {/* Back to Cart */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/cart'}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shopping Cart
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* QR Payment Modal */}
      {showQRModal && qrPaymentData && (
        <QRPaymentModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          paymentData={qrPaymentData}
          onPaymentSuccess={handleQRPaymentSuccess}
          onPaymentFailed={handleQRPaymentFailed}
        />
      )}
    </div>
  );
};

export default PaymentTestPage;
