const express = require('express');
const { Login, Register } = require('../controllers/authController');

const Router=express.Router();

Router.post('/login',Login)
Router.post('/register',Register)

module.exports =Router;