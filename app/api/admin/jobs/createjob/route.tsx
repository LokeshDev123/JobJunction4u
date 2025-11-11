import dbToConnect from "@/db/db";
import Category from "@/models/Category";
import Job from "@/models/Job";
import User from "@/models/User";
import { jobCreateSchema } from "@/schema/jobSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbToConnect();

    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData: any = jobCreateSchema.safeParse(body);

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

    const existCategory=await Category.findOne({_id:body.category})

    if(!existCategory){
        return NextResponse.json({message:"Category Not Found",success:false},{status:404})
    }

    

    const newJob = new Job({
      user_id: existuser._id,
      title: body.title,
      description: body.description,
      image_url: body.image_url,
      location: body.location,
      category: existCategory.name,
      role: body.role,
      job_type: body.job_type,
      responsibilities: body.responsibilities,
      skills: body.skills,
      salary: body.salary,
      job_link: body.job_link,
      experience: body.experience,
      job_expiry_date: body.job_expiry_date,
    });
    await newJob.save();

    return NextResponse.json(
      { message: "Job Created Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
