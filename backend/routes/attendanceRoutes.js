const express = require("express");
const mongoose = require("mongoose");

const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

const router = express.Router();

// GET: All attendance records
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.date) {
      filter.date = req.query.date;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const records = await Attendance.find(filter)
      .populate("student", "name rollNo classroom")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST: Mark attendance
router.post("/", async (req, res) => {
  try {
    const { studentId, date, status, checkIn } = req.body;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Valid student ID is required",
      });
    }

    if (!date || !status) {
      return res.status(400).json({
        success: false,
        message: "Date and status are required",
      });
    }

    if (!["Present", "Absent", "Late"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance status",
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const record = await Attendance.findOneAndUpdate(
      {
        student: studentId,
        date,
      },
      {
        $set: {
          status,
          checkIn: checkIn || "--",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Attendance saved successfully",
      data: record,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Attendance record already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET: Dashboard attendance statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const date =
      req.query.date || new Date().toISOString().slice(0, 10);

    const totalStudents = await Student.countDocuments();

    const records = await Attendance.find({ date });

    const present = records.filter(
      (record) => record.status === "Present"
    ).length;

    const late = records.filter(
      (record) => record.status === "Late"
    ).length;

    const absent = records.filter(
      (record) => record.status === "Absent"
    ).length;

    const notMarked = Math.max(
      0,
      totalStudents - records.length
    );

    const attendancePercentage =
      totalStudents > 0
        ? Number(
            (((present + late) / totalStudents) * 100).toFixed(2)
          )
        : 0;

    res.json({
      success: true,
      data: {
        date,
        totalStudents,
        present,
        late,
        absent,
        notMarked,
        attendancePercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;