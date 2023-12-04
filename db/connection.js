const mongoose=require("mongoose")


 const connect=async()=>{

   const DB_URL=process.env.DB_URL
   
    try{
        mongoose.connect(DB_URL)
        console.log("connected to datbase sucessfully")
      

    }
    catch(err){
        console.log("During Connection got an error->",err)
    }
}

connect()
