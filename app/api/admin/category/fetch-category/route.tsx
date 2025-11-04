import dbToConnect from "@/db/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        
        
        await dbToConnect();

        const data=await Category.find();

        return NextResponse.json({data:data,success:true},{status:200})

    } catch (error) {
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}