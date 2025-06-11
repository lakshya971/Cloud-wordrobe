# Razorpay Setup Guide

## 🚀 Quick Setup Steps

### 1. Get Razorpay Account
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account or login
3. Complete the verification process

### 2. Get API Keys
1. Go to **Settings** → **API Keys**
2. Click **Generate Test Key** (for development)
3. Copy both keys:
   - **Key ID** (Public) - starts with `rzp_test_`
   - **Key Secret** (Private) - keep this secret!

### 3. Update Environment Variables
Edit your `.env.local` file and replace:

```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_secret_key_here
```

**Example format:**
```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1Ab2Cd3Ef4Gh5Ij6
RAZORPAY_KEY_SECRET=abcdef1234567890abcdef1234567890abcdef12
```

### 4. Restart Development Server
After updating the keys, restart your development server:
```bash
npm run dev
```

### 5. Test Payment
1. Go to your cart page
2. Click "Proceed to Payment"
3. Razorpay checkout should now open properly

## 🔍 Testing

### Test Cards (for Test Mode)
- **Success**: 4111 1111 1111 1111
- **Failed**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI
- **Success**: success@razorpay
- **Failed**: failure@razorpay

## 🛠️ Troubleshooting

### Payment Gateway Not Opening?
1. Check browser console for errors
2. Verify API keys are correct
3. Ensure development server is restarted
4. Check network tab for API responses

### Still Getting Mock Orders?
- Make sure `RAZORPAY_KEY_SECRET` is not the placeholder value
- Verify both keys are from the same Razorpay account
- Check the API response at `/api/payment/razorpay` (GET request)

## 📱 Production Setup

When ready for production:
1. Get **Live Keys** from Razorpay dashboard
2. Complete KYC verification
3. Update environment variables with live keys:
   ```bash
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_live_key
   RAZORPAY_KEY_SECRET=your_live_secret_key
   ```

## 🔗 Useful Links
- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Test Credentials](https://razorpay.com/docs/payments/payments/test-card-upi-details/)
