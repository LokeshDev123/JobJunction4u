

import dbToConnect from "@/db/db";

import Job from "@/models/Job";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbToConnect();

    const jobs = await Job.countDocuments();
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
