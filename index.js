import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//conexiones de carpetas
import { environments } from "./src/config/environments.js";
import { startDb } from "./src/config/db.js";
import { userRouter } from "./src/routes/users.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { testRouter } from "./src/routes/tes.routes.js";

import "./src/models/User.model.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/users", userRouter);

app.use("/auth", authRouter);

app.use("/test", testRouter);

app.listen(environments.PORT, async () => {
  console.log(`server on port ${environments.PORT}`);
  startDb();
});
