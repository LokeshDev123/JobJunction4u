import dbToConnect from "@/db/db";
import Category from "@/models/Category";
import User from "@/models/User";
import { categoryCreateSchema } from "@/schema/categorySchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        
        const decoded = req.headers.get("token");

    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }

    const existuser = await User.findOne({
      _id: JSON.parse(decoded!)._id,
      $or: [{ user_type: "admin" }, { user_type: "recruiter" }],
    });
        const  body=await req.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=categoryCreateSchema.safeParse(body)

        if(!parseData.success){
            return NextResponse.json({message:`Error: ${parseData.error.issues[0].path[0]} ${parseData.error.issues[0].message}`,success:false},{status:400})
        }

        await dbToConnect();

        const {name}=parseData.data;

        const newCategory=new Category({name});

        await newCategory.save();

        return NextResponse.json({message:"Category Created Successfully",success:true},{status:200})

    } catch (error) {
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}