import mongoose, { Model } from "mongoose";




const jobSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jj4u_userdetails",
        required:true,
    },
    title:{
        type:String,
        required:true
    
    },
    description:{
        type:String,
        required:true,
    
    },
    image_url:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    job_type:{
        type:String,
        required:true,
    
    },
    responsibilities:{
        type:[String],
        required:true,
    },
    skills:{
        type:[String],
        required:true,
    
    },
    salary:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    
    },
    experience:{
        type:String,
        required:true,
    },
    job_link:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now(),
        required:true,
    },
    job_expiry_date:{
        type:Date,
        required:true,
    }

})


const Job:Model<{title:string,description:string,image_url:string,category:string,role:string,job_type:string,responsibilities:string,skills:string,salary:string,location:string,experience:string,created_at:Date,job_expiry_date:Date}>=mongoose.models["jj4u_jobs"] || mongoose.model("jj4u_jobs",jobSchema);

export default Job;