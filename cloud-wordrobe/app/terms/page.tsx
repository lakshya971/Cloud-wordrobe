"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Cloud Wardrobe, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials on Cloud Wardrobe's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "3. User Accounts",
      content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account."
    },
    {
      title: "4. Vendor Terms",
      content: "Vendors must pay a one-time registration fee of ₹199 to list products. All products must be accurately described and in good condition. Vendors are responsible for product quality and customer service."
    },
    {
      title: "5. Rental Terms",
      content: "Rental periods are calculated excluding delivery and return dates. Security deposits are refundable upon return of items in original condition. Late returns may incur additional charges."
    },
    {
      title: "6. Payment Terms",
      content: "All payments are processed securely through our payment partners. Refunds are processed according to our refund policy. Vendors receive payouts after successful order completion."
    },
    {
      title: "7. Prohibited Uses",
      content: "You may not use our service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction when using our service."
    },
    {
      title: "8. Privacy Policy",
      content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service."
    },
    {
      title: "9. Limitation of Liability",
      content: "Cloud Wardrobe shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service."
    },
    {
      title: "10. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Continued use constitutes acceptance of modified terms."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Cloud Wardrobe. These Terms of Service ("Terms") govern your use of our website 
                and services. By using our platform, you agree to these terms. Please read them carefully.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mt-8 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                Contact Information
              </h3>
              <p className="text-orange-600 dark:text-orange-300">
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@cloudwardrobe.com
                <br />
                Phone: +91 1234567890
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}