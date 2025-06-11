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
}

export interface PaymentResponse {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  signature?: string;
  error?: string;
}

class PaymentService {
  private razorpayKeyId: string;

  constructor() {
    this.razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  }

  // Load Razorpay script dynamically
  async loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
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
  }

  // Main payment processing function
  async processPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      // Load Razorpay script
      const isScriptLoaded = await this.loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order
      const orderData = await this.createOrder(paymentData);

      // Handle mock payments for development
      if (orderData.mock) {
        return this.handleMockPayment(orderData, paymentData);
      }

      // Process real payment
      return new Promise((resolve, reject) => {
        const options = {
          key: this.razorpayKeyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Cloud Wardrobe',
          description: paymentData.description || 'Purchase from Cloud Wardrobe',
          order_id: orderData.order_id,
          handler: async (response: any) => {
            try {
              // Verify payment signature
              const verificationResult = await this.verifyPayment(response);
              
              if (verificationResult.success) {
                resolve({
                  success: true,
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                });
              } else {
                reject({
                  success: false,
                  error: 'Payment verification failed',
                });
              }
            } catch (error) {
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
              reject({
                success: false,
                error: 'Payment cancelled by user',
              });
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });
    } catch (error: any) {
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
    
    return {
      success: true,
      orderId: mockResponse.razorpay_order_id,
      paymentId: mockResponse.razorpay_payment_id,
      signature: mockResponse.razorpay_signature,
    };
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
  }
): Promise<PaymentResponse> {
  const paymentData: PaymentData = {
    amount: total,
    currency: 'INR',
    description: `Cart purchase - ${cartItems.length} items`,
    customerInfo,
    items: cartItems,
  };

  return await paymentService.processPayment(paymentData);
}

// Utility function for vendor registration payments
export async function processVendorRegistrationPayment(data: {
  amount: number;
  vendorData: any;
  customerInfo?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}): Promise<PaymentResponse> {
  const paymentData: PaymentData = {
    amount: data.amount,
    currency: 'INR',
    description: `Vendor registration - ${data.vendorData.businessName}`,
    customerInfo: data.customerInfo,
  };

  return await paymentService.processPayment(paymentData);
}
