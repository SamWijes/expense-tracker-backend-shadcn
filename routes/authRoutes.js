const express = require('express');
const { Login, Register } = require('../controllers/authController');


const Router=express.Router();

Router.post('/login',Login)
Router.post('/register',Register)
Router.get('/',(req,res)=>res.json({message:"dadas"}))

module.exports =Router;