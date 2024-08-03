const subCategoryModel = require("../models/subcategory.schema");

// subcategory create
const subCatCreate = async (req, res) => {
  try {
    let subCat = await subCategoryModel.create(req.body)
    res.redirect("/product");
  } catch (error) {
    return res.redirect("/subcategory");
  }
}

const subCatPage = (req, res) => {
  res.render("subcategory");
};

// add extra category
const updateExtraCat = async (req, res) => {
  let { id } = req.params;
  try {
    let subCat = await subCategoryModel.findByIdAndUpdate(id, { extraCatId: req.body.extraId });
    res.send(subCat);
  } catch (error) {
    res.send(error);
  }
}

// get extra category and join with subcategory
const getExtraCatData = async(req,res)=>{
  try {
    let subCatData = await subCategoryModel.find();
    res.send(subCatData);
  } catch (error) {
    res.send(error);
  }
}
module.exports = { subCatCreate, subCatPage, updateExtraCat, getExtraCatData }