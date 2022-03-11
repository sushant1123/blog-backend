import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (username) {
			const user = await User.findOne({ username: username });

			if (user?._id) {
				const isPasswordCorrect = await bcrypt.compare(password, user.password);
				if (isPasswordCorrect) {
					const { password, ...rest } = user._doc;
					return res.status(200).json(rest);
				}
				return res.status(400).json({ status: "error", message: "Invalid credentials" });
			}
		}
		return res.status(400).json({ status: "error", message: "User doesn't exists!" });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const obj = { username, email };

		obj.password = password?.length && (await bcrypt.hash(password, 12));

		obj.profilePic = req.file?.filename;

		const newUser = new User(obj);

		const user = await newUser.save();

		res.status(201).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
