/* eslint-disable @typescript-eslint/no-explicit-any */
import dbToConnect from "@/db/db";
import User from "@/models/User";
import { createUserSchema } from "@/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await dbToConnect();

    const body = await req.json();
    const parsedData: any = createUserSchema.safeParse(body);

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
      _id: JSON.parse(decoded)._id,
      $or: [{ user_type: "admin" }],
    });

    if (!existuser) {
      return NextResponse.json(
        { message: "Invalid Request", success: false },
        { status: 404 }
      );
    }

    const {
      name,
      email,
      mobile_no,
      user_type,
      password,
      cpassword,
      authpasscode,
    } = parsedData.data;

    if (authpasscode !== process.env.AUTH_PASS) {
      return NextResponse.json(
        { message: "Unauthorized Access", success: false },
        { status: 401 }
      );
    }

    if (password !== cpassword) {
      return NextResponse.json(
        {
          message: "Password and Confirm Password must be same",
          success: false,
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 400 }
      );
    }

    const existingUserByMobile = await User.findOne({ mobile_no });
    if (existingUserByMobile) {
      return NextResponse.json(
        { message: "Mobile number already exists", success: false },
        { status: 400 }
      );
    }

    // Encrypt password
    const ciphertext = CryptoJS.AES.encrypt(
      password,
      process.env.AUTH_PASS!
    ).toString();

    const newUser = new User({
      name,
      email,
      mobile_no,
      user_type,
      password: ciphertext,
    });

    await newUser.save();

    // ----------------------------------------
    // 🚀 SEND EMAIL USING NODEMAILER
    // ----------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

    await transporter.sendMail({
      from: `"Lokesh DevCoder" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Your Account Created Successfully",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your account has been successfully created.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile_no}</p>
        <p><strong>User Type:</strong> ${user_type}</p>
        <br/>
        <p>Thank you for joining us!</p>
        <p>— Jobjunction4u Team</p>
      `,
    });

    return NextResponse.json(
      { message: "User created successfully & email sent", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
