import mongoose from "mongoose";

export const connection = async () => {
	const connection_url = process.env.MONGODB_ATLAS_CONNECTION_URL;
	try {
		await mongoose.connect(connection_url);
		console.log("connected to mongodb...!");
	} catch (error) {
		console.log(error);
	}
};
