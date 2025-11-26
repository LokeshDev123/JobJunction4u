import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { validatePaymentVerification,validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";



export async function POST(req:NextRequest){

    try {

        const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

const body=await req.json();


 const decoded = req.headers.get("token");


 
    if (!decoded) {

        
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }

    const existuser = await User.findOne({
      _id: JSON.parse(decoded!)._id,
      $or: [{ user_type: "user" }],
    });

    if (!existuser) {
          
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseData:any=createSubscriptionSchema.safeParse(body);


if(!parseData.success){
 return NextResponse.json({message:`Error: ${parseData.error.issues[0].path[0]} ${parseData.error.issues[0].message}`,success:false},{status:400})
}

const {razorpayOrderId,razorpayPaymentId,razorpaySignature}=body;

const paymentverification=await validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, razorpaySignature, process.env.RAZORPAY_SECRET!);

console.log(paymentverification)

if(paymentverification){

    const existSubscription=await Subscription.findOne({user_id:existuser._id});

    if(existSubscription){
        
        existSubscription.razorpayOrderId=razorpayOrderId;
        existSubscription.razorpayPaymentId=razorpayPaymentId;
        existSubscription.razorpaySignature=razorpaySignature;
        existSubscription.created_at=new Date();
        existSubscription.end_at=new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const updatedSubscription=await existSubscription.save();
        if(!updatedSubscription){
            return NextResponse.json({message:"Failed",success:false},{status:400})
        }
        return NextResponse.json({message:"Success",success:true},{status:200})
    }

    const subscription=await Subscription.create({
        user_id:existuser._id,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        created_at:new Date(),
        end_at:new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    })


    if(!subscription){
        return NextResponse.json({message:"Failed",success:false},{status:400})
    }
    
    return NextResponse.json({message:"Success",success:true},{status:200})
}
else{
    return NextResponse.json({message:"Failed",success:false},{status:400})
}
  

        
    } catch (error) {
        
      console.log(error);
      
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}