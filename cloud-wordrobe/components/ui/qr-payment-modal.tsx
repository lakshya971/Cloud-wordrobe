import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Smartphone, CheckCircle, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';

export interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: {
    amount: number;
    orderId: string;
    qrCodeData: string;
    customerInfo?: {
      name?: string;
      email?: string;
      contact?: string;
    };
  };
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentFailed: (error: string) => void;
}

const QRPaymentModal: React.FC<QRPaymentModalProps> = ({
  isOpen,
  onClose,
  paymentData,
  onPaymentSuccess,
  onPaymentFailed,
}) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timeout
  const [isChecking, setIsChecking] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'success' | 'failed' | 'expired'>('pending');

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-check payment status every 10 seconds
    const statusChecker = setInterval(() => {
      if (paymentStatus === 'pending') {
        checkPaymentStatus();
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(statusChecker);
    };
  }, [isOpen, paymentStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const copyUPIId = () => {
    const upiId = 'cloudwardrobe@paytm'; // Extract UPI ID from QR data
    copyToClipboard(upiId, 'UPI ID');
  };

  const openUPIApp = () => {
    // Try to open UPI app directly
    window.open(paymentData.qrCodeData, '_blank');
  };

  const checkPaymentStatus = async () => {
    setIsChecking(true);
    try {
      // Simulate payment check - replace with actual API call
      const response = await fetch(`/api/payment/status/${paymentData.orderId}`);
      const result = await response.json();
      
      if (result.status === 'paid') {
        setPaymentStatus('success');
        onPaymentSuccess({
          orderId: paymentData.orderId,
          paymentId: result.paymentId,
          amount: paymentData.amount,
        });
      } else if (result.status === 'failed') {
        setPaymentStatus('failed');
        onPaymentFailed('Payment failed or was cancelled');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleRefreshStatus = () => {
    checkPaymentStatus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Smartphone className="h-6 w-6 text-blue-500" />
            Pay with QR Code
          </CardTitle>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-600">₹{paymentData.amount}</p>
            <Badge variant="outline" className="text-xs">
              Order ID: {paymentData.orderId}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment Status */}
          <div className="text-center">
            {paymentStatus === 'pending' && (
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <Clock className="h-4 w-4" />
                <span>Waiting for payment</span>
              </div>
            )}
            {paymentStatus === 'checking' && (
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Checking payment status...</span>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Payment successful!</span>
              </div>
            )}
            {paymentStatus === 'expired' && (
              <div className="text-red-600">
                <span>Payment expired</span>
              </div>
            )}
          </div>

          {/* Timer */}
          {paymentStatus === 'pending' && (
            <div className="text-center">
              <div className="text-sm text-gray-600">Time remaining</div>
              <div className="text-2xl font-mono font-bold text-orange-600">
                {formatTime(timeLeft)}
              </div>
            </div>
          )}

          {/* QR Code */}
          {(paymentStatus === 'pending' || paymentStatus === 'checking') && (
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <QRCode
                    value={paymentData.qrCodeData}
                    size={200}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 200 200`}
                  />
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p className="font-medium mb-2">Scan with any UPI app</p>
                <div className="flex justify-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">PhonePe</Badge>
                  <Badge variant="outline" className="text-xs">Google Pay</Badge>
                  <Badge variant="outline" className="text-xs">Paytm</Badge>
                  <Badge variant="outline" className="text-xs">BHIM</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {(paymentStatus === 'pending' || paymentStatus === 'checking') && (
              <>
                <Button 
                  onClick={openUPIApp}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in UPI App
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={copyUPIId}
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy UPI ID
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleRefreshStatus}
                    disabled={isChecking}
                    size="sm"
                  >
                    {isChecking ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Check Status
                  </Button>
                </div>
              </>
            )}

            {/* Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">How to pay:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Open your UPI app (PhonePe, Google Pay, etc.)</li>
                  <li>2. Scan the QR code above</li>
                  <li>3. Enter your UPI PIN to complete payment</li>
                  <li>4. Payment confirmation will appear automatically</li>
                </ol>
              </CardContent>
            </Card>

            {/* Close Button */}
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              {paymentStatus === 'success' ? 'Continue' : 'Cancel Payment'}
            </Button>
          </div>

          {/* Order Details */}
          {paymentData.customerInfo && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Order Details</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Name:</span> {paymentData.customerInfo.name}</p>
                  <p><span className="font-medium">Email:</span> {paymentData.customerInfo.email}</p>
                  <p><span className="font-medium">Phone:</span> {paymentData.customerInfo.contact}</p>
                  <p><span className="font-medium">Amount:</span> ₹{paymentData.amount}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRPaymentModal;
