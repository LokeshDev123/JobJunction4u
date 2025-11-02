import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){ 

    try {


        return NextResponse.json({message:"Admin job creation endpoint"}, {status:200})
        
    } catch (error) {
        console.log(error);
        
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
}