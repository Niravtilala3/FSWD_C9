const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const studentController = require("../controllers/studentController");

// GET all students
router.get("/", studentController.getAllStudents);
router.get("/add",studentController.getAddStudentForm);
// POST a new student
router.post("/", studentController.addStudent);
// GET a student by ID
router.get("/:id", studentController.getStudentById);
router.get("/:id/edit", studentController.getEditStudentForm);
// PUT (update) a student by ID
router.post("/:id/edit", studentController.updateStudent);
// DELETE a student by ID
router.post("/:id/delete",studentController.deleteStudent);

module.exports = router;