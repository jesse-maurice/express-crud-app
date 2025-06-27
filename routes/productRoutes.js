import Router from "router";
import {
	createProduct,
	// getAllProducts,
	// getAProduct,
	// getByQuery,
	// editProduct,
	// deleteProduct,
} from "../controllers/productApis/productControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const productRouter = Router();

productRouter.post("/product/create", authMiddleware, createProduct);
// .get("/products", authMiddleware, getAllProducts)
// .get("/product/:id", getAProduct)
// .get("/productsByquery", authMiddleware, getByQuery)
// .put("/product/update/:id", authMiddleware, editProduct)
// .delete("/product/delete/:id", authMiddleware, deleteProduct);
export default productRouter;
