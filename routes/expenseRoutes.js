const express = require('express');
const { AuthMiddleware } = require('../middleware/authMiddleware');
const { addExpense, loadExpense, filterExpense, uploadReceipt } = require('../controllers/expenseController');
const Router=express.Router()
const multer=require('multer');

const storage=multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,'uploads/');
},
filename:(req,file,cb)=>{
    cb(null,Date.now() +'-'+file.originalname)
}
})

const upload=multer({storage:storage})



Router.post('/add',AuthMiddleware,upload.single('file'),addExpense)
Router.get('/load',AuthMiddleware,loadExpense)
Router.post('/upload',AuthMiddleware,upload.single('file'),uploadReceipt)

Router.post('/filter',AuthMiddleware,filterExpense)



module.exports =Router
