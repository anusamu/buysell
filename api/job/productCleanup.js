// jobs/productCleanup.js
const cron = require('node-cron');
const Product = require('../models/productData');

cron.schedule('0 0 * * *', async () => { // Runs daily at midnight
  try {
    const currentDate = new Date();
    await Product.deleteMany({ expiryDate: { $lte: currentDate } });
    console.log('Expired products deleted');
  } catch (error) {
    console.error('Error deleting expired products:', error);
  }
});
