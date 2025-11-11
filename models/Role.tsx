import mongoose, { Model } from "mongoose";

const roleSchema=new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jj4u_category",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})


const Role:Model<{category_name:string,name:string,created_at:Date}>=mongoose.models["jj4u_role"]|| mongoose.model("jj4u_role",roleSchema)
export default Role