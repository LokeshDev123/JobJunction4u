import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { razorpay_payment_id, razorpay_signature, subscription_id } = body;

    // Your Razorpay secret key
    const secret = process.env.RAZORPAY_SECRET as string;

    // Generate signature using HMAC SHA256
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_payment_id}|${subscription_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
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
