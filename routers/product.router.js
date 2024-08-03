const { Router } = require("express");
const { productPage, cartPage, addProduct, deleteData, getProductById, updateData } = require("../controller/product.controller");

const p_router = Router();

p_router.get("/product", productPage);
p_router.get("/cart", cartPage);
p_router.post("/addproduct", addProduct);
p_router.post("/delete/:id", deleteData);
p_router.get("/update/:id", getProductById);
p_router.post("/update/:id", updateData);

module.exports = { p_router };
