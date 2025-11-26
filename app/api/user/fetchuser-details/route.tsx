import Subscription from "@/models/Subscription";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

// Convert Date to DD/MM/YYYY
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToDDMMYYYY(dateString: any) {
  if (!dateString) return null; // prevent invalid date

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function GET(req: NextRequest) {
  try {
    const decoded = req.headers.get("token");
    if (!decoded) {
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }

    const parsed = JSON.parse(decoded);

    const existuser = await User.findOne(
      { _id: parsed._id },
      { password: 0, _id: 0, user_type: 0, customer_id: 0, created_at: 0 }
    );

    if (!existuser) {
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }

    const subscription = await Subscription.findOne({ user_id: parsed._id });

  
    if(!subscription){

        const user_detail={
            ...existuser.toObject(),
            status:"No Active"
        }
        return NextResponse.json(
            { message: "User fetched successfully",data: user_detail, success: true},
            { status: 200 }
          );
    }

    if(subscription.end_at<new Date()){
        const user_detail={
            ...existuser.toObject(),
            status:"Expired"
        }
        return NextResponse.json(
            { message: "User fetched successfully",data: user_detail, success: true},
            { status: 200 }
        )
    }

       const user_detail={
            ...existuser.toObject(),
            status:"Active",
        }
    
    return NextResponse.json(
      { message: "User fetched successfully", success: true, data: user_detail },
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
