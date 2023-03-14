const mongoose = require('mongoose');

const connectDatabase = async () => {
  // Connect den database
  try {
    // Buoi sau - cau hinh URL cua mongo Atlat
    const dbConfig = 'mongodb://127.0.0.1/fullstack-web';
    const connect = await mongoose.connect(dbConfig);
    console.log(`Mongodb connected: ${connect.connection.host}`);
  } catch (e) {
    console.log('Error connect to mongodb');
  }
}

module.exports = connectDatabase;