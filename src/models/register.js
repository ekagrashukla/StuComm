const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
    },
    password:{
        type: Number,
        min:1,
        required: true,
    },
    address:{
        type: String,
        required: true
    }
})

// creating new collection

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;