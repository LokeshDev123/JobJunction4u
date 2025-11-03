import dbToConnect from "@/db/db";
import User from "@/models/User";
import { createUserSchema } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    try {
        
        await dbToConnect();

        const body=await req.json();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedData:any=createUserSchema.safeParse(body);

        if(!parsedData.success){
            return NextResponse.json({success:false,message:parsedData.error.issues[0].path[0] + " " + parsedData.error.issues[0].message},{status:400})
        }

        const {name,email,mobile_no,user_type,password,cpassword,authpasscode}=parsedData.data;

        if(authpasscode!==process.env.AUTH_PASS){

            return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }

        if(password!==cpassword){
            return NextResponse.json({message:"Password and Confirm Password must be same",success:false},{status:400})
        }
        const existingUserByEmail=await User.findOne({email});
        if(existingUserByEmail){
            return NextResponse.json({message:"Email already exists",success:false},{status:400})
        }
        const existingUserByMobile=await User.findOne({mobile_no});

        if(existingUserByMobile){
            return NextResponse.json({message:"Mobile number already exists",success:false},{status:400})
        }
        
        const newUser=new User({
            name,
            email,
            mobile_no,
            user_type,
            password
        })
        await newUser.save();

        
        return NextResponse.json({message:"User created successfully",success:true},{status:201})
        
        
    
    } catch (error) {
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
} 