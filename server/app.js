import express from "express";
import router from "./router/quizRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./.env" });

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Split the CORS_ORIGIN environment variable into an array of allowed origins
      const allowedOrigins = process.env.CORS_ORIGIN.split(",");

      // Check if the request's origin matches one of the allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Allow the request from the specified origin
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    credentials: true, // Allow sending cookies with the request (if applicable)
  })
);

app.use(express.json());
app.use(cookieParser());

// Define your routes
app.use("/api/quiz", router);

export { app };
