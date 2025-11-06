import dbToConnect from "@/db/db";
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

        const data=await Role.find({});

        return NextResponse.json({data:data,success:true},{status:200})

    } catch (error) {
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}