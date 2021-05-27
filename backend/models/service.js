const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    address: {
      type: String,
      trime: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    petsowned: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    // category: {
    //   type: ObjectId,
    //   ref: "Category",
    //   required: true
    // },
    // stock: {
    //   type: Number
    // },
    // sold: {
    //   type: Number,
    //   default: 0
    // },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);