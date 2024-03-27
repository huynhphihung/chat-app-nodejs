import express from "express";
import { userLogin } from "../controllers/login.js";
import { userSignup } from "../controllers/signup.js";
import { userLogout } from "../controllers/logout.js";

const authRouter = express.Router();

authRouter.post("/login", userLogin);
authRouter.post("/signup", userSignup);
authRouter.post("/logout", userLogout);

export default authRouter;
