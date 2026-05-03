import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connentMongoDB.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({limit:"5mb"})); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Simple landing page for the backend
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; padding: 2rem; text-align: center; max-width: 600px; margin: 0 auto; margin-top: 10vh;">
      <h1 style="color: #1a1a1a;">Postly API Backend</h1>
      <p style="color: #666; font-size: 1.1rem; line-height: 1.5;">This server is actively running and processing API requests.</p>
      <div style="margin-top: 2.5rem; padding: 2rem; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
        <p style="margin-bottom: 1.5rem; color: #334155; font-weight: 500; font-size: 1.1rem;">You are probably looking for the main application:</p>
        <a href="https://postly-frontend-five.vercel.app/" 
           style="display: inline-block; background: #0f172a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transition: all 0.2s;">
          Go to Postly App
        </a>
      </div>
    </div>
  `);
});


app.listen(PORT, () => {
  console.log(`server is up and rrunning on port ${PORT}`);
  connectMongoDB();
});
