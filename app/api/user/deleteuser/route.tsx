import User from "@/models/User";
import { deleteUserSchema } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest) {
    try {
        
        const body=await req.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=deleteUserSchema.safeParse(body)

        if(!parseData.success){
            return NextResponse.json({success:false,message:parseData.error.issues[0].path[0] + " " + parseData.error.issues[0].message},{status:400})
        }

        const {_id}=parseData.data;

        const decoded=req.headers.get("token");

        const existuser=User.findOne({_id:JSON.parse(decoded!)._id,user_type:"admin"});
        if(!existuser){
            return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }
        

        const existingUserById=await User.findByIdAndDelete(_id);

        
        if(!existingUserById){
            return NextResponse.json({message:"User does not exist",success:false},{status:400})
        }

        return NextResponse.json({message:"User deleted successfully",success:true},{status:200})
        
    } catch (error) {
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
    
}