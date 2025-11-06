import mongoose, { Model } from "mongoose";


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile_no:{
        type:String,
        required:true,
        unique:true,
    
    },
    user_type:{
        type:String,
        required:true,
        enum:["admin","user","recruiter"]
    },
    customer_id:{
        type:String,
    
    },
    password:{
        type:String,
        required:true,
    },

    created_at:{
        type:Date,
        default:Date.now()
    
    }

})

const User:Model<{name:string,email:string,mobile_no:string,user_type:string,customer_id:string,password:string,created_at:Date}>=mongoose.models["jj4u_userdetails"] || mongoose.model("jj4u_userdetails",userSchema);
export default User;