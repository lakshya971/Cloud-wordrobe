"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function PaymentTestPage() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/payment/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await response.json();
      
      if (data.success) {
        // For test purposes, just show success
        alert('Payment test successful!');
      } else {
        throw new Error(data.error || 'Payment test failed');
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Payment Test</CardTitle>
            <CardDescription>
              Test the payment integration with a mock transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount (INR)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in INR"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="1"
                  className="block w-full"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Test Payment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
