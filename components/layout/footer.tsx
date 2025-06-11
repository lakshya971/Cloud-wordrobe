"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { href: '/shop', label: 'Shop' },
        { href: '/rent', label: 'Rent' },
        { href: '/vendors', label: 'Become a Vendor' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Customer Care',
      links: [
        { href: '/help', label: 'Help Center' },
        { href: '/shipping', label: 'Shipping Info' },
        { href: '/returns', label: 'Returns & Exchanges' },
        { href: '/size-guide', label: 'Size Guide' },
        { href: '/faq', label: 'FAQ' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/rental-terms', label: 'Rental Terms' },
        { href: '/vendor-terms', label: 'Vendor Agreement' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Cloud Wardrobe
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Buy it. Rent it. Wear it. A Smart Wardrobe Powered by the Community. 
              Discover fashion and lifestyle products from verified vendors.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@cloudwardrobe.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 mt-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-orange-500/10 hover:text-orange-500"
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest fashion trends and exclusive offers delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Cloud Wardrobe. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}