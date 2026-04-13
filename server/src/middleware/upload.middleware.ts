import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiError";

// Memory storage for simple buffers (can switch to disk if needed)
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, `Unsupported file type: ${ext}. Only JPG, PNG, PDF allowed.`));
  }
};

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB Limit
  }
});
