import express from 'express'
// Dotenv File Attach
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from '../config/database.js'
import { TodoSchemaModel } from '../model/todoSchema.js'
dotenv.config()

const app=express()

// MiddleWare 
app.use(cors())
app.use(express.json())// JSON data parse karne k liye

connectDb()


app.get("/api/todos",async(req,res)=>{
  try {
    const todos=await TodoSchemaModel.find()
 res.json({
    status:true,
    data:todos
  })
  } catch (error) {
    console.log(error);
    
  }
 
})

app.post("/api/todos",async(req,res)=>{
  try {
    const newTodo=await TodoSchemaModel.create({
      title:req.body.title
    })
  // success message
    res.status(201).json(newTodo) 
  } catch (error) {
    res.status(401).json({message:error.message})
  }
})

app.delete("/api/todos/:id",async(req,res)=>{
  try {
    await TodoSchemaModel.findByIdAndDelete(req.params.id)
    res.json({success:true,message:"delete successfully"})
  } catch (error) {
    res.json({message:error.message})
  }
})

app.put("/api/todos/:id",async(req,res)=>{
  try {
    const updateTodo=await TodoSchemaModel.findByIdAndUpdate(
      req.params.id,
      {
        title:req.body.title,
        complete:req.body.complete
      },
      {new :true}
    )
    res.json(updateTodo)
  } catch (error) {
    res.status(401).json({message:error.message})
  }
})
// app.listen(process.env.PORT,()=>{
//   console.log(`server is running is PORT 5000`);
  
// })
export default app