const Student = require("../models/Student");
const studentController = {};

// GET all students
studentController.getAllStudents =  async (req, res) => {
    const students = await Student.find();
    res.render("students/index", { students });
    //res.json(students);
}

studentController.getAddStudentForm = (req, res) => {
    res.render("students/add");
}

studentController.addStudent = async (req, res) => {
    // const { name, email, age } = req.body;
    
    // const newStudent = new Student({ name, email, age });
    // await newStudent.save();
    const student = await Student.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age   
    });
    res.redirect("/students");
}

studentController.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.render("students/show", { student }); 
}

studentController.getEditStudentForm = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.render("students/edit", { student });
}

studentController.updateStudent = async (req, res) => {
    // const { name, email, age } = req.body;
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    );
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.redirect("/students");
}

studentController.deleteStudent =  async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        return res.status(404).send("Student not found");
    }
    res.redirect("/students");
}

module.exports = studentController;