import path from "path";
import fs from "fs";
// import ilovepdf from "../utils/iLovePdfClient.js";
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import cloudinary from "../utils/cloudinaryClient.js";
import { cleanupFile } from "../utils/helper.js";
import {uploadBufferToCloudinary} from '../utils/helper.js';


const ilovepdf = new ILovePDFApi(
  process.env.ILOVEPDF_PUBLIC_KEY,
  process.env.ILOVEPDF_SECRET_KEY
);


// Compress PDF
export const compressPDF = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.resolve(req.file.path);
  const originalName = req.file.originalname;

  // Validate PDF
  if (path.extname(originalName).toLowerCase() !== ".pdf") {
    fs.unlinkSync(filePath);
    return res.status(400).json({ error: "Only PDF files are supported." });
  }

  // Check if file exists and has content
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ error: "Uploaded file not found" });
  }

  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ error: "Uploaded file is empty" });
  }

  try {
   
    console.log("Uploading file to Cloudinary...");
    const cloudRes = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "pdfs",
    });

    const cloudinaryUrl = cloudRes.secure_url;
    console.log("Uploaded to Cloudinary:", cloudinaryUrl);

    console.log("iLovePDF starting");
    const task = ilovepdf.newTask("compress");
    await task.start();
    console.log("iLovePDF task started");

    await task.addFile(cloudinaryUrl);
    console.log("File added to iLovePDF task via URL");
   
    await task.process({ compression_level: "recommended" });
    console.log("Compression completed");

   
    const data = await task.download();
    console.log("Downloaded compressed file, size:", data.length, "bytes");

    const outputFileName = `compressed_${originalName}`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${outputFileName}"`);
    res.send(data);

    console.log("File sent to client");
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    console.log(err);

    res.status(500).json({
      error: "PDF processing failed",
      details: err.message || err
    });
  } finally {
    cleanupFile(filePath);
  }
};


export const mergePDF = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  console.log(`Processing ${req.files.length} files for merge`);

  try {
    console.log("Merging Api called");

    const task = ilovepdf.newTask("merge");
    await task.start();
    console.log("Task started");

    // Upload all files to Cloudinary in parallel
    console.log("Uploading files to Cloudinary in parallel...");
    
    const uploadPromises = req.files.map(file => {
      const fileBuffer = fs.readFileSync(file.path);
      return uploadBufferToCloudinary(fileBuffer, file.originalname);
    });

    const cloudinaryResults = await Promise.all(uploadPromises);
    console.log("All files uploaded to Cloudinary");

    // Add all Cloudinary URLs to iLovePDF
    for (const result of cloudinaryResults) {
      await task.addFile(result.secure_url);
      console.log("Added file to merge task:", result.secure_url);
    }

    // Process the merge
    console.log("Processing merge...");
    await task.process();
    console.log("Merge completed");

    // Download and send result
    const mergedBuffer = await task.download();
    console.log("Merged file size:", mergedBuffer.length, "bytes");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="merged_document.pdf"`);
    res.send(mergedBuffer);

    console.log("✅ Merge completed successfully!");

  } catch (err) {
    console.error("❌ Merge error:", err.message);
    
    // Cleanup
    req.files?.forEach((file) => cleanupFile(file.path));
    
    return res.status(500).json({ 
      error: "PDF merge failed", 
      details: err.message 
    });
  }
};

export const imageToPDF = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }

  try {
    // 1️⃣ Upload all images to Cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
      const filePath = path.resolve(file.path);

      const uploadRes = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        folder: "images-to-pdf",
        quality: "auto:best" // ✅ Best possible quality
      });

      uploadedImages.push(uploadRes.secure_url);

      cleanupFile(filePath); // ✅ Clean local temp file
    }

    // 2️⃣ Create iLovePDF Task
    const task = ilovepdf.newTask("imagepdf");
    await task.start();

    console.log("ADDING IMAGES (ORDERED):", uploadedImages);

    // 3️⃣ Add images **in order**
    for (const imageUrl of uploadedImages) {
      await task.addFile(imageUrl);
    }

    // 4️⃣ Process conversion
    await task.process({
      pagesize: "fit",       // Fit image to page
      margin: "0",
      orientation: "portrait"
    });

    // 5️⃣ Download final PDF
    const pdfBuffer = await task.download();

    // 6️⃣ Send to frontend
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="merged_images_${Date.now()}.pdf"`
    );

    return res.send(pdfBuffer);

  } catch (error) {
    console.error("Image to PDF error:", error);
    return res.status(500).json({
      error: "Image to PDF conversion failed",
      details: error.message
    });
  }
};


export const convertPdfToWord = async (req, res) => {
  try {
      const pdfFile = req.file;
      const filePath = pdfFile.path;

    if (!pdfFile) {
      return res.status(400).json({ error: "No PDF provided" });
    }

      // Read PDF Buffer
    const buffer = fs.readFileSync(pdfFile.path);

    // Convert PDF → Word using mammoth
    const result = await mammoth.convertToHtml({ buffer });

    const wordHtml = result.value;
    const outputPath = path.join("uploads", `converted_${Date.now()}.doc`);

    fs.writeFileSync(outputPath, wordHtml);

    res.download(outputPath, () => {
      fs.unlinkSync(pdfFile.path);
      fs.unlinkSync(outputPath);
    });


  } catch (error) {
     console.error("PDF -> Word Error:", error);
    res.status(500).json({ error: "Failed to convert PDF." });
  } finally {
    cleanupFile(filePath)
  }
}


export const compressImage = async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "No image provided" });
    }

    const outputPath = path.join("uploads", `compressed_${Date.now()}.jpg`);

    await sharp(imageFile.path)
      .jpeg({ quality: 60 })   // lower for more compression
      .toFile(outputPath);

    res.download(outputPath, () => {
      fs.unlinkSync(imageFile.path);
      fs.unlinkSync(outputPath);
    });

  } catch (error) {
    console.error("Compress Image Error:", error);
    res.status(500).json({ error: "Failed to compress image." });
  } finally {
    cleanupFile(imageFile.path)
  }
};