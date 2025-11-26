import dbToConnect from "@/db/db";
import Job from "@/models/Job";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbToConnect()
   
    const body = await req.json()

    // Find jobs
    const jobs = await Job.findOne({_id:body._id},{__v:0})
      

    return new Response(
      JSON.stringify({ success: true, job: jobs }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Filter API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
