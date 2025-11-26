import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/db";

import User from "@/models/User";
import { blogSchema } from "@/schema/blogSchema";
import Blog from "@/models/Blog";



export async function POST(req:NextRequest){
    try {
        await connectDB();

        const body=await req.json();

        
        const blogs=await Blog.findOne({_id:body.id}).sort({date:-1});

        if(!blogs){
            return NextResponse.json({message:"Blog not found",success:false},{status:404})
        }
        return NextResponse.json({message:"Success",success:true,data:blogs},{status:200});

        
    } catch (error) {
        
        console.log(error);
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}