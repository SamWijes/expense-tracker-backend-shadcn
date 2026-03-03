const express = require('express');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');
const { test } = require('./db/db');

require("dotenv").config();



const app=express()
const port=3000;

const allowedOrigins = [
    'https://expense.samithwijesekara.me',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

const corsOptions = {
    origin(origin, callback) {
        // Allow non-browser requests (no Origin header) and allowed browser origins
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(express.json())
app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))
app.use('/uploads', express.static('uploads'))

// console.log(process.env.DB_HOST,process.env.DB_USER);

app.use('/',authRoutes)
app.use('/expense',expenseRoutes)
// test()

app.listen(port,()=>{
    console.log("Server listening on port:",port);
    
})
