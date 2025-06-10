// Payment service for Razorpay integration
import { toast } from 'sonner';

// Declare global window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentData {
  amount: number;
  currency?: string;
  description?: string;
  customerInfo?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  items?: any[];
  enableQRCode?: boolean; // New option for QR code payments
  preferredMethod?: 'default' | 'qr' | 'upi'; // Payment method preference
}

export interface PaymentResponse {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  signature?: string;
  error?: string;
  qrCodeData?: string; // QR code string for payments
  upiId?: string; // UPI ID for direct payments
}

class PaymentService {
  private razorpayKeyId: string;

  constructor() {
    this.razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
    console.log('💳 Payment Service initialized with key:', this.razorpayKeyId ? 'Key found' : 'No key found');
    
    if (!this.razorpayKeyId) {
      console.warn('⚠️ Razorpay Key ID not found in environment variables');
    }
  }
  // Load Razorpay script dynamically
  async loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        console.log('Razorpay script already loaded');
        resolve(true);
        return;
      }

      console.log('Loading Razorpay script...');
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // Create order on backend
  async createOrder(paymentData: PaymentData): Promise<any> {
    try {
      const response = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: paymentData.currency || 'INR',
          receipt: `receipt_${Date.now()}`,
          description: paymentData.description,
          customerInfo: paymentData.customerInfo,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderData = await response.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      return orderData;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  }

  // Verify payment on backend
  async verifyPayment(paymentData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Promise<any> {
    try {
      const response = await fetch('/api/payment/razorpay/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }  // Main payment processing function
  async processPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      console.log('🚀 Starting payment process:', paymentData);
      
      // Load Razorpay script
      const isScriptLoaded = await this.loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load payment gateway script');
      }

      // Create order
      console.log('📝 Creating order...');
      const orderData = await this.createOrder(paymentData);
      console.log('✅ Order created:', orderData);

      // Handle mock payments for development
      if (orderData.mock) {
        console.log('🧪 Processing mock payment');
        return this.handleMockPayment(orderData, paymentData);
      }

      // Generate QR code data if requested
      let qrCodeData = '';
      if (paymentData.enableQRCode) {
        qrCodeData = this.generateQRCodeData(orderData, paymentData);
        console.log('📱 QR Code generated for payment');
      }      // Process real payment with enhanced options
      console.log('💳 Opening Razorpay checkout...');
      return new Promise((resolve, reject) => {
        // Simplified options for testing
        const options = {
          key: this.razorpayKeyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Cloud Wardrobe',
          description: paymentData.description || 'Purchase from Cloud Wardrobe',
          order_id: orderData.order_id,
          handler: async (response: any) => {
            try {
              console.log('✅ Payment completed, verifying...', response);
              
              // Verify payment signature
              const verificationResult = await this.verifyPayment(response);
              
              if (verificationResult.success) {
                console.log('✅ Payment verification successful');
                resolve({
                  success: true,
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  qrCodeData: qrCodeData,
                });
              } else {
                console.error('❌ Payment verification failed');
                reject({
                  success: false,
                  error: 'Payment verification failed',
                });
              }
            } catch (error) {
              console.error('❌ Payment verification error:', error);
              reject({
                success: false,
                error: 'Payment verification error',
              });
            }
          },
          prefill: {
            name: paymentData.customerInfo?.name || '',
            email: paymentData.customerInfo?.email || '',
            contact: paymentData.customerInfo?.contact || '',
          },
          theme: {
            color: '#f97316', // Orange color matching your brand
          },
          modal: {
            ondismiss: () => {
              console.log('❌ Payment cancelled by user');
              reject({
                success: false,
                error: 'Payment cancelled by user',
              });
            },
          },
          notes: {
            customer_name: paymentData.customerInfo?.name || '',
            items_count: paymentData.items?.length || 0,
          }
        };

        console.log('🔧 Razorpay options:', options);
        
        if (!window.Razorpay) {
          console.error('❌ Razorpay not available on window object');
          reject({
            success: false,
            error: 'Payment gateway not loaded properly',
          });
          return;
        }

        try {
          const razorpay = new window.Razorpay(options);
          console.log('🚀 Opening Razorpay modal...');
          razorpay.open();
        } catch (razorpayError) {
          console.error('❌ Error opening Razorpay:', razorpayError);
          reject({
            success: false,
            error: 'Failed to open payment gateway',
          });
        }
      });
    } catch (error: any) {
      console.error('❌ Payment process error:', error);
      return {
        success: false,
        error: error.message || 'Payment failed',
      };
    }
  }
  // Handle mock payments for development
  private handleMockPayment(orderData: any, paymentData: PaymentData): PaymentResponse {
    const mockResponse = {
      razorpay_payment_id: `pay_mock_${Date.now()}`,
      razorpay_order_id: orderData.order_id,
      razorpay_signature: `sig_mock_${Date.now()}`,
    };

    toast.success('Payment successful! (Development Mode)');
    
    const qrCodeData = paymentData.enableQRCode ? 
      this.generateQRCodeData(orderData, paymentData) : undefined;
    
    return {
      success: true,
      orderId: mockResponse.razorpay_order_id,
      paymentId: mockResponse.razorpay_payment_id,
      signature: mockResponse.razorpay_signature,
      qrCodeData: qrCodeData,
    };
  }

  // Generate QR code data for payments
  private generateQRCodeData(orderData: any, paymentData: PaymentData): string {
    // Generate UPI payment string for QR code
    const upiId = 'cloudwardrobe@paytm'; // Your business UPI ID
    const amount = (orderData.amount / 100).toFixed(2); // Convert from paise to rupees
    const transactionNote = encodeURIComponent(paymentData.description || 'Cloud Wardrobe Purchase');
    const merchantName = encodeURIComponent('Cloud Wardrobe');
    
    // Standard UPI payment URL format
    const upiString = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&tn=${transactionNote}&cu=INR&tr=${orderData.order_id}`;
    
    return upiString;
  }

  // Generate UPI payment link
  generateUPILink(orderData: any, paymentData: PaymentData): string {
    return this.generateQRCodeData(orderData, paymentData);
  }
}

// Global payment service instance
export const paymentService = new PaymentService();

// Utility function for cart payments
export async function processCartPayment(
  cartItems: any[],
  total: number,
  customerInfo?: {
    name?: string;
    email?: string;
    contact?: string;
  },
  options?: {
    enableQRCode?: boolean;
    preferredMethod?: 'default' | 'qr' | 'upi';
  }
): Promise<PaymentResponse> {
  const paymentData: PaymentData = {
    amount: total,
    currency: 'INR',
    description: `Cart purchase - ${cartItems.length} items`,
    customerInfo,
    items: cartItems,
    enableQRCode: options?.enableQRCode || false,
    preferredMethod: options?.preferredMethod || 'default',
  };

  return await paymentService.processPayment(paymentData);
}
