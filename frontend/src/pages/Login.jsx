import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [step, setStep] = useState("login"); // "login" → enter email, "verify" → enter OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
   const { userData, setUserData,serverUrl } = useContext(UserDataContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 → request OTP
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        email: formData.email,
      });

      if (res.status === 200) {
        setStep("verify");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 → verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
        keepMeLoggedIn: keepMeLoggedIn,
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

  // Resend OTP (same as login API)
  const handleResendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        email: formData.email,
      });

      if (res.status === 200) {
        // maybe show toast "OTP resent"
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP");
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
              Sign in
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[150%] text-[#969696]">
              Welcome back! Sign in to continue
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={step === "login" ? handleLogin : handleVerifyOtp}
            className="flex flex-col gap-5 w-full"
          >
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
                disabled={step === "verify"} // lock after OTP requested
              />
            </div>

            {/* OTP field */}
            {step === "verify" && (
              <>
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

                {/* Resend OTP */}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-[#367AFF] underline text-sm w-fit"
                >
                  Resend OTP
                </button>

                {/* Keep me logged in */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="keepMeLoggedIn"
                    checked={keepMeLoggedIn}
                    onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="keepMeLoggedIn"
                    className="text-[#232323] text-sm"
                  >
                    Keep me logged in
                  </label>
                </div>
              </>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[54px] bg-[#367AFF] text-white px-2 py-4 rounded-[10px]"
            >
              {loading
                ? "Please wait..."
                : step === "login"
                ? "Get OTP"
                : "Sign In"}
            </button>
          </form>

          {/* Error */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* No account link */}
          <p className="mt-6 text-center text-[16px] sm:text-[18px] leading-[150%] text-[#969696]">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold underline text-[#367AFF]"
            >
              Sign up
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
