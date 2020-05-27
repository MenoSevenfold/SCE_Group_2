const mongoose = require("mongoose");

let oderSchema = new mongoose.Schema({
  apartmentOwner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  apartmentID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  renterName: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  renterID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
});

module.exports = oderSchema;
