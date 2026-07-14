const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("students/index", { students });
    //res.json(students);
});

router.get("/add", (req, res) => {
    res.render("students/add");
});

// POST a new student
router.post("/", async (req, res) => {
    // const { name, email, age } = req.body;
    
    // const newStudent = new Student({ name, email, age });
    // await newStudent.save();
    const student = await Student.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age   
    });
    res.redirect("/students");
});

// GET a student by ID
router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.render("students/show", { student }); 
});

module.exports = router;