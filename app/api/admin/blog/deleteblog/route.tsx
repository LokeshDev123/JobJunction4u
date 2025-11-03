import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/db";
import Blog from "@/models/Blog";

import User from "@/models/User";
import { blogSchema ,deleteSchema} from "@/schema/blogSchema";


export async function DELETE(req:NextRequest){
    try {
        await connectDB();
        const decode=  req.headers.get('user')

        const exist_user=await User.findOne({_id:JSON.parse(decode!)._id,user_type:"admin"})

        if(!exist_user){
            return NextResponse.json({message:"Invalid Request",success:false},{status:404})

        }

        const body=await req.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedata:any=deleteSchema.safeParse(body);

        if(!parsedata.success){
            return NextResponse.json({message:`Error: ${parsedata.error.issues[0].path[0]} ${parsedata.error.issues[0].message}`,success:false},{status:400})
        }
        const {id}=parsedata.data;

        const blog=await Blog.findOneAndDelete({_id:id,userId:exist_user._id});

        if(!blog){
            return NextResponse.json({message:"Blog not found",success:false},{status:404})
        }

        return NextResponse.json({message:"Blog Deleted Successfully",success:true},{status:200})
        

    } catch (error) {

        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
        
    }
}