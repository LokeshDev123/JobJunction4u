import dbToConnect from "@/db/db";
import User from "@/models/User";
import { loginUserSchema } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { ZodSafeParseResult } from "zod";

import jwt from 'jsonwebtoken'
export async function POST(req:NextRequest){

    try {
        
        await dbToConnect();

        const body=await req.json();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedData:any=loginUserSchema.safeParse(body);

        if(!parsedData.success){
            return NextResponse.json({success:false,message:parsedData.error.issues[0].path[0] + " " + parsedData.error.issues[0].message},{status:400})
        }

        const {mobile_no,password}=parsedData.data;



        const existingUserByMobile=await User.findOne({mobile_no});

        if(!existingUserByMobile){
            return NextResponse.json({message:"User does not exist",success:false},{status:400})
        }
        

       const token:string= jwt.sign({_id: existingUserByMobile._id,name:existingUserByMobile.name,email:existingUserByMobile.email,user_type:existingUserByMobile.user_type}, process.env.AUTH_PASS!, { expiresIn: '3d' });

        return NextResponse.json({message:"Login successful",success:true,token},{status:200})
       

        
        
        
        
    
    } catch (error) {
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
} 