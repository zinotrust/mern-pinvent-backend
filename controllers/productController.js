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

  // Handle Files upload
  let filesArray = [];
  req.files.forEach((element) => {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });

  // const product = new Product({
  //   user: req.user.id,
  //   name: req.body.name,
  //   sku: req.body.sku,
  //   category: req.body.category,
  //   quantity: req.body.quantity,
  //   price: req.body.price,
  //   description: req.body.description,
  //   files: filesArray,
  // })
  // await product.save()

  const product = await Product.create({
    // Add the user that created the product
    user: req.user.id,
    name: req.body.name,
    sku: req.body.sku,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    images: filesArray,
  });
  res.status(200).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({ user: req.user.id });
  res.status(200).json(product);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json(`No product with id : ${id}`);
  }
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json(`No product with id : ${id}`);
  }

  // Match product with its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
  // Match product with its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json(product);
});

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
