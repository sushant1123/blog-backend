import express from "express";

import {
	createPost,
	updatePost,
	deletePost,
	getPostById,
	getAllPosts,
} from "../controllers/posts.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("postPic"), createPost);
router.put("/:id", upload.single("postPic"), updatePost);
router.delete("/:id", deletePost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

export default router;
