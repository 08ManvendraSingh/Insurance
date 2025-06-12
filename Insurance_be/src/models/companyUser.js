const mongoose = require("mongoose");

const companyUserModel = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
      required: true,
    },
    CompanyEmail: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    MiddleName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    DOB: {
      type: String,
      require: true,
    },
    MobileNo: {
      type: Number,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompanyUser", companyUserModel);
