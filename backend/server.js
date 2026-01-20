const express = require ('express');
const dotenv = require ('dotenv');
const colors = require ('colors');
const connectDB = require ('./config/db');
const productRoutes = require ('./routes/productRoutes');
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

connectDB();
const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/test',(req,res)=>{
    res.send("Server immediate");
});
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
// app.get('/',(req,res)=>{
//     res.send('API is running...');
// });
app.get('/api/product/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        } else{
            res.status(404).json({message: 'Product not found'});
        }
    }
    catch(error){
        res.status(500).json({message: ' Server Error'});
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold);
});