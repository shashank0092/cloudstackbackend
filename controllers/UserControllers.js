const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../models/User")

const Register=async(req,res)=>{
    const{email,username,password}=req.body;

    if(!email||!username||!password){
        return res.json({message:"Please Give All Details"}).status(400)
    }
    try{
        const user=await User.findOne({email:email})

        if(user){
            return res.json({message:"This Email Is Already Register"}).status(400)
        }
        else{
            const hasedPassword=await bcrypt.hash(password,12)
            const newUser=await User.create({email,username,password:hasedPassword})
            return res.json({message:"Succesfully Register"}).status(200)
        }
    }

    catch(err){
        console.log(err)
    }
}


const Login=async(req,res)=>{
    const{userdetails,password}=req.body;

    if(!userdetails||!password){
        return res.json({message:"All Fileds Are Required"})
    }
   
    try{
        const user=await User.findOne({$or:[{username:userdetails},{email:userdetails}]})

        if(user){
            const isPassMatching=await bcrypt.compare(password,user.password)
            
            if(!isPassMatching){
                return res.status(412).json({message:"Invalid Details"})
            }
            else{
                const payload={username:user.username,email:user.email}
                const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
                return res.json({token:token,username:user.username,message:"Succesfully Login"}).status(200);
            }
        }
        else{
            return res.json({message:"Please First Register"}).status(201)
        }
      
    }

    catch(err){
        console.log(err)
    }
}

module.exports={Register,Login}