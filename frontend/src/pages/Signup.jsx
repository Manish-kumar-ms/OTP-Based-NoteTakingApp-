import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [step, setStep] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { serverUrl,setUserData } = useContext(UserDataContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${serverUrl}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dob,
      });

      if (res.status === 201) {
        setStep("verify");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
        keepMeLoggedIn: false,
      },{withCredentials:true});

      if (res.data.success) {
        setUserData(res.data.user);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Column */}
      <div className="flex flex-col bg-white w-full lg:w-[591px] p-6 lg:p-8">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src="top.png" alt="Logo" className="h-8" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center flex-1 px-2 sm:px-6 lg:px-16">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-bold text-[32px] sm:text-[40px] leading-[110%] tracking-[-0.04em] text-[#232323]">
              Sign up
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[150%] text-[#969696]">
              Sign up to enjoy the feature of HD
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={step === "signup" ? handleSignup : handleVerifyOtp}
            className="flex flex-col gap-5 w-full"
          >
            {/* Name */}
            <div className="relative w-full">
              <label className="absolute left-4 -top-3 bg-white px-1 text-[#969696] text-[14px]">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[59px] p-4 rounded-[10px] border border-[#D9D9D9]"
                required
                disabled={step === "verify"}
              />
            </div>

            {/* DOB */}
            <div className="relative w-full">
              <label className="absolute left-4 -top-3 bg-white px-1 text-[#969696] text-[14px]">
                Date of Birth
              </label>
              <img
                src="calendar.png"
                alt="calendar"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full h-[59px] pl-12 pr-4 rounded-[10px] border border-[#D9D9D9]"
                required
                disabled={step === "verify"}
              />
            </div>

            {/* Email */}
            <div className="relative w-full">
              <label className="absolute left-4 -top-3 bg-white px-1 text-[#969696] text-[14px]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[59px] p-4 rounded-[10px] border border-[#D9D9D9]"
                required
                disabled={step === "verify"}
              />
            </div>

            {/* OTP field */}
            {step === "verify" && (
              <div className="relative w-full">
                <label className="absolute left-4 -top-3 bg-white px-1 text-[#969696] text-[14px]">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full h-[59px] p-4 rounded-[10px] border border-[#D9D9D9]"
                  required
                />
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[54px] bg-[#367AFF] text-white px-2 py-4 rounded-[10px]"
            >
              {loading
                ? "Please wait..."
                : step === "signup"
                ? "Get OTP"
                : "Sign Up"}
            </button>
          </form>

          {/* Error */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Already have account */}
          <p className="mt-6 text-center text-[16px] sm:text-[18px] leading-[150%] text-[#969696]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline text-[#367AFF]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden lg:flex items-center justify-center w-full lg:w-[849px] p-3">
        <img
          src="right-column.png"
          alt="Sign up illustration"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
