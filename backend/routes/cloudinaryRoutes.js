import express from "express";
import { uploadSingle } from "../middleware/uploadMiddleware.js";
import { compressImage, getCloudinaryInfo, enhanceImage, convert_webp_to_png } from "../controllers/cloudinaryController.js";

const router = express.Router();

router.post("/compress-image", uploadSingle, compressImage);
router.get("/cloudinary-info/:public_id", getCloudinaryInfo);
router.post('/upscale', uploadSingle, enhanceImage )
router.post('/convert_webp_to_png', uploadSingle, enhanceImage )

export default router;
 