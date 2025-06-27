import Cart from "../../schemas/cartSchema.js";
import Product from "../../schemas/productSchema.js";

export const createCartItem = async (req, res) => {
	const user = req.user;
	const { incomingPId } = req.params;

	try {
		const product = await Product.findById(incomingPId);
		if (!product) {
			return res.status(400).json({ message: "Product not found" });
		}

		let cart = await Cart.findOne({ userId: user._id });

		if (!cart) {
			// Create new cart
			const newCart = new Cart({
				userId: user._id,
				products: [{ productId: incomingPId, quantity: 1 }],
			});
			await newCart.save();
			return res.status(201).json({ message: "Cart created" });
		} else {
			// Update existing cart
			const productIndex = cart.products.findIndex(
				(item) => item.productId.toString() === incomingPId,
			);

			if (productIndex > -1) {
				cart.products[productIndex].quantity += 1;
			} else {
				cart.products.push({ productId: incomingPId, quantity: 1 });
			}
			await cart.save();
			return res.status(200).json({ message: "Cart updated" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
