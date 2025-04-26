//express server with an authorised endpoint using jwt
const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
app.use(express.json());
const userr=[{"id":1,"name":"abc"},{"id":1,"name":"abc"}];
app.get("/log/:id",(req,res)=>
{
    const user=userr.find({"id":req.params.id});
    if(!user)
    {
        res.status(401).json({"message":"no user"});
    }
    else
    {
        toen=jwt.sign(user.name,"secret",{expiresIn:"1d"});
        res.send(token);
    }
})
app.listen(3000,()=>{
    console.log("runnign at 3000");
})
