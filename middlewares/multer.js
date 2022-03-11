import multer from "multer";
import path from "path";
import shortid from "shortid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(path.dirname(__dirname), "uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, shortid.generate() + "-" + file.originalname);
	},
});

export const upload = multer({ storage: storage });
