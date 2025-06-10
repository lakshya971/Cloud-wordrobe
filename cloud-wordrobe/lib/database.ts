import mysql from 'mysql2/promise';
import { getUserByEmailFallback, createUserFallback } from './auth-fallback';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cloud_wardrobe',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
let pool: mysql.Pool | null = null;
let dbAvailable = false;

export function getDB() {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      dbAvailable = true;
    } catch (error) {
      console.error('Database connection failed, using fallback mode:', error);
      dbAvailable = false;
    }
  }
  return pool;
}

// Check if database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  if (!dbAvailable) return false;
  
  try {
    const db = getDB();
    if (!db) return false;
    
    await db.execute('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database check failed:', error);
    dbAvailable = false;
    return false;
  }
}

// Database schema types
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: 'customer' | 'vendor' | 'admin';
  isVendor: boolean;
  vendorPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  vendorId: number;
  name: string;
  description: string;
  category: string;
  tags: string;
  buyPrice?: number;
  rentPrice?: number;
  securityDeposit?: number;
  availableForBuy: boolean;
  availableForRent: boolean;
  stock: number;
  images: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  type: 'buy' | 'rent';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  totalAmount: number;
  deliveryDate?: Date;
  returnDate?: Date;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  rentDays?: number;
  securityDeposit?: number;
}

// Database initialization function
export async function initializeDatabase() {
  try {
    if (!(await isDatabaseAvailable())) {
      console.log('Database not available, running in fallback mode');
      return false;
    }

    const db = getDB();
    if (!db) return false;
    
    console.log('Database tables already exist from setup script');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}

// Utility functions for common database operations
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    if (await isDatabaseAvailable()) {
      const db = getDB();
      if (db) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return (rows as User[])[0] || null;
      }
    }
  } catch (error) {
    console.error('Database getUserByEmail failed, using fallback:', error);
  }
  
  // Fallback to in-memory storage
  return getUserByEmailFallback(email);
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | null> {
  try {
    if (await isDatabaseAvailable()) {
      const db = getDB();
      if (db) {
        const [result] = await db.execute(
          'INSERT INTO users (email, password, name, phone, role, isVendor, vendorPaid) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userData.email, userData.password, userData.name, userData.phone, userData.role, userData.isVendor, userData.vendorPaid]
        );
        return (result as any).insertId;
      }
    }
  } catch (error) {
    console.error('Database createUser failed, using fallback:', error);
  }
  
  // Fallback to in-memory storage
  return createUserFallback(userData);
}

export async function getProducts(filters: any = {}): Promise<(Product & { vendorName: string })[]> {
  try {
    if (await isDatabaseAvailable()) {
      const db = getDB();
      if (db) {
        let query = 'SELECT p.*, u.name as vendorName FROM products p JOIN users u ON p.vendorId = u.id WHERE 1=1';
        const params: any[] = [];

        if (filters.category) {
          query += ' AND p.category = ?';
          params.push(filters.category);
        }

        if (filters.location) {
          query += ' AND p.location = ?';
          params.push(filters.location);
        }

        if (filters.availableForRent) {
          query += ' AND p.availableForRent = TRUE';
        }

        if (filters.availableForBuy) {
          query += ' AND p.availableForBuy = TRUE';
        }

        query += ' ORDER BY p.createdAt DESC';

        if (filters.limit) {
          query += ' LIMIT ?';
          params.push(filters.limit);
        }

        const [rows] = await db.execute(query, params);
        return rows as (Product & { vendorName: string })[];
      }
    }
  } catch (error) {
    console.error('Database getProducts failed, using fallback:', error);
  }
  
  // Fallback to empty array
  return [];
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
  try {
    if (await isDatabaseAvailable()) {
      const db = getDB();
      if (db) {
        const [rows] = await db.execute(
          'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC',
          [userId]
        );
        return rows as Order[];
      }
    }
  } catch (error) {
    console.error('Database getOrdersByUserId failed:', error);
  }
  
  return [];
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | null> {
  try {
    if (await isDatabaseAvailable()) {
      const db = getDB();
      if (db) {
        const [result] = await db.execute(
          'INSERT INTO orders (userId, type, status, totalAmount, deliveryDate, returnDate, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [orderData.userId, orderData.type, orderData.status, orderData.totalAmount, orderData.deliveryDate, orderData.returnDate, orderData.address]
        );
        return (result as any).insertId;
      }
    }
  } catch (error) {
    console.error('Database createOrder failed:', error);
  }
  
  return null;
}