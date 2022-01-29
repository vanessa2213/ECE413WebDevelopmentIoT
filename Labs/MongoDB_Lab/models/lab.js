/*
const db = require("../db");

const studentSchema = new db.Schema({
    name:      String,
    major:     String,
    gpa:       { type: Number, min: 0, max: 4 }
 });


const Student = db.model("Student", studentSchema);

module.exports = Student;
*/
const db = require("../db");
const recordsSchema = new db.Schema({
    zip: Number,
    airQuality: Number
});
const Recording = db.model("Recording", recordsSchema);

module.exports = Recording;