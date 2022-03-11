import express from "express";

// import {} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "from user routes" });
});

export default router;
