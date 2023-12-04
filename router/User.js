const express=require("express")
const router=express.Router()
const UserMiddleWare = require("../middleware/User")



const UserControllers=require("../controllers/UserControllers")
router.post("/register",UserControllers.Register)
router.post("/login",UserControllers.Login)
router.post("/profile",UserMiddleWare,UserControllers.Profile)

module.exports=router
