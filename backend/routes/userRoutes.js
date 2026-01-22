const express = require('express');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');

const router = express.Router();
router.post('/login', async(req,res) => {
    const { email, password }= req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

module.exports=router;