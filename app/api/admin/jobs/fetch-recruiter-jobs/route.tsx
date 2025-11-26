import Category from "@/models/Category";
import Job from "@/models/Job";
import User from "@/models/User";
import { jobSearchSchema } from "@/schema/jobSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
  
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

    if (!existuser) {
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }
    const body=await req.json();

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData:any=jobSearchSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            parsedData.error.issues[0].path[0] +
            " " +
            parsedData.error.issues[0].message,
        },
        { status: 400 }
      );
    }
    const {search,skip,category,job_type,role,experience}=parsedData.data;


 
    

    interface Query{
      
      category?:string,
      job_type?:string,
      role?:string,
      experience?:string,
      $text?:{ $search: string }
      user_id?:string
      
    }
    const query:Query={
      
    }

 
 if (search) {
  query.$text = { $search: `"${search}"` };
}
    



if(category ){
      const categoryName=await Category.findOne({_id:category});
      if(categoryName){

        query['category']=categoryName.name;
      }
    }
    if(job_type){
      query['job_type']=job_type;
    }
    if(role){
      query['role']=role;
    }
    if(experience){
      query['experience']=experience;
    }

    query['user_id']=existuser._id.toString();


    
    
    
    
    const getdata=await Job.find(query).skip(skip).limit(50)
    

    
    return NextResponse.json({message:"Jobs fetched successfully",range:`${skip}-${skip+50}`,success:true,data:getdata},{status:200})
  } catch (error) {
    
    console.log(error);
    
    return  NextResponse.json({message:"Interal Server Error",success:false}, {status:500})
  }
}