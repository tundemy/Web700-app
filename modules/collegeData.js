const fs = require("fs");
const path = require("path");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", "courses.json"), 'utf8', (err, courseData) => {
            if (err) {
                reject("Unable to load courses");
                return;
            }

            fs.readFile(path.join(__dirname, "data", "students.json"), 'utf8', (err, studentData) => {
                if (err) {
                    reject("Unable to load students");
                    return;
                }

                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve();
            });
        });
    });
}

module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        if (!dataCollection || !dataCollection.students || dataCollection.students.length === 0) {
            reject("No students found");
            return;
        }

        resolve(dataCollection.students);
    });
}

module.exports.addStudent = function (studentData) {
    return new Promise((resolve, reject) => {
        if (!studentData) {
            reject("No student data provided");
            return;
        }

        // Add logic to add student to dataCollection.students array
        // Resolve or reject the promise based on the success or failure of the operation
    });
}
