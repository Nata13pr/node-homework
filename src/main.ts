import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { jobRunner } from "./crons";
import { ApiError } from "./errors/api-error";
import { carRouter } from "./routers/car/car.router";
import { authRouter } from "./routers/user/auth.router";
import { userRouter } from "./routers/user/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use("/cars", carRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
  },
);

process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
  await mongoose.connect(configs.MONGO_URL);
  console.log("Server is running on port 3000");
  jobRunner();
});
