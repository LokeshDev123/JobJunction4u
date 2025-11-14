import dbToConnect from "@/db/db";
import Job from "@/models/Job";
import User from "@/models/User";
import { jobUpdateSchema } from "@/schema/jobSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await dbToConnect();

    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData: any = jobUpdateSchema.safeParse(body);

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


    const existjob=await Job.findOne({_id:body._id})
    if(!existjob){
        return NextResponse.json({message:"Job does not exist",success:false},{status:400})
    }


    existjob.title=body.title;
    existjob.description=body.description;
    existjob.category=body.category;
    existjob.role=body.role;
    existjob.job_type=body.job_type;
    existjob.responsibilities=body.responsibilities;
    existjob.skills=body.skills;
    existjob.salary=body.salary;
    existjob.location=body.location;
    existjob.experience=body.experience;
    existjob.job_expiry_date=body.job_expiry_date;

    await existjob.save();


    

    return NextResponse.json(
      { message: "Job Updated Successfully", success: true },
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
