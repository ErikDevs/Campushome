import express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/user.auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { userRouter } from "./routes/users.route.js";

config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(errorHandler);

app.use(express.urlencoded({ extended: false }));

app.use("/api/", userRouter);

app.use("/api/", authRouter);

app.get("/", (req, res) => {
  res.json("new app");
});

app.listen(port, (req, res) => {
  console.log(`app listening to port ${port}`);
});
