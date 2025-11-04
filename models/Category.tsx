import mongoose, { Model } from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})


const Category:Model<{name:string,created_at:Date}>=mongoose.models["jj4u_category"]|| mongoose.model("jj4u_category",categorySchema)
export default Category