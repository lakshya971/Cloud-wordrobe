"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  HeadphonesIcon,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@cloudwardrobe.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 1234567890',
      description: 'Mon-Sat 9AM to 6PM',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Mumbai, Maharashtra, India',
      description: 'Our headquarters',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Sat: 9AM-6PM',
      description: 'Sunday: Closed',
    },
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'General Inquiries',
      description: 'Questions about our platform, services, or policies',
    },
    {
      icon: HeadphonesIcon,
      title: 'Customer Support',
      description: 'Help with orders, returns, or technical issues',
    },
    {
      icon: Users,
      title: 'Vendor Support',
      description: 'Assistance for vendors and business partnerships',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in <span className="text-orange-500">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <info.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                      <p className="font-medium mb-1">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Support Options */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 1234567890"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="How can we help?"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Support Options */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">How Can We Help?</h2>
                  <p className="text-muted-foreground mb-6">
                    Choose the type of support you need, and we'll make sure you get connected with the right team.
                  </p>
                </div>

                {supportOptions.map((option, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <option.icon className="h-8 w-8 text-orange-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                          <p className="text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* FAQ Link */}
                <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Quick Answers</h3>
                    <p className="text-muted-foreground mb-4">
                      Check our FAQ section for instant answers to common questions.
                    </p>
                    <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                      View FAQ
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Visit Our Office
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Located in the heart of Mumbai, our team is always ready to meet with partners and discuss opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-muted/50 h-96 rounded-lg flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cloud Wardrobe Headquarters</h3>
                <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Interactive map integration would be implemented here
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}