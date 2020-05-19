const mongoose = require("mongoose");

let apartmentAttractionSchema = new mongoose.Schema({
  attractionID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

module.exports = apartmentAttractionSchema;
