const bcrypt=require("bcryptjs")

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
            return res.json({mesaage:"Succesfully Register"}).status(200)
        }
    }

    catch(err){
        console.log(err)
    }
}

module.exports={Register}