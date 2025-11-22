import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const historySchema = new mongoose.Schema({
    operation: { type: String, required: true },
    fileName: { type: [String] },
    fileSize: { type: [Number] },
    uploadDate: { type: Date, default: Date.now },
    details: { type: Object }
});

const userSchema = new mongoose.Schema({
    username: 
        {   type: String, 
            required: true, 
            trim: true 
        },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    history: [historySchema]
});

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password validation
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
