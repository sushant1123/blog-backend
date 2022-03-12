import express from "express";

import userRoutes from "./user.routes.js";
import postsRoutes from "./posts.routes.js";
import categoryRoutes from "./categories.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/v1/users", userRoutes);
router.use("/v1/posts", postsRoutes);
router.use("/v1/categories", categoryRoutes);
router.use("/v1/auth", authRoutes);

export default router;
