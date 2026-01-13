const mongoose = require ('mongoose');
const dotenv = require('dotenv');
require('colors');
const products = require('./data/products');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async()=>{
    try{
        console.log('Cleaning database...'.yellow);
        await Product.deleteMany();

        console.log('Inserting products...'.yellow);
        const createdProducts = await Product.insertMany(products);
        console.log(`${createdProducts.length} Data Imported!`.green.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};
importData();