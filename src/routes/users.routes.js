import { Router } from "express";
import {
  CtrlcreateUser,
  ctrlGetAllUsers,
} from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", ctrlGetAllUsers);

userRouter.post("/", CtrlcreateUser);

export { userRouter };
