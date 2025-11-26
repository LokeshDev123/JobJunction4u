import mongoose, { Model } from "mongoose";

const subscriptionSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"jj4u_userdetails",
        required:true
    },
    razorpayOrderId:{
        type:String,
        required:true

    },
    razorpayPaymentId:{
        type:String,
        required:true

    },
    razorpaySignature:{
        type:String,
        required:true

    },
    created_at:{
        type:Date,
        default:Date.now
    },
    end_at: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // +1 year
  }
})


const Subscription:Model<{user_id:string,razorpayOrderId:string,razorpayPaymentId:string,razorpaySignature:string,created_at:Date,end_at:Date}>=mongoose.models["jj4u_subscription"]|| mongoose.model("jj4u_subscription",subscriptionSchema)
export default Subscription