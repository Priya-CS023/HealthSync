const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userID: req.body.userId });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found for the provided user ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Doctor information fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting doctor info",
      success: false,
      error,
    });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userID: req.body.userId },
      req.body
    );
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found for the provided user ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting doctor info",
      success: false,
      error,
    });
  }
});

router.post("/get-doctor-info-by-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found for the provided user ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Doctor information fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting doctor info",
      success: false,
      error,
    });
  }
});

module.exports = router;
