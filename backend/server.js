import express from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middleware/corsMiddleware.js";
import ilovepdfRoutes from "./routes/ilovepdfRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import imageGenerationRoute from "./routes/imageGenerationRoute.js";
import connectDB from "./config/dbConfig.js"

// import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(corsMiddleware);

connectDB();

// Routes
app.use("/api", ilovepdfRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", imageGenerationRoute);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      iLovePDF: !!process.env.ILOVEPDF_PUBLIC_KEY,
      Cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    },
  });
});



app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});