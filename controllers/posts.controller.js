import User from "../models/user.model.js";
import Post from "../models/post.model.js";

//Create new post
//TODO: if req contains multimedia then update    : Done
export const createPost = async (req, res) => {
	try {
		const { title, desc, username, categories } = req.body;

		const obj = { title, desc, username, categories };

		obj.postPic = req.file?.filename;

		//check when integrating with frontend
		if (categories) {
			obj.categories = JSON.parse(categories);
		}

		const postObj = new Post(obj);
		const post = await postObj.save();

		res.status(201).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//update post
//TODO: if req contains multimedia then update    : Done
export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params?.id);
		if (post?._id) {
			try {
				if (post?.username === req.body?.username) {
					if (req.file?.filename) {
						req.body.postPic = req.file.filename;
					}

					//check when integrating with frontend
					if (req.body?.categories) {
						req.body.categories = JSON.parse(req.body.categories);
					}

					const updatedPost = await Post.findByIdAndUpdate(
						req.params?.id,
						{
							$set: req.body,
						},
						{ new: true }
					);
					res.status(200).json(updatedPost);
				} else {
					res.status(401).json({ status: "error", message: "You can update only your post!" });
				}
			} catch (error) {
				console.log(error);
				return res.status(500).json(error);
			}
		} else {
			res.status(400).json({ status: "error", message: "Post not found!" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//delete post
export const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params?.id);
		if (post?._id) {
			if (post?.username === req.body?.username) {
				try {
					await Post.findByIdAndDelete(req.params?.id);

					res.status(200).json({
						status: "success",
						message: "Post has been deleted successfully..",
					});
				} catch (error) {
					res.status(500).json(error);
				}
			} else {
				res.status(401).json({
					status: "error",
					message: "You are not allowed to delete other's post",
				});
			}
		} else {
			res.status(400).json({
				status: "error",
				message: "Post not found!",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//get all posts
export const getAllPosts = async (req, res) => {
	try {
		const username = req.query?.user;
		const categoryName = req.query?.category;

		let posts;
		if (username) {
			posts = await Post.find({ username });
		} else if (categoryName) {
			posts = await Post.find({ categories: { $in: [categoryName] } });
		} else {
			posts = await Post.find();
		}

		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//get post by id
export const getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params?.id);
		if (post?._id) {
			res.status(200).json(post);
		} else {
			res.status(400).json({
				status: "error",
				message: "Post not found!",
			});
		}
	} catch (err) {
		console.log(error);
		res.status(500).json(error);
	}
};
