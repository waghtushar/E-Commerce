const { Router } = require("express");
const { extraCatCreate, extraCatPage } = require("../controller/extracategory.controller");

const extracat_router = Router();

extracat_router.post("/extracatcreate", extraCatCreate);
extracat_router.get("/extracategory", extraCatPage); // Ensure this route is defined

module.exports = extracat_router;
