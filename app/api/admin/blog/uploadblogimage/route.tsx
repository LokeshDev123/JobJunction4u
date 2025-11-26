import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid'; // For ES Modules
import User from "@/models/User";
import dbToConnect from "@/db/db";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
    
    try {


      

        await dbToConnect();

        const formdata=await req.formData();
        const file=formdata.get('file') as File
        const token=formdata.get('token') as string

         if(!token){
                    return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenVerify:any= jwt.verify(token, process.env.AUTH_PASS!);
              
        
      if(!tokenVerify){
                    return NextResponse.json({message:"Unauthorized Access",success:false},{status:401})
       }

       
        

    const existuser = await User.findOne({
      _id:tokenVerify._id ,
      user_type: { $in: ["admin", "recruiter"] },
    });
        
    if (!existuser) {
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }
        
            if (!file) {
      return NextResponse.json(
        { message: "No file provided", success: false },
        { status: 400 }
      );
    }
    if(!file.type.startsWith("image/")){
        return NextResponse.json({message: 'File type should be image', success: false}, {status: 400})
    }


    if(file.size>5*1024*1024){
        return NextResponse.json({message: 'File size should be less than 5MB', success: false}, {status: 400})
    }
  

    const uploadPath = path.join(process.cwd(), "statics", "blogs")
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

     const bytes = Buffer.from(await file.arrayBuffer());
     const filename = Date.now() + "-" + uuidv4() + path.extname(file.name);
    const filePath = path.join(uploadPath, filename);
    await writeFile(filePath, bytes);





return NextResponse.json({message: 'Image uploaded successfully',image:`${process.env.BASE_URL}/api/statics/blogs/${filename}`, success: true})

} catch (error) {
    console.log(error);
    
        return NextResponse.json({message: 'Something went wrong', success: false}, {status: 500})
    
    }
}
