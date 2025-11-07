import mongoose, { Model } from "mongoose";

const subscriptionSchema=new mongoose.Schema({
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
    subscription_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },

    subscription_end:{
        type:Date,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})


const Subscription:Model<{user_id:string,plan_id:string,plan_name:string,subscription_id:string,subscription_end:Date,created_at:Date}>=mongoose.models["jj4u_subscription"]|| mongoose.model("jj4u_subscription",subscriptionSchema)
export default Subscription