const express=require("express")
const cors=require("cors");
const UserMiddleWare=require("./middleware/User")


const dotenv=require("dotenv")
const app=express()

dotenv.config({path:"./.env"})
app.use(express.json())
app.use(cors({
    origin:"*"
}))


console.log(process.env.SECRET_KEY)
require("./db/connection")

app.get("/",async(req,res)=>{
    res.json({
        message:"Welcome Shukla Boi"
    }).status(200)
})


const userRoutes=require("./router/User")

app.use("/user/v0",userRoutes)

app.listen(5000,()=>{
    console.log("App is Runnig On Port 5000")
})
