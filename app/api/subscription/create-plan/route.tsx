import dbToConnect from "@/db/db";
import Plan from "@/models/Plan";
import User from "@/models/User";
import { createplanSchema, fetchplanSchema } from "@/schema/PlanSchema";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";


export async function POST(req:NextRequest) {

    try {

        await dbToConnect()

        const decoded=  req.headers.get('token')
        
        const body=await req.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=fetchplanSchema.safeParse(body);
        
        if(!parseData.success){
            
            return NextResponse.json({message:`Error: ${parseData.error.issues[0].path[0]} ${parseData.error.issues[0].message}`,success:false},{status:400})
        }
 

        
        const exist_user=await User.findOne({_id:JSON.parse(decoded!)._id,user_type:"admin"})

        if(!exist_user){
            return NextResponse.json({message:"Invalid Request",success:false},{status:404})
        }
        
const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET });

const data=await instance.plans.fetch(body.plan_id);


const deleteAllPlan=await Plan.deleteMany({})
const newPlan=new Plan({
    user_id:exist_user._id,

    plan_id:data.id,
    plan_name:data.item.name,
    plan_amount:data.item.amount,
})

await newPlan.save();


        return NextResponse.json({message:"Plan Created Successfully",data:data,success:true},{status:200})

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
    
}