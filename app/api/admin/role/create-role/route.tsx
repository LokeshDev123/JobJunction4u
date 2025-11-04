import dbToConnect from "@/db/db";
import Role from "@/models/Role";
import User from "@/models/User";
import { roleCreateSchema } from "@/schema/roleSchema";
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
        const parseData:any=roleCreateSchema.safeParse(body)

        if(!parseData.success){
            return NextResponse.json({message:`Error: ${parseData.error.issues[0].path[0]} ${parseData.error.issues[0].message}`,success:false},{status:400})
        }

        await dbToConnect();

        const {name,category_name}=parseData.data;

        const newRole=new Role({name,category_name});

        await newRole.save();

        return NextResponse.json({message:"Role Created Successfully",success:true},{status:200})

    } catch (error) {
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}