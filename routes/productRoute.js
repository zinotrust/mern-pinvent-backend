const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.post("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);

module.exports = router;
