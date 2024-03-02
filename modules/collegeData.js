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
    })
}

module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].TA == true) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    });
};

module.exports.getCourses = function(){
   return new Promise((resolve,reject)=>{
    if (dataCollection.courses.length == 0) {
        reject("query returned 0 results"); return;
    }

    resolve(dataCollection.courses);
   });
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].studentNum == num) {
                foundStudent = dataCollection.students[i];
                break;
            }
        }

        if (!foundStudent) {
            reject("no results returned"); return;
        }

        resolve(foundStudent);
    });
}

module.exports.addStudent = function (studentData) {
    return new Promise((resolve, reject) => {
        if (!studentData) {
            reject("No student data provided");
            return;
        }

        // Add logic to add student to dataCollection.students array
        module.exports.addStudent = function (studentData) {
            return new Promise((resolve, reject) => {
                if (!studentData) {
                    reject("No student data provided");
                    return;
                }
        
                // Generate a unique student number
                const studentNum = dataCollection.students.length + 1;
        
                // Create a new student object
                const newStudent = {
                    studentNum: studentNum,
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    email: studentData.email,
                    GPA: studentData.gpa,
                    course: studentData.course,
                    TA: studentData.ta === "on" ? true : false // Convert "on" to boolean
                };
        
                // Add the new student to the dataCollection.students array
                dataCollection.students.push(newStudent);
        
                // Resolve the promise
                resolve();
            });
        }
        
        // Resolve or reject the promise based on the success or failure of the operation
    });
}
