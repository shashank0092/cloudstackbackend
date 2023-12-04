const express=require("express")
const router=express.Router()
const UserMiddleWare = require("../middleware/User")



const UserControllers=require("../controllers/UserControllers")
router.post("/login",UserControllers.Register)

module.exports=router
