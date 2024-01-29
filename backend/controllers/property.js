const Property = require("../models/property");

//search property ---public route
const handlePropertySearch = async (req, res) => {
  const { location } = req.body;
  try {
    const list = await Property.find({ location });
    res.json(list);
  } catch (e) {
    console.log(e);
    res.status(500).json({ mssg: "internal server error" });
  }
};

//list all the properties -- a public route
const handleListAllProperties = async (req, res) => {
  try {
    const allProperties = await Property.find({});
    res.json(allProperties);
  } catch (e) {
    console.log(e);
  }
};

//handle add property by user
const handleAddProperty = async (req, res) => {
  try {
    const user = req.user._id;

    const {
      propertyName,
      propertyType,
      rentPerMonth,
      location,
      numberOfBedrooms,
      bathrooms,
      area,
    } = req.body;
    const newProperty = new Property({
      propertyName,
      propertyType,
      rentPerMonth,
      location,
      numberOfBedrooms,
      bathrooms,
      area,
      user,
    });
    const result = await newProperty.save();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send("internal server error while adding new property");
  }
};

//get listed property by the user
const handleGetListedPropertyByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const properties = await Property.find({ user: userId });

    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete property
const handleDeleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.json({
      success: true,
      message: "Property deleted successfully",
      deletedProperty,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send("Internal server error while deleting the listed property");
  }
};

//update property
const handleUpdateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const {
      propertyName,
      propertyType,
      rentPerMonth,
      location,
      numberOfBedrooms,
      bathrooms,
      area,
    } = req.body;

    const updatedProperty = {
      propertyName,
      propertyType,
      rentPerMonth,
      location,
      numberOfBedrooms,
      bathrooms,
      area,
    };

    const modifiedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updatedProperty,
      { new: true }
    );

    if (!modifiedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.json({
      success: true,
      message: "Property updated successfully",
      modifiedProperty,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error while updating the property");
  }
};

module.exports = {
  handlePropertySearch,
  handleAddProperty,
  handleListAllProperties,
  handleGetListedPropertyByUser,
  handleDeleteProperty,
  handleUpdateProperty,
};
