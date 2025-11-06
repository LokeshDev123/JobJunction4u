import mongoose, { Model } from "mongoose";



const planSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jj4u_userdetails",
        required:true
    },
    plan_id:{
        type:String,
        required:true

    },
    plan_name:{
        type:String,
        required:true

    },
    plan_amount:{
        type:Number,
        required:true


    },
    created_at:{
        type:Date,
        default:Date.now()
    
    }
})


const Plan:Model<{user_id:string,plan_id:string,plan_name:string,plan_amount:number,created_at:Date}>=mongoose.models["jj4u_plan"]||mongoose.model("jj4u_plan",planSchema);

export default Plan