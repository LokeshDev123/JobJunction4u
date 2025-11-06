import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/db";

import { blogSchema } from "@/schema/blogSchema";
import User from "@/models/User";
import Blog from "@/models/Blog";


export async function POST(req:NextRequest){
    try {

        await connectDB();

        const body=await req.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=blogSchema.safeParse(body);
        
        if(!parseData.success){
            
            return NextResponse.json({message:`Error: ${parseData.error.issues[0].path[0]} ${parseData.error.issues[0].message}`,success:false},{status:400})
        }
 

        const decoded=  req.headers.get('token')
        
        
        const exist_user=await User.findOne({_id:JSON.parse(decoded!)._id,user_type:"admin"})

        if(!exist_user){
            return NextResponse.json({message:"Invalid Request",success:false},{status:404})
        }

        const {title,author,image,content}=parseData.data;

        const newBlog=new Blog({title,author,image,content,user_id:exist_user._id});

        await newBlog.save();

        return NextResponse.json({message:"Blog Created Successfully",success:true},{status:200})


        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}



