const express=require("express");
const jwt=require("jsonwebtoken");
const User=require("../models/user")

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        
        if(user){
            return res.status(400).json({message:"User already exists.."});
        }

        user=new User({name,email,password});
        await user.save();

        const token=jwt.sign({user:{id:user._id}},process.env.JWT_SECRET,{
            expiresIn:'1h',
        });

        res.json({token});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error!!"});
    }
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid credentials.."});
        }

        const token=jwt.sign({user:{id:user._id}},process.env.JWT_SECRET,{
            expiresIn:'1h',
        });
        res.json({token});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error.."});
    }
});

module.exports=router;