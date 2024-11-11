const mongoose=require ('mongoose');
const productSchema=new mongoose.Schema({
    
    pdtImage:String,
    pdtName:String,
    pdtOwner:String,
    pdtPrice:Number,
    pdtDescription:String,
    pdtFeature:String,
    pdtDate:Date,
    pdtLocation:String,
    pdtOwnerCount:Number,  
    expiryDate: Date
})
const  productData=mongoose.model('product',productSchema);
module.exports=productData;