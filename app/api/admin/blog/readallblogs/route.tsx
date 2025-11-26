import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/db";
import Blog from "@/models/Blog";
import { blogSchema } from "@/schema/blogSchema";
import User from "@/models/User";



export async function POST(req:NextRequest){
    try {
        await connectDB();

        const blogs=await Blog.find().sort({date:-1});

        

        return NextResponse.json({message:"Success",success:true,data:blogs},{status:200});

        
    } catch (error) {
        
        console.log(error);
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}