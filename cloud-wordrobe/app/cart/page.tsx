"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, CreditCard, Trash2, Shield, Clock, CheckCircle, User, Mail, Phone, QrCode, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { processCartPayment, PaymentResponse } from '@/lib/payment-service';
import QRPaymentModal from '@/components/ui/qr-payment-modal';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'upi'>('card');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrPaymentData, setQrPaymentData] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping above ₹1000
  const total = subtotal + tax + shipping;
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.contact) {
      toast.error('Please fill in all customer details');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Starting payment process for amount:', total);
      
      // Enhanced payment process with QR code support
      const paymentResult: PaymentResponse = await processCartPayment(
        cartItems,
        total,
        customerInfo,        {
          enableQRCode: paymentMethod === 'qr',
          preferredMethod: paymentMethod === 'card' ? 'default' : paymentMethod,
        }
      );

      if (paymentResult.success) {
        // Check if this is a QR code payment
        if (paymentMethod === 'qr' && paymentResult.qrCodeData) {
          // Show QR code modal
          setQrPaymentData({
            amount: total,
            orderId: paymentResult.orderId,
            qrCodeData: paymentResult.qrCodeData,
            customerInfo: customerInfo,
          });
          setShowQRModal(true);
        } else {
          // Handle regular payment success
          handlePaymentSuccess(paymentResult);
        }
      } else {
        toast.error(paymentResult.error || 'Payment failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentResult: PaymentResponse) => {
    toast.success('Payment successful! Thank you for your purchase.');
    
    // Store order details
    const orderDetails = {
      payment_id: paymentResult.paymentId,
      order_id: paymentResult.orderId,
      signature: paymentResult.signature,
      items: cartItems,
      total: total,
      customer: customerInfo,
      timestamp: new Date().toISOString(),
      paymentMethod: paymentMethod,
    };

    // Store in localStorage for order history
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart after successful payment
    clearCart();
    
    // Reset customer info
    setCustomerInfo({ name: '', email: '', contact: '' });
    setShowQRModal(false);
    
    console.log('Order completed successfully:', orderDetails);
  };

  const handleQRPaymentSuccess = (paymentData: any) => {
    handlePaymentSuccess({
      success: true,
      orderId: paymentData.orderId,
      paymentId: paymentData.paymentId,
    });
  };

  const handleQRPaymentFailed = (error: string) => {
    toast.error(error);
    setShowQRModal(false);
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-orange-500" />
            Shopping Cart
          </h1>
          <p className="text-xl text-muted-foreground">
            {cartItems.length > 0 
              ? `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
              : 'Your cart is empty'
            }
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/shop'}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Continue Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {item.vendor}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={item.type === 'rent' ? 'default' : 'secondary'}
                              className={item.type === 'rent' ? 'bg-orange-500' : ''}
                            >
                              {item.type === 'rent' ? `Rent (${item.duration})` : 'Purchase'}
                            </Badge>
                            {item.location && (
                              <Badge variant="outline" className="text-xs">
                                {item.location}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                              {item.originalPrice && item.originalPrice !== item.price && (
                                <p className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice * item.quantity}
                                </p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary and Customer Info */}
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={customerInfo.name}
                      onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>                  <div>
                    <Label htmlFor="contact">Phone Number *</Label>
                    <Input
                      id="contact"
                      placeholder="Enter your phone number"
                      value={customerInfo.contact}
                      onChange={(e) => handleCustomerInfoChange('contact', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div 
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className={`h-4 w-4 ${paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Card/UPI/Net Banking</h4>
                        <p className="text-xs text-gray-600">All payment methods via Razorpay</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        paymentMethod === 'card' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-1 h-1 bg-white rounded-full m-0.5" />}
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'qr' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('qr')}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className={`h-4 w-4 ${paymentMethod === 'qr' ? 'text-orange-500' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">QR Code Payment</h4>
                        <p className="text-xs text-gray-600">Scan & pay with any UPI app</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        paymentMethod === 'qr' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'qr' && <div className="w-1 h-1 bg-white rounded-full m-0.5" />}
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className={`h-4 w-4 ${paymentMethod === 'upi' ? 'text-orange-500' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">UPI Direct</h4>
                        <p className="text-xs text-gray-600">Pay using UPI ID</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        paymentMethod === 'upi' ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'upi' && <div className="w-1 h-1 bg-white rounded-full m-0.5" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Free shipping on orders above ₹1000
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  {/* Payment Security Info */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Secure Payment</span>
                    </div>
                    <p className="text-xs text-blue-700">
                      Your payment information is encrypted and secure. Powered by Razorpay.
                    </p>
                  </div>                  {/* Payment Button */}
                  <Button 
                    onClick={handlePayment}
                    disabled={isLoading || !customerInfo.name || !customerInfo.email || !customerInfo.contact}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {paymentMethod === 'qr' ? (
                          <QrCode className="h-4 w-4" />
                        ) : paymentMethod === 'upi' ? (
                          <Smartphone className="h-4 w-4" />
                        ) : (
                          <CreditCard className="h-4 w-4" />
                        )}
                        {paymentMethod === 'qr' ? 'Generate QR Code' : 
                         paymentMethod === 'upi' ? 'Pay with UPI' : 
                         'Proceed to Payment'} - ₹{total}
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}      </main>
      
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
      
      <Footer />
    </div>
  );
};

export default CartPage;
