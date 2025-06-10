"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  IndianRupee, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Star,
  Clock,
  Shield,
  Smartphone
} from 'lucide-react';

export default function VendorsPage() {
  const router = useRouter();

  const handleStartSelling = () => {
    // Redirect to vendor registration page
    router.push('/auth/register?type=vendor');
  };
  const benefits = [
    'Reach 10,000+ customers across India',
    'No monthly fees - just ₹199 one-time registration',
    'Manage inventory with our powerful dashboard',
    'Secure payment processing and instant payouts',
    'Marketing support and featured listings',
    'Mobile-friendly vendor app',
    '24/7 customer support',
    'Analytics and sales insights',
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: 'Easy Product Management',
      description: 'Add, edit, and manage your products with our intuitive dashboard.',
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics',
      description: 'Track your performance with detailed analytics and insights.',
    },
    {
      icon: Users,
      title: 'Customer Reach',
      description: 'Access to thousands of customers across major Indian cities.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'All transactions are secure with instant payout options.',
    },
    {
      icon: Star,
      title: 'Review Management',
      description: 'Manage customer reviews and build your reputation.',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Manage your business on the go with our mobile app.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Register',
      description: 'Sign up and pay the one-time registration fee of ₹199',
    },
    {
      step: '02',
      title: 'Setup Profile',
      description: 'Complete your vendor profile and business details',
    },
    {
      step: '03',
      title: 'Add Products',
      description: 'Upload your products with photos and descriptions',
    },
    {
      step: '04',
      title: 'Start Selling',
      description: 'Go live and start receiving orders from customers',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      business: 'Fashion Boutique',
      location: 'Mumbai',
      quote: 'Cloud Wardrobe helped me reach customers I never could before. My sales increased by 400% in just 6 months!',
      earnings: '₹75,000/month',
    },
    {
      name: 'Rahul Mehta',
      business: 'Designer Wear',
      location: 'Delhi',
      quote: 'The platform is so easy to use. I can manage everything from my phone and the support team is amazing.',
      earnings: '₹50,000/month',
    },
    {
      name: 'Anita Desai',
      business: 'Ethnic Collection',
      location: 'Bangalore',
      quote: 'Best decision for my business. The rental feature brings in additional revenue I never had before.',
      earnings: '₹60,000/month',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 mb-4">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Growing Business Opportunity
                  </Badge>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Become a <span className="text-orange-500">Vendor</span>
                    <br />
                    Start Your Fashion Business
                  </h1>
                  
                  <p className="text-xl text-muted-foreground">
                    Join our community of successful vendors and turn your fashion passion into profit. 
                    Low entry barrier, high earning potential.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Registration Fee</h3>
                      <p className="text-muted-foreground text-sm">One-time payment, lifetime access</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-500">₹199</div>
                      <div className="text-sm text-muted-foreground">only</div>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white group" onClick={handleStartSelling}>
                  Start Selling Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Successful Vendor"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Cloud Wardrobe?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of successful vendors who are already growing their business with us.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <feature.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How to Get Started
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start your vendor journey in just four simple steps.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <Card className="pt-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how our vendors are transforming their businesses.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge className="bg-green-100 text-green-700">
                          {testimonial.earnings}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.business} • {testimonial.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of successful vendors and start building your fashion business today.
              </p>
              <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50" onClick={handleStartSelling}>
                Register as Vendor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}