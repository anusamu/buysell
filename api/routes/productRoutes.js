const express=require ('express');
const router=express.Router();
const jwt = require('jsonwebtoken'); 
router.use(express.json())
router.use(express.urlencoded({extended:true}));
const productModel=require('../models/productData')

// const Product = require('./models/productModel');

router.get('/',async(req,res)=>{
    try {
        const products=await productModel.find()
        res.status(200).send(products);
    } catch (error) {
        res.status(404).send('product not found');
        
    }
});
router.post('/add', async(req,res)=>{
    try {
        const user=req.body;
        const newProducts=new productModel(user);
        await newProducts.save();
        res.status(200).send('product added successfully');
    } catch (error) {
        console.error(error); // Log the actual error
        res.status(404).send('Error adding course');
    }
});




module.exports = router;