import express from "express";
import { signUp } from "../controllers/auth/user.signup.controller.js";
import { signIn } from "../controllers/auth/user.login.controller.js";
import { signOut } from "../controllers/auth/user.logout.controller.js";

export const authRouter = express.Router();

// Register routes
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
