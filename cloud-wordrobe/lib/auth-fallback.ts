// Temporary fallback authentication service
// This works without a database for development/testing

import bcrypt from 'bcryptjs';

// In-memory user storage (for development only)
let users: any[] = [
  {
    id: 1,
    email: 'admin@cloudwardrobe.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/wvx7pq8WO', // admin123
    name: 'System Admin',
    role: 'admin',
    isVendor: false,
    vendorPaid: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    email: 'vendor@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/wvx7pq8WO', // vendor123
    name: 'Test Vendor',
    role: 'vendor',
    isVendor: true,
    vendorPaid: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    email: 'customer@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/wvx7pq8WO', // customer123
    name: 'Test Customer',
    role: 'customer',
    isVendor: false,
    vendorPaid: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let userIdCounter = 4;

export async function getUserByEmailFallback(email: string) {
  return users.find(user => user.email === email) || null;
}

export async function createUserFallback(userData: any) {
  const newUser = {
    id: userIdCounter++,
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  users.push(newUser);
  return newUser.id;
}

export function getFallbackUsers() {
  return users.map(user => ({ ...user, password: undefined }));
}
