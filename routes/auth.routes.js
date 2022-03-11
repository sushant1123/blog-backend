import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/login", login);

router.post("/register", upload.single("profilePic"), register);

export default router;
