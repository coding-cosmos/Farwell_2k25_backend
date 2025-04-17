import express from "express";
import cors from 'cors';
import { configDotenv } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";


configDotenv();
const app = express();

app.use(cors({origin:process.env.CLIENT_ORIGIN_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users",userRouter);

app.use(errorHandler);

export default app;
