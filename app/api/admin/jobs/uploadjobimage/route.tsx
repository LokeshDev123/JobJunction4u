import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid'; // For ES Modules

export async function POST(req: NextRequest) {
    
    try {

        
        const formdata=await req.formData();
        const file=formdata.get('file') as File
        
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
  

    const uploadPath = path.join(process.cwd(), "public", "jobs")


     const bytes = Buffer.from(await file.arrayBuffer());
     const filename = Date.now() + "-" + uuidv4() + path.extname(file.name);
    const filePath = path.join(uploadPath, filename);
    await writeFile(filePath, bytes);

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath)
}



return NextResponse.json({message: 'Image uploaded successfully',image:`${process.env.BASE_URL}/api/statics/jobs/${filename}`, success: true})

} catch (error) {
    console.log(error);
    
        return NextResponse.json({message: 'Something went wrong', success: false}, {status: 500})
    
    }
}