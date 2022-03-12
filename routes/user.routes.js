import express from "express";

import { updateUser, deleteUser, getUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.put("/:id", upload.single("profilePic"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router;
