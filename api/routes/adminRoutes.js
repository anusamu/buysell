const express=require ('express');
const router=express.Router();
const jwt = require('jsonwebtoken'); 
router.use(express.json())
router.use(express.urlencoded({extended:true}));
const productModel=require('../models/productData')
const userModel=require('../models/userModel')



// adding middleware function for token recheck


// function verifyToken(req,res,next){
//     let token=req.headers.token;
//     try{
//         if(!token) throw 'Unauthorised Access'
//         let payload=jwt.verify(token,"secret")
//         if(!payload)throw 'Unauthorised Access'
//         next()
//     }catch(error){
//         res.json({message:error})
//     }
// }


router.get('/AdminProduct',async(req,res)=>{
    try {
        const products=await productModel.find()
        res.status(200).send(products);
    } catch (error) {
        res.status(404).send('product not found');
        
    }
});


router.post('/AdminAdd', async(req,res)=>{
    try {
        const course=req.body;
        const newProducts=new productModel(course);
        await newProducts.save();
        res.status(200).send('product added successfully');
    } catch (error) {
        console.error(error); // Log the actual error
        res.status(404).send('Error adding course');
    }
});
router.put('/AdminEdit/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await productModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send('product updated successfully');
    } catch (error) {
        res.status(404).send('Error updating course');
    }
});
router.delete('/AdminDelete/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await productModel.findByIdAndDelete(id,req.body,{new:true})
        res.status(200).send('product deleted successfully');
    } catch (error) {
        res.status(404).send('Error deleting course');
    }
});







router.get('/AdminDash',async(req,res)=>{
    try {
        const user=await userModel.find()
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send('product not found');
        
    }
});
router.post('/AdminAddUser', async(req,res)=>{
    try {
        const course=req.body;
        const newUser=new userModel(course);
        await newUser.save();
        res.status(200).send('product added successfully');
    } catch (error) {
        console.error(error); // Log the actual error
        res.status(404).send('Error adding course');
    }
});

router.put('/AdminEditUser/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await userModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send('product updated successfully');
    } catch (error) {
        res.status(404).send('Error updating course');
    }
});
router.delete('/AdminDeleteUser/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await userModel.findByIdAndDelete(id,req.body,{new:true})
        res.status(200).send('product deleted successfully');
    } catch (error) {
        res.status(404).send('Error deleting course');
    }
});


module.exports = router;