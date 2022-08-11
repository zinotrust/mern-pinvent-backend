const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  if (
    !req.body.name ||
    !req.body.category ||
    !req.body.quantity ||
    !req.body.price ||
    !req.body.description
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const product = await Product.create({
    name: req.body.name,
    sku: req.body.sku,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });
  res.status(200).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json(`No product with id : ${id}`);
  }
  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json(`No product with id : ${id}`);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  await product.remove();
  res.status(200).json(product);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
