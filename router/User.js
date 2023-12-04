const express=require("express")
const router=express.Router()
const UserMiddleWare = require("../middleware/User")



const UserControllers=require("../controllers/UserControllers")
router.post("/register",UserControllers.Register)
router.get("/login",UserControllers.Login)

module.exports=router
