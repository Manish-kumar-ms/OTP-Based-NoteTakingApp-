import { sendVerificationEmail } from "../Config/sendMail.js";
import crypto from "crypto";
import UserModel from "../Model/UserModel.js";
export const signup = async (req, res) => {
  try {
    const { name, email, dateOfBirth } = req.body;
    if (!name || !email || !dateOfBirth) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    let user = await UserModel.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Generate secure OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (!user) {
      // Create new user with OTP
      user = new UserModel({
        name,
        email,
        dateOfBirth,
        otp: otpHash,
        otpExpiry: Date.now() + 5 * 60 * 1000, // 5 min
      });
    } else {
      // Update existing unverified user
      user.name = name;
      user.dateOfBirth = dateOfBirth;
      user.otp = otpHash;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
    }

    await user.save();

    const response = await sendVerificationEmail(email, otp);
    if (response && response.accepted && response.accepted.length > 0) {
      // Email successfully handed over to SMTP
      res
        .status(201)
        .json({ message: "OTP sent to your email. Please verify" });
    } else {
      // Something went wrong
      res.status(500).json({ error: "Failed to send verification email" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate secure OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    user.otp = otpHash;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    const response = await sendVerificationEmail(email, otp);
    if (response && response.accepted && response.accepted.length > 0) {
      // Email successfully handed over to SMTP
      res
        .status(200)
        .json({ message: "OTP sent to your email. Please verify" });
    } else {
      // Something went wrong
      res.status(500).json({ error: "Failed to send verification email" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
        });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "There is some problem on logout",
    });
  }
};


export const currentuser=async(req,res)=>{
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User fetched successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
