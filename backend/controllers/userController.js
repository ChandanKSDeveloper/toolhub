import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
// export const registerUser = async (req, res) => {

//   console.log("register user is called ");

//   try {
//     const { username, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "Email already exists" });

//     const user = await User.create({ username, email, password });

//     res.status(200).json({
//       message: "User registered",
//       token: generateToken(user._id),
//       user,
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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

    const isMatched = await user.matchPassword(password);
    console.log("MATCH RESULT:", isMatched);

    if (!isMatched)
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
    const user = await User.findById(req.user.id);
    user.avatar = req.file.path; // saved by multer
    await user.save();

    res.status(200).json({ message: "Avatar updated", avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE COVER IMAGE
export const updateCover = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.coverImage = req.file.path;
    await user.save();

    res.status(200).json({ message: "Cover image updated", coverImage: user.coverImage });
  } catch (error) {
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

// FETCH PROFILE
// export const getProfile = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   res.status(200).json(user);
// };


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
