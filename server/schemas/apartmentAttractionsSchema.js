const mongoose = require("mongoose");

let apartmentAttractionSchema = new mongoose.Schema({
  attractionID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    validate: {
      validator: (discount) => discount < 101 && discount > 0,
      message: "The discount must be up to 100 presents and positive number",
    },
  },
});

module.exports = apartmentAttractionSchema;
