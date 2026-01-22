const express = require('express');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/userController.js');

router.post('/',registerUser);
router.post('/login', authUser);

module.exports=router;