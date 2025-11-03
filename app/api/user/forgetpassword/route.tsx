import User from "@/models/User";
import { forgetPasswordSchena } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest) {
    try {
        
        const body=await req.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=forgetPasswordSchena.safeParse(body)

        if(!parseData.success){
            return NextResponse.json({success:false,message:parseData.error.issues[0].path[0] + " " + parseData.error.issues[0].message},{status:400})
        }

        const {mobile_no,newpassword}=parseData.data;

        const existingUserByMobile=await User.findOne({mobile_no});

        if(!existingUserByMobile){
            return NextResponse.json({message:"User does not exist",success:false},{status:400})
        }

        existingUserByMobile.password=newpassword;
        await existingUserByMobile.save();

        return NextResponse.json({message:"Password changed successfully",success:true},{status:200})

    } catch (error) {
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
    
}