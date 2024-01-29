const express = require("express");

const propertyRouter = express.Router();
const {
  handlePropertySearch,
  handleAddProperty,
  handleListAllProperties,
  handleGetListedPropertyByUser,
  handleDeleteProperty,
  handleUpdateProperty,
} = require("../controllers/property");
const { auth } = require("../middlewares/auth");

propertyRouter.get("/list-properties", handleListAllProperties);

propertyRouter.post("/search-property", handlePropertySearch);

propertyRouter.post("/add-property", auth, handleAddProperty);

propertyRouter.get("/:id", auth, handleGetListedPropertyByUser);

propertyRouter.delete("/:id", auth, handleDeleteProperty);

propertyRouter.patch("/:id", auth, handleUpdateProperty);


module.exports = propertyRouter;
