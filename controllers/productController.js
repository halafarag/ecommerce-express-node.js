const Product = require("../models/product");
//get all product
async function getAllProduct(req, res, next) {
  try {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

//addProduct
async function addProduct(req, res, next) {
  try {
    const newProduct = req.body;
    const result = await Product.create(newProduct);
    res.status(201).json(result);
  } catch (err) {
    res.status(422).json(err);
  }
}
//get using skip and limit
async function getBySkip(req, res, next) {
  try {
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    console.log(skip, limit);
    if (!limit && !skip) {
      next();
    } else {
      let results = await Product.find()
        .limit(limit ? limit : 0)
        .skip(skip ? skip : 0);
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
}
//patch
async function updateProduct(req, res) {
  try {
    var id = req.params.id;
    const updatedUser = req.body;
    var newUser = await Product.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
//delete by id
async function deleteUser(req, res) {
  try {
    var id = req.params.id;
    var deletedUser = await Product.findByIdAndDelete(id);
    res.status(204).json(deletedUser);
  } catch (err) {
    res.status(422).json({ status: "failed", message: `${err.message}` });
  }
}
//get by id
async function getById(req, res) {
  try {
    var productId = req.params.id;
    var found = await Product.findById(productId);
    res.status(200).json(found);
  } catch (err) {
    res.status(422).json(err);
  }
}

module.exports = {
  getAllProduct,
  addProduct,
  getBySkip,
  updateProduct,
  deleteUser,
  getById,
};
