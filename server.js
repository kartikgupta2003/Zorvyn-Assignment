import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import "./Config/env.js";
import authRouter from "./Routes/authRoutes.js";
import dashBoardRouter from "./Routes/dashBoardRoutes.js";
import recordRouter from "./Routes/recordRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import errorHandler from "./Middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();

app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true 
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRouter);
app.use("/api/records" , recordRouter);
app.use("/api/dashboard" , dashBoardRouter);
app.use("/api/user" , userRouter);


app.use(errorHandler);


const PORT = process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`Server connected at port ${PORT}`);
})

