const express=require("express");
const Todo=require("../models/todo");
const auth=require("../middleware/auth");

const router=express.Router();

// create
router.post('/',auth,async(req,res)=>{
    const {title,description}=req.body;
    
    try{
        const todo=new Todo({title,description,user:req.user.id});
        await todo.save();

        res.status(201).json(todo);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error..."});
    }
});

// update
router.put('/:id',auth,async(req,res)=>{
    try{
        const todo=await Todo.findById(req.params.id);
        
        if(!todo){
            return  res.status(404).json({message:"Todo not found..."});
        }

        if(todo.user.toString()!==req.user.id){
            return  res.status(401).json({message:"You are not authorized to update this todo..."});
        }

        todo.title=req.body.title || todo.title;
        todo.description=req.body.description || todo.description;
        
        await todo.save();
        res.json(todo);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error..."});
    }
});

// delete
router.delete('/:id',auth,async(req,res)=>{
    try{
        const  todo=await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({message:"Not Found.."});
        }

        if(todo.user.toString()!==req.user.id){
            return res.status(401).json({message:"You are not authorized to delete this todo..."});
        }

        await todo.remove();
        res.status(204).send();
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error..."});
    }
});

// get
router.get('/',auth,async(req,res)=>{
    const page=Number.parseInt(req.query.page)||1;
    const limit=Number.parseInt(req.query.limit)||10;

    try{
        const todos=await Todo.find({user:req.user.id})
                            .skip((page-1)*limit)
                            .limit(limit);

        const total=await Todo.countDocuments({user:req.user.id});

        res.json({data:todos,page,limit,total});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error..."});
    }
});

module.exports=router;