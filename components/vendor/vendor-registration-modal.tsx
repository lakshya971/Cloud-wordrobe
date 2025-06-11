"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  CreditCard,
  CheckCircle,
  X,
  ArrowRight,
  ShoppingBag,
  IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { processVendorRegistrationPayment } from '@/lib/payment-service';

interface VendorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VendorFormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  businessType: string;
  description: string;
  gstNumber?: string;
}

export function VendorRegistrationModal({ isOpen, onClose }: VendorRegistrationModalProps) {
  const { user, login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<VendorFormData>({
    businessName: '',
    ownerName: user?.name || '',
    email: user?.email || '',
    phone: '',
    businessAddress: '',
    city: '',
    state: '',
    pincode: '',
    businessType: 'fashion',
    description: '',
    gstNumber: '',
  });

  const totalSteps = 3;
  const registrationFee = 199;

  const handleInputChange = (field: keyof VendorFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Process payment for vendor registration
      const paymentResult = await processVendorRegistrationPayment({
        amount: registrationFee,
        vendorData: formData,
        customerInfo: {
          name: formData.ownerName,
          email: formData.email,
          contact: formData.phone,
        }
      });

      if (paymentResult.success) {
        // Submit vendor registration after successful payment
        const response = await fetch('/api/vendor/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            paymentId: paymentResult.paymentId,
            orderId: paymentResult.orderId,
            signature: paymentResult.signature,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success('Vendor registration successful! Welcome to Cloud Wardrobe.');
          
          // Update user context if logged in
          if (user) {
            // Refresh user data to reflect vendor status
            const updatedUser = { ...user, isVendor: true, vendorPaid: true };
            login(localStorage.getItem('authToken') || '', updatedUser);
          }
          
          onClose();
          // Redirect to vendor dashboard
          window.location.href = '/dashboard';
        } else {
          toast.error(result.error || 'Registration failed');
        }
      } else {
        toast.error(paymentResult.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Vendor registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.ownerName && formData.email && formData.phone;
      case 2:
        return formData.businessAddress && formData.city && formData.state && formData.pincode;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Store className="h-6 w-6 text-orange-500" />
            Become a Vendor
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`h-1 w-16 mx-2 ${
                    step < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <div className="relative mt-1">
                      <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Your business name"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="ownerName">Owner Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="Your full name"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 1234567890"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your business..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Business Address */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Address</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessAddress">Address *</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="businessAddress"
                        value={formData.businessAddress}
                        onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                        placeholder="Complete business address"
                        className="pl-10"
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="123456"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                    <Input
                      id="gstNumber"
                      value={formData.gstNumber}
                      onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                      placeholder="GSTIN (if applicable)"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-4">Complete Registration</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-orange-500" />
                      Registration Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Business Name:</span>
                        <span className="font-medium">{formData.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Owner:</span>
                        <span className="font-medium">{formData.ownerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="font-medium">{formData.city}, {formData.state}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Registration Fee</span>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          <span className="text-xl font-bold text-orange-500">{registrationFee}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Access to vendor dashboard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Product listing capabilities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Order management tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>24/7 support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNextStep}
              disabled={!isStepValid()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !isStepValid()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay ₹{registrationFee} & Register
                </div>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
