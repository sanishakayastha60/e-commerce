const express = require ('express');
const dotenv = require ('dotenv');
const colors = require ('colors');
const connectDB = require ('./config/db');

dotenv.config();

connectDB();

const app =express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold);
});