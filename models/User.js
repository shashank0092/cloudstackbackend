const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    fcmToken:{
        type:String,
        require:true
    }
})

const UserDetails=mongoose.model('UserDetails',UserSchema)
module.exports=UserDetails;