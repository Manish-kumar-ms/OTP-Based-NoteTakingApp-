import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  otp: {
    type: String, // will store the generated OTP
  },
  otpExpiry: {
    type: Date, // will store the expiry time of OTP
  },
  isVerified: {
    type: Boolean,
    default: false, // mark true after OTP verification
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
