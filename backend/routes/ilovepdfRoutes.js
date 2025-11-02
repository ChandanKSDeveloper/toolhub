import express from "express";
import { uploadSingle, uploadMultiple } from "../middleware/uploadMiddleware.js";
import { compressPDF, mergePDF, imageToPDF, convertPdfToWord, compressImage } from "../controllers/ilovepdfController.js";


const router = express.Router();

router.post("/compress", uploadSingle, compressPDF);
router.post('/merge', uploadMultiple, mergePDF);
router.post("/image-to-pdf", uploadMultiple, imageToPDF);
router.post("/pdf-to-word", uploadSingle, convertPdfToWord);
router.post("/compress-image", uploadSingle, compressImage);

export default router;
