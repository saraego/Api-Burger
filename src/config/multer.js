import path from "path";
import multer from "multer";
import { v4 } from "uuid";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) => {
      return callback(null, v4() + path.extname(file.originalname));
    },
  }),
};
