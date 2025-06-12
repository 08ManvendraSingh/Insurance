const express = require("express");
const privateRouter = express.Router();
const PrivateUser = require("../models/privateUser");
const { validatePUser } = require("../utils/validate");
const privateUser = require("../models/privateUser");

privateRouter.get("/privateUser", async (req, res) => {
  try {
    const pUser = await PrivateUser.find();

    res.status(200).json({
      data: pUser,
      message: "get all user successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

privateRouter.post("/addPrivateUser", async (req, res) => {
  try {
    let { FirstName, MiddleName, LastName, Gender, DOB, MobileNo, Address } =
      req.body;

    validatePUser(req, res);

    const isUserPresent = await PrivateUser.findOne({ MobileNo: MobileNo });

    if (isUserPresent) {
      return res.status(400).json({
        message: "User allready present",
        success: false,
        error: true,
      });
    }

    const pUser = new PrivateUser({
      FirstName,
      MiddleName,
      LastName,
      Gender,
      DOB,
      MobileNo,
      Address,
    });

    await pUser.save();

    res.status(200).json({
      data: pUser,
      message: "user added successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

privateRouter.put("/editPrivateUser/:uId", async (req, res) => {
  try {
    let { FirstName, MiddleName, LastName, Gender, DOB, MobileNo, Address } =
      req.body;

    const { uId } = req.params;

    let isUserPresent = await PrivateUser.findById(uId);

    if (!isUserPresent) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const updatedPrivateUser = await PrivateUser.findByIdAndUpdate(
      uId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      data: updatedPrivateUser,
      message: "user edited successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

privateRouter.delete("/deletePrivateUser/:uId", async (req, res) => {
  try {
    const { uId } = req.params;

    let isUserPresent = await PrivateUser.findById(uId);

    if (!isUserPresent) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    await PrivateUser.findByIdAndDelete({
      _id: uId,
    });

    res.status(200).json({
      message: "User deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

module.exports = { privateRouter };
