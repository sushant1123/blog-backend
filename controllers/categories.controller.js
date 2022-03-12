import Category from "../models/category.model.js";

//Create new category
//TODO: if req contains multimedia
export const createCategory = async (req, res) => {
	try {
		const { name } = req.body;

		const newCategory = new Category({ name });

		const category = await newCategory.save();

		res.status(201).json(category);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

//get all posts
export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (err) {
		console.log(error);
		res.status(500).json(error);
	}
};
