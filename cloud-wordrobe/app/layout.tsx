import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { RentalProvider } from '@/contexts/RentalContext';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Cloud Wardrobe - Buy it. Rent it. Wear it.',
  description: 'A Smart Wardrobe Powered by the Community. Multi-vendor marketplace for fashion and lifestyle products.',
  keywords: 'fashion, wardrobe, rent clothes, buy clothes, marketplace, vendors',
  authors: [{ name: 'Cloud Wardrobe Team' }],
  openGraph: {
    title: 'Cloud Wardrobe - Buy it. Rent it. Wear it.',
    description: 'A Smart Wardrobe Powered by the Community',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <RentalProvider>
                  {children}
                  <Toaster />
                </RentalProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}