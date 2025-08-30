import UserModel from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, keepMeLoggedIn } = req.body;

    if (!email || !otp || keepMeLoggedIn) {
      return res
        .status(400)
        .json({ error: "Email, OTP and keepMeLoggedIn are required" });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the user input and compare
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== otpHash || Date.now() > user.otpExpiry) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // OTP is valid, verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const tokenExpiry = keepMeLoggedIn ? "7d" : "1h"; // front-end sends keepMeLoggedIn: true/false

    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: tokenExpiry,
    });

    // calculate cookie maxAge based on tokenExpiry
    const maxAge = keepMeLoggedIn
      ? 7 * 24 * 60 * 60 * 1000 // 7 days in ms
      : 1 * 60 * 60 * 1000; // 1 hour in ms
    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge,
      sameSite: "Strict",
      secure: false, // Set to true if using HTTPS
    });
 
    res.json({
      success: true,
      message: "OTP verified successfully!",
      jwtToken,
      email,
      name: user.name,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "error while verifying OTP", error });
  }
};
