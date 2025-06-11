// Database setup script for Cloud Wardrobe
// Run this script to create the MySQL database and tables

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'cloud_wardrobe', // Connect directly to the database
};

async function setupDatabase() {
  let connection;
  
  try {
    console.log('Connecting to MySQL...');
    
    // First, connect without specifying database to create it
    const initialConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    
    // Create database if it doesn't exist
    console.log('Creating database if it doesn\'t exist...');
    await initialConnection.query('CREATE DATABASE IF NOT EXISTS cloud_wardrobe');
    console.log('Database "cloud_wardrobe" created or already exists.');
    await initialConnection.end();
    
    // Now connect to the specific database
    connection = await mysql.createConnection(dbConfig);
    
    // Create tables
    console.log('Creating tables...');
    
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('customer', 'vendor', 'admin') DEFAULT 'customer',
        isVendor BOOLEAN DEFAULT FALSE,
        vendorPaid BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createUsersTable);
    console.log('Users table created successfully.');
    
    // Create products table
    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vendorId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        tags TEXT,
        buyPrice DECIMAL(10,2),
        rentPrice DECIMAL(10,2),
        securityDeposit DECIMAL(10,2),
        availableForBuy BOOLEAN DEFAULT TRUE,
        availableForRent BOOLEAN DEFAULT TRUE,
        stock INT DEFAULT 1,
        images TEXT,
        location VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (vendorId) REFERENCES users(id)
      )
    `;
    
    await connection.execute(createProductsTable);
    console.log('Products table created successfully.');
    
    // Create orders table
    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        type ENUM('buy', 'rent') NOT NULL,
        status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled') DEFAULT 'pending',
        totalAmount DECIMAL(10,2) NOT NULL,
        deliveryDate DATE,
        returnDate DATE,
        address TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `;
    
    await connection.execute(createOrdersTable);
    console.log('Orders table created successfully.');
    
    // Create order_items table
    const createOrderItemsTable = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT DEFAULT 1,
        price DECIMAL(10,2) NOT NULL,
        rentDays INT,
        securityDeposit DECIMAL(10,2),
        FOREIGN KEY (orderId) REFERENCES orders(id),
        FOREIGN KEY (productId) REFERENCES products(id)
      )
    `;
    
    await connection.execute(createOrderItemsTable);
    console.log('Order items table created successfully.');
    
    // Create admin user if it doesn't exist
    const adminExists = await connection.execute(
      'SELECT id FROM users WHERE email = ? AND role = ?', 
      ['admin@cloudwardrobe.com', 'admin']
    );
    
    if (adminExists[0].length === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await connection.execute(
        'INSERT INTO users (email, password, name, role, isVendor, vendorPaid) VALUES (?, ?, ?, ?, ?, ?)',
        ['admin@cloudwardrobe.com', hashedPassword, 'System Admin', 'admin', false, false]
      );
      
      console.log('Admin user created: admin@cloudwardrobe.com / admin123');
    } else {
      console.log('Admin user already exists.');
    }
    
    console.log('\n✅ Database setup completed successfully!');
    console.log('You can now start the application with: npm run dev');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Check your database credentials in .env.local');
    console.log('3. Ensure your MySQL user has proper permissions');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase();
