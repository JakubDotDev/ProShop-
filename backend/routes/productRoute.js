import express from "express";
import Product from "../models/ProductModel.js";
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
} from "../controlles/productControler.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//fetch all products
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createReview);
router.get("/top", getTopProducts);

//fetch single product
router.route("/:id").get(getProductById);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
