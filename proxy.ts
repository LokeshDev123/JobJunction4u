import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
export async function proxy(req:NextRequest){
    try {

        const token:string|null=req.nextUrl.searchParams.get("token");
        if(!token){
            return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }

        const tokenVerify= jwt.verify(token, process.env.AUTH_PASS!);
      

        if(!tokenVerify){
            return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }

        
        
        const ressponseHeader=new Headers(req.headers);
        ressponseHeader.set("token", JSON.stringify(tokenVerify));

        return NextResponse.next({
            request:{
                headers:ressponseHeader
            }
        });


        
    } catch (error) {
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
}

export const config={
    matcher:[
        "/api/admin/:path*",
        "/api/user/deleteuser",
        "/api/user/fetchuser-details",
        "/api/subscription/create-plan",
        "/api/subscription/create-subscription",
        
    ]
}