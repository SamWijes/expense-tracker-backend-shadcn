const express = require('express');
const { AuthMiddleware } = require('../middleware/authMiddleware');
const { addExpense, loadExpense, filterExpense } = require('../controllers/expenseController');
const Router=express.Router()

Router.post('/add',AuthMiddleware,addExpense)
Router.get('/load',AuthMiddleware,loadExpense)

Router.post('/filter',AuthMiddleware,filterExpense)



module.exports =Router