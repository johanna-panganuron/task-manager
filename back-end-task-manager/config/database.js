// config/database.js - Updated with cleaner connection handling
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Optional: still good to keep this if you want to avoid deprecation warnings
    mongoose.set('strictQuery', false);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity
      family: 4                       // Use IPv4, skip trying IPv6
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Connection events
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Mongoose disconnected');
    });

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);

    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Continuing in development mode without database...');
      return null;
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
