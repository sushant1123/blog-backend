import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "from categories routes" });
});

export default router;
