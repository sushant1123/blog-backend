import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import bcrypt from "bcrypt";

//update
//TODO : if profile picture updated, then update the url
export const updateUser = async (req, res) => {
	try {
		if (req.body?.userId === req.params?.id) {
			if (req.body?.password) {
				req.body.password = await bcrypt.hash(req.body?.password, 12);
			}

			const updatedUser = await User.findByIdAndUpdate(
				req.params?.id,
				{ $set: req.body },
				{ new: true }
			);

			res.status(200).json(updatedUser);
		} else {
			res.status(401).json({
				status: "error",
				message: "You are not allowed to update other's account",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//delete
export const deleteUser = async (req, res) => {
	try {
		if (req.body?.userId === req.params?.id) {
			const user = await User.findById(req.params?.id);
			try {
				await Post.deleteMany({ username: user?.username });

				await User.findByIdAndDelete(req.params?.id);

				res.status(200).json({
					status: "success",
					message: "User has been deleted successfully..",
				});
			} catch (error) {
				res.status(500).json(error);
			}
		} else {
			res.status(401).json({
				status: "error",
				message: "You are not allowed to delete other's account",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//get user
export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params?.id);

		if (user?._id) {
			const { password, __v, ...rest } = user._doc;

			res.status(200).json(rest);
		} else {
			res.status(400).json({ message: "User not found!" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
