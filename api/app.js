const express=require('express');
const app=express();
const morgan=require('morgan')
app.use(morgan('dev'))
const mongoose = require('mongoose');
const cors=require('cors')
require('./job/productCleanup');



require('./dB/connection')
require('dotenv').config();

app.use(express.json()); 
app.use(cors())// Ensure dotenv is configured correctly

const PORT = process.env.PORT 


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const Admin = require('./routes/adminRoutes');
const ProfileRoutes = require('./routes/profileRoutes'); // Adjust path if necessary


app.use('/app', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/Admin', Admin);
app.use('/api/user', ProfileRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});