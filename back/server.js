const express= require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("succesful respnse")
})

app.listen(9090,()=> console.log("listening on port 9090"))