import dbToConnect from "@/db/db";
import Plan from "@/models/Plan";
import User from "@/models/User";
import { createplanSchema, fetchplanSchema } from "@/schema/PlanSchema";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";


export async function POST(req:NextRequest) {

    try {

        await dbToConnect()

        
        const getMyPlan=await Plan.findOne({})
        if(!getMyPlan){
            return NextResponse.json({message:"No Plan Found",success:false},{status:404})

        }
        return NextResponse.json({plan:getMyPlan,success:true},{status:200})

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
    
}