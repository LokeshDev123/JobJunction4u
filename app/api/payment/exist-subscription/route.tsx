import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { validatePaymentVerification,validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";



export async function POST(req:NextRequest){

    try {



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





    const existSubscription=await Subscription.findOne({user_id:existuser._id});

    if(!existSubscription){
        return NextResponse.json({message:"Failed",success:false},{status:400})
    }
    
    if(existSubscription.end_at<new Date()){
        return NextResponse.json({message:"Subscription Expired",success:false},{status:400})
    }

 
    
    return NextResponse.json({message:"Success",success:true},{status:200})



        
    } catch (error) {
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}