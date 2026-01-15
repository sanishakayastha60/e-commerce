const express = require('express');
const router = express.Router();
const Product=require('../models/productModel');
const asyncHandler = require('express-async-handler');


router.get('/',asyncHandler(async(req,res)=>{
    try{
        const products=await Product.find({});
    res.json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}));

router.get('/:id',asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({message:'Product not found'});
    }
}));
module.exports=router;