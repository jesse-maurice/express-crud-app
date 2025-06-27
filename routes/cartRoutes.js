import Router from "express";
import { createCartItem } from "../controllers/cartApis/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const cartRouter = Router();

cartRouter
	//post
	.post("/cart/create/:id", authMiddleware, createCartItem);
//get
//     .get('/products', getAllProducts)
//  .get('/usersByquery',authMiddleware, getByqueryParams)
// //     //put
//    .put('/product/update/:id',authMiddleware, editProduct)

// //     //delete
//   .delete('/product/delete/:id',authMiddleware, deleteProduct)

export default cartRouter;
