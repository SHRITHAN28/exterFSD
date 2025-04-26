const express=require('express');
const jwt=require('jsonwebtoken');
const mongo=require('mongoose');
const app=express();
app.use(express.json());
mongo.connect("mongodb://localhost:27017/userr");
const userS=new mongo.Schema();
const User=mongo.model(user,"userS");
app.post
app.listen(3000,()=>{
    console.log("runnign at 3000");
})
