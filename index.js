const express = require('express');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');
const { test } = require('./db/db');
require("dotenv").config();


const app=express()
const port=3000;

app.use(express.json())
app.use(cors())

// console.log(process.env.DB_HOST,process.env.DB_USER);

app.use('/',authRoutes)
app.use('/expense',expenseRoutes)
// test()

app.listen(port,()=>{
    console.log("Server listening on port:",port);
    
})