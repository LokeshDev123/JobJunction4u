import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){

    try {
            
      
        const decoded=req.headers.get("token");

        

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existuser=await User.findOne({_id:JSON.parse(decoded!)._id},{password:0,_id:0,user_type:0,customer_id:0,created_at:0});
        if(!existuser){
            return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }




        return NextResponse.json({message:"User fetched successfully",success:true,data:existuser},{status:200})
    } catch (error) {

        console.log(error);
        
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
}