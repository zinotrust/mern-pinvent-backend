const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
