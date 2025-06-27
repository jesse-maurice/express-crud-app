import Product from "../../schemas/productSchema.js";

// Create product
export const createProduct = async (req, res) => {
	const { name, price, color, size } = req.body;
	const reqId = req.user.id;

	if (!name || !price || !color || !size) {
		return res.status(400).json({ error: "All fields are required" });
	}

	try {
		const newProduct = new Product({ ...req.body, userId: reqId });
		await newProduct.save();
		res.status(201).json({ message: "Product created successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all products
export const getAllProducts = async (req, res) => {
	const user = req.user;

	try {
		const Products = await Product.find({ userId: user._id });
		res.status(200).json(Products);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single product by ID
export const getAProduct = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get products by query params
export const getByQuery = async (req, res) => {
	const { name, color } = req.query;
	const filter = {};

	if (name) filter.name = name;
	if (color) filter.color = color;

	try {
		const product = await Product.find(filter);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Edit product
export const editProduct = async (req, res) => {
	const { id } = req.params;
	const { name, price, color, size } = req.body;

	try {
		await Product.findByIdAndUpdate(id, {
			name,
			price,
			color,
			size,
		});
		res.status(200).json({ message: "Product updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete product
export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// export default {
// 	createProduct,
// 	getAllProducts,
// 	getAProduct,
// 	getByQuery,
// 	editProduct,
// 	deleteProduct,
// };
