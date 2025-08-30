import nodemailer from "nodemailer";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "sonu9518kumar@gmail.com",
    pass: "qoqj oxfw laxg tpyo",
  },
});


export const sendVerificationEmail = async (email, verificationCode) => {
  try {
   const response=  await transporter.sendMail({
    from: '"Manish" <sonu9518kumar@gmail.com>',
    to: email , // list of receivers
    subject: "Verify your Email", // Subject line
     text: "Verify your Email", // plain text body
    html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
  });
  console.log('Email send Successfully',response)
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
 

export const sendWelcomeEmail = async (email, name) => {
    try {
     const response = await transporter.sendMail({
            from: '"Manish" <sonu9518kumar@gmail.com>',

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully',response)
       // return res.status(200).json({message:"Welcome email sent",response})
    } catch (error) {
        console.log('Email error',error)
        //return res.status(500).json({ message: "Error while sending welcome email", error });
    }
}
