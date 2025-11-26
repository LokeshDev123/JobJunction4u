import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";


export async function POST(req:NextRequest){

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
      $or: [{ user_type: "user" }],
    });

    if (!existuser) {
          
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }


      
        const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});


const options = {
  amount: 2900,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",

};
const order=await instance.orders.create(options);

return NextResponse.json({order,name:existuser.name,email:existuser.email,phone:existuser.mobile_no,success:true},{status:200})


  

        
    } catch (error) {
        
        return NextResponse.json({message: 'Internal Server Error', success: false}, {status: 500})
    }
}