const express = require('express');


const app=express()
const port=3000;

app.get('/',authRoutes)



app.listen(()=>{
    console.log("Server listening on port:",port);
    
})