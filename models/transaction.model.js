import mongoose from "mongoose"

const transactionSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  paymentType:{
    type:String,
    enum:["cash","card"]
  },
  amount:{
    type: Number,
    required:true
  },
  category:{
    type:String,
    enum:["savings","expense","investment"]
  },
  location:{
    type:String,
    default:"unknown"
  },
  date:{
    type:String,
    required:true
  }
  
})

const Transaction=mongoose.model("Transaction",transactionSchema)

export default Transaction 