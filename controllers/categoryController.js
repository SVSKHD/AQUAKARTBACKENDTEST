const bigPromise = require("../middlewares/bigPromise");
const AquaCategory = require("../models/categories");

exports.getAllCategories = BigPromise(async (req, res, next) => {
  const { id, title } = req.query;
  if (id) {
    const categoryById = await AquaCategory.findById(id);
    res.status(200).json(categoryById);
  } else if (title) {
    const categoryByTitle = await AquaCategory.findOne({ title: title });
    res.status(200).json(categoryByTitle);
  } else {
    const allCategories = await AquaCategory.find();
    res.status(200).json(allCategories);
  }
  res.status(200).json({
    success: true,
    categories,
  });
});

exports.getProductByCategory = BigPromise(async (req, res, next) => {});
