import dbToConnect from "@/db/db";
import Category from "@/models/Category";
import Role from "@/models/Role";
import { roleFetchSchema } from "@/schema/roleSchema";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        
         const  body=await req.json()

       
         
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=roleFetchSchema.safeParse(body)

        if(!parseData.success){
            return NextResponse.json({message:`Error: ${parseData.error.issues[0].path[0]} ${parseData.error.issues[0].message}`,success:false},{status:400})
        }
        await dbToConnect();

        const myCategory=await Category.findOne({_id:parseData.data.category_id});
        if(!myCategory){
            return NextResponse.json({message:"Category Not Found",success:false},{status:404})
        }

        const data=await Role.find({category_id:parseData.data.category_id});

        return NextResponse.json({data:data,category:myCategory.name,success:true},{status:200})

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}