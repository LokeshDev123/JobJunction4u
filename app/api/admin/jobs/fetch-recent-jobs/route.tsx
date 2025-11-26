import dbToConnect from "@/db/db";
import Job from "@/models/Job";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbToConnect()
   

    // Find jobs
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(20)
      

    return new Response(
      JSON.stringify({ success: true, jobs }),
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
