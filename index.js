import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import v1Routes from "./routes/v1.routes.js";
import { connection } from "./connections/mongodb.connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT || 2000;

connection();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
	res.header("Cross-Origin-Resource-Policy", "cross-origin");
	next();
});

app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", v1Routes);

app.use("*", (req, res) => {
	res.status(404).json({ status: "error", message: "Invalid route!" });
});

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}.....!`);
});
