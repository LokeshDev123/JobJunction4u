import User from "@/models/User";
import { userSearchSchema } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){

    try {
            
        const body=await req.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parseData:any=userSearchSchema.safeParse(body)

        if(!parseData.success){
            return NextResponse.json({success:false,message:parseData.error.issues[0].path[0] + " " + parseData.error.issues[0].message},{status:400})
        }
        const decoded=req.headers.get("token");

        const existuser=User.findOne({_id:JSON.parse(decoded!)._id,user_type:"admin"});
        if(!existuser){
            return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }


        
        const users=await User.find({
  $text: { $search: "\"" + parseData.data.search + "\""  }
}, {
  score: { $meta: "textScore" },
  name: 1,
  email: 1,
  mobile_no: 1
}).sort({ score: { $meta: "textScore" } }).skip(parseData.data.skip).limit(150);


        return NextResponse.json({message:"User fetched successfully",success:true,data:users},{status:200})
    } catch (error) {
        
        return NextResponse.json({message:"Internal Server Error",success:false},{status:500})
    }
}