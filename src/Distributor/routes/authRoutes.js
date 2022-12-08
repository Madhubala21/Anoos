import { Router } from "express";
import {
  emailLogin,
  Forgot,
  verifyCode,
  logout,
} from "../controller/authController.js";
import require from "requirejs";
const rateLimit = require("express-rate-limit");
const msg = {
  message: "Oops...! Limit Exceeded, Kindly Try Again after 60mins.",
};
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5,
  message: msg,
  skipFailedRequests: true,
});

const authRouter = Router();

//login
authRouter.post("/login", emailLogin);

//logout
authRouter.post("/logout", logout);

//account management
authRouter.post("/sendEmailCode", apiLimiter, Forgot);
authRouter.post("/verifyEmailCode", apiLimiter, verifyCode);

export { authRouter };
