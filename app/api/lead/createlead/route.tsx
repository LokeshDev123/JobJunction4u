import connectDB from "@/db/db"
import Lead from "@/models/Leads";
import leadSchema from "@/schema/leadSchema";
import { NextRequest, NextResponse } from "next/server"
import { success } from "zod";

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});
export async function POST(req: NextRequest) {

    try {
        
    await connectDB()
    const body = await req.json()
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const parsed:any = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Error: " + parsed.error.issues[0].path[0] + " " + parsed.error.issues[0].message,success:false },
        { status: 400 }
      );
    }

    
    const { name, email, phone,message,authpass } = body;

if(authpass!==process.env.AUTH_PASSWORD){
    return NextResponse.json({ message: "Unauthorized access" },{status:401})
}

const newLead=new Lead({
    name,
    email,
    phone,
    message
})
await newLead.save()
    


setTimeout(async () => {


 await transporter.sendMail({
      from: `"LokeshDevCoder Lead Form" <${process.env.SMTP_USER}>`,
      to: "jobjunction4u1981@gmail.com", // replace with your email
      subject: `New query from ${name}`,
      text: `
        You have a new lead submission:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
       
        Message: ${message}
      `,
      html: `
        <h2>New Lead Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    await transporter.sendMail({
  from: `"LokeshDevCoder" <${process.env.SMTP_USER}>`,
  to: email, // customer's email
  subject: "We received your request ✔",
  text: `Hi ${name},\n\nThank you for reaching out. We’ve received your message and will get back to you soon.\n\nYour message:\n"${message}"\n\n- LokeshDevCoder`,
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <tr>
        <td style="background-color: #242323; text-align: center; padding: 20px;">
          <img src=${process.env.APP_LOGO_URL} alt="LokeshDevCoder Logo" style="max-height: 50px;" />
        </td>
      </tr>
      <tr>
        <td style="padding: 30px; color: #333333;">
          <h2 style="color: #242323; margin-top: 0;">Hi ${name},</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to us. We’ve received your message and our team will get back to you soon.
          </p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f3f3f3; border-left: 4px solid #ff4545;">
            <p style="margin: 0; font-style: italic; color: #555;">${message}</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">
            Best regards,<br/>
            <strong>LokeshDevCoder</strong>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #242323; text-align: center; padding: 15px; color: #ffffff; font-size: 13px;">
          © ${new Date().getFullYear()} LokeshDevCoder. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `,
});
},1000)


    return NextResponse.json({ message: "We Will Contact You Soon" ,success:true},{status:200})

     } catch (error) {
        return NextResponse.json({ message: "Failed to create lead",success:false },{status:500})
    }
}

