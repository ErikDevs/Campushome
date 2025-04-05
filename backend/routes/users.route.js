import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { updateERecord } from "../controllers/user.update.js";

export const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.post("/user/id", updateERecord);
