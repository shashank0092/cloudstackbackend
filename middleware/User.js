const UserMiddleWare=async(req,res,next)=>{
    const token=req.headers['authorization']

    if(typeof token!=='undefined'){
       
        req.token=token;
        next();
    }
    else{
        res.json({message:"Token Is Invaild"})
    }
}

module.exports=UserMiddleWare