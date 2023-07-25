const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandSchema = new Schema({
  favouriteBrand: String
});

module.exports = mongoose.model("Brand", BrandSchema);
