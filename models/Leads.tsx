import mongoose, { Model } from "mongoose";


const leadSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    
    },

    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }


})


const Lead: Model<{ name: string; email: string; phone: string; subject: string; message: string; date: Date }> =
  mongoose.models["jj4u_ClientLeads"] || mongoose.model("jj4u_ClientLeads", leadSchema);

export default Lead;