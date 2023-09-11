import { Router } from "express";
import { getUser } from "../middlewares/getUser.js";
import { isAdmin } from "../middlewares/roles.js";

const testRouter = Router();

testRouter.get("/", getUser, isAdmin, (req, res) => {
  res.json(req.user);
});

export { testRouter };
