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
    password:{
        type:String,
        required:true,
    },

    created_at:{
        type:Date,
        default:Date.now()
    
    }

})

const User:Model<{name:string,email:string,mobile_no:string,user_type:string,password:string,created_at:Date}>=mongoose.models.User || mongoose.model("User",userSchema);
export default User;