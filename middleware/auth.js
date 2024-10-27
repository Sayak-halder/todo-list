const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.header("Authorization");

    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
    }

    try{
        const  decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=decoded.user;
        next();
    }catch(error){
        res.status(400).send("Invalid token");
    }
};

module.exports=auth;