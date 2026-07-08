import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  isComplete:{
    type:Boolean,
    default:false
  }
})

export const TodoSchemaModel=new mongoose.model("todo",TodoSchema)
