import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},

		desc: {
			type: String,
			required: true,
		},

		postPic: {
			type: String,
		},

		username: {
			type: String,
			required: true,
		},

		categories: {
			type: Array,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Post", PostSchema);
