import User from "../models/User.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinaryClient.js";
import { cleanupFile } from "../utils/helper.js";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("REGISTER BODY:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ username, email, password });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        coverImage: user.coverImage,
        history: user.history,
      },
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    if (!user) return res.status(400).json({ message: "Invalid credentials (email not found)" });

   const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });
    console.log("MATCH RESULT:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials (wrong password)" });



    // remove password before returning
    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      coverImage: user.coverImage
    };

    return res.json({
      user: safeUser,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// UPDATE AVATAR
export const updateAvatar = async (req, res) => {
  try {
    console.log("avatar image controller");
    if (!req.file) return res.status(400).json({ error: "avatar image is missing" })

    const filePath = path.resolve(req.file.path)
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"];
    const originalName = req.file.originalname
    const ext = path.extname(originalName).toLowerCase();
    if (!allowed.includes(ext)) {
      cleanupFile(filePath);
      return res.status(400).json({ error: "Only image files are supported." })
    }

    console.log("uploading image on cloudinary");

    const uploadedAvatar = await cloudinary.uploader.upload(filePath, {
      resource_type: "image"
    })

    if (!uploadedAvatar) {
      cleanupFile(filePath)
      return res.status(500).json({ error: "failed to upload on cloudinary" });
    }


    console.log("image uploaded cloudinary");


    console.log("searching user to upload");
    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: uploadedAvatar.secure_url
        }
      }, {
      new: true
    }
    ).select("-password")


    console.log("user found and avatar updated");
    cleanupFile(filePath);
    return res.status(200).json({ user: updatedUser, message: "avatar image uploaded", avatar: uploadedAvatar.secure_url, })



  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE COVER IMAGE
export const updateCover = async (req, res) => {
  try {

    console.log("cover image uploading");

    if (!req.file) return res.status(400).json({ error: "cover image is missing" })
    console.log("image mil gaya");
    const filePath = path.resolve(req.file.path);
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"];

    const originalName = req.file.originalname;
    const ext = path.extname(originalName).toLowerCase();
    if (!allowed.includes(ext)) {
      cleanupFile(filePath);
      return res.status(400).json({ error: "Only image files are supported." })
    }
    console.log("cover image uploading on cloudinary");

    const uploaded = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    })

    if (!uploaded) {
      return res.status(500).json({ error: "failed to upload on cloudinary" });
    }

    console.log("image upload ho gaya");

    console.log("searching user");
    const user = await User.findById(req.user?._id).select("coverImage");

    if (!user) {
      return res.status(404).json({ error: "no user found" });
    }

    console.log("user mil gaya");

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          coverImage: uploaded.secure_url
        }
      },
      { new: true }
    ).select("-password")

    console.log("cover image set ho gaya user me");
    cleanupFile(filePath);
    return res.status(200).json({ user: updatedUser, message: "cover image uploaded", coverImage: uploaded.secure_url, })



  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// ADD API HISTORY ENTRY
export const addHistory = async (req, res) => {
  try {
    const { operation, fileName, fileSize, details } = req.body;

    const user = await User.findById(req.user.id);

    user.history.push({
      operation,
      fileName,
      fileSize,
      details,
    });

    await user.save();

    res.status(200).json({ message: "History added", history: user.history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ history: user.history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user });

  } catch (err) {
    console.error("ME endpoint error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
