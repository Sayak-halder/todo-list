const express=require("express");
const mongoose=require("mongoose");
const authRouter=require("./routes/auth");
const todoRouter=require("./routes/todos");


require("dotenv").config();

const app=express();
app.use(express.json());

const PORT=process.env.PORT;

mongoose
    .connect(process.env.MONGO_URL,{})
    .then(()=>console.log("Connected to MongoDB!!"))
    .catch((err)=>console.log("Something went wrong!!"));


app.use("/api/user",authRouter);
app.use("/api/todo",todoRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});