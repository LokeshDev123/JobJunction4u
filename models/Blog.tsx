import mongoose, { Model } from "mongoose";

const contentSchema=new mongoose.Schema({
    headline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const blogSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ldev_userdetails',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true

    },
    author:{
        type:String,
        required:true
    
    },
    content:{
        type:[contentSchema],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    
    }
})


const Blog:Model<{title:string,author:string,content:Array<{headline:string,description:string}>,date:Date}>=mongoose.models['jj4u_Blog'] || mongoose.model('jj4u_Blog',blogSchema)
export default Blog;