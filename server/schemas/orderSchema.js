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
  apartmentOwnerName: {
    type: String,
    required: true,
  },
  renterName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
});

module.exports = oderSchema;
