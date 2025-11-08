import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import Subscription from "@/models/Subscription";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseData:any = createSubscriptionSchema.safeParse(body);

    if (!parseData.success) {
      return NextResponse.json(
        {
          success: false,
          message: parseData.error.issues[0].path[0] + " " + parseData.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    

    const { razorpay_payment_id, razorpay_signature, subscription_id } = body;

    // Your Razorpay secret key
    const secret = process.env.RAZORPAY_SECRET as string;

    // Generate signature using HMAC SHA256
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_payment_id}|${subscription_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {

      const newSubsription = new Subscription({
        user_id: body.user_id,
        plan_id: body.plan_id,
        plan_name: body.plan_name,
        razorpay_payment_id: body.razorpay_payment_id,
        subscription_id: body.subscription_id,
        subscription_end: body.subscription_end,
      });

      await newSubsription.save();

     
      // Payment verified successfully
      return NextResponse.json({
        success: true,
        message: "Payment verification successful ✅",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid signature ❌" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server error" },
      { status: 500 }
    );
  }
}
