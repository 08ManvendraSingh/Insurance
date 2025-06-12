const express = require("express");
const companyRouter = express.Router();
const CompanyUser = require("../models/companyUser");
const { validateCUser } = require("../utils/validate");

companyRouter.get("/companyUser", async (req, res) => {
  try {
    const cUser = await CompanyUser.find();

    res.status(200).json({
      data: cUser,
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

companyRouter.post("/addCompanyUser", async (req, res) => {
  try {
    let {
      CompanyName,
      CompanyEmail,
      FirstName,
      MiddleName,
      LastName,
      Gender,
      DOB,
      MobileNo,
      Address,
    } = req.body;

    validateCUser(req, res);

    const isUserPresent = await CompanyUser.findOne({ MobileNo: MobileNo });

    if (isUserPresent) {
      return res.status(400).json({
        message: "User allready present",
        success: false,
        error: true,
      });
    }

    const cUser = new CompanyUser({
      CompanyName,
      CompanyEmail,
      FirstName,
      MiddleName,
      LastName,
      Gender,
      DOB,
      MobileNo,
      Address,
    });

    await cUser.save();

    res.status(200).json({
      data: cUser,
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

companyRouter.put("/editCompanyUser/:uId", async (req, res) => {
  try {
    let {
      CompanyName,
      CompanyEmail,
      FirstName,
      MiddleName,
      LastName,
      Gender,
      DOB,
      MobileNo,
      Address,
    } = req.body;

    const { uId } = req.params;

    let isUserPresent = await CompanyUser.findById(uId);

    if (!isUserPresent) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const updatedCompanyUser = await CompanyUser.findByIdAndUpdate(
      uId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      data: updatedCompanyUser,
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

companyRouter.delete("/deleteCompanyUser/:uId", async (req, res) => {
  try {
    const { uId } = req.params;

    let isUserPresent = await CompanyUser.findById(uId);

    if (!isUserPresent) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    await CompanyUser.findByIdAndDelete({
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

module.exports = { companyRouter };
