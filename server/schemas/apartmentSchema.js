const mongoose = require("mongoose");
const apartmentAttractionSchema = require("./apartmentAttractionsSchema");
let userSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  ordered: {
    type: Boolean,
    required: true,
  },
  dateLimit: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  raters: {
    type: Number,
    required: true,
  },
  attractions: {
    type: [apartmentAttractionSchema],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
