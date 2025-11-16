import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  updateAvatar,
  updateCover,
  addHistory,
  getProfile,
  getHistory,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

router.put("/avatar", protect, upload.single("avatar"), updateAvatar);
router.put("/cover", protect, upload.single("cover"), updateCover);

router.post("/history", protect, addHistory);
router.get("/history", protect, getHistory);

export default router;
