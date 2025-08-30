import express from 'express'
import { currentuser, login, logout, signup } from '../Controller/AuthController.js'
import { verifyOtp } from '../Config/VerifyOtp.js'
import { sendVerificationEmail } from '../Config/sendMail.js'
import { ensureAuthenticated } from '../Middleware/auth.js'

const router=express.Router()



router.post("/signup",signup)
router.post("/login",login)
router.post("/verify-otp",verifyOtp)
router.post("/logout",logout)
router.get("/currentUser",ensureAuthenticated,currentuser)

export default router