const express = require("express");
const path = require("path");
const collegeData = require("./collegeData");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Route to get all students with optional course filter
app.get("/students", (req, res) => {
    const { course } = req.query;

    if (course) {
        collegeData.getStudentsByCourse(course)
            .then(students => res.json(students))
            .catch(() => res.status(404).json({ message: "no results" }));
    } else {
        collegeData.getAllStudents()
            .then(students => res.json(students))
            .catch(() => res.status(404).json({ message: "no results" }));
    }
});

// Route to get all TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(tas => res.json(tas))
        .catch(() => res.status(404).json({ message: "no results" }));
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(courses => res.json(courses))
        .catch(() => res.status(404).json({ message: "no results" }));
});

// Route to get a single student by student number
app.get("/student/:num", (req, res) => {
    const num = parseInt(req.params.num);
    collegeData.getStudentByNum(num)
        .then(student => res.json(student))
        .catch(() => res.status(404).json({ message: "no results" }));
});

// Route to serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Handling unmatched routes
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize data and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port " + HTTP_PORT);
        });
    })
    .catch(err => {
        console.error("Error initializing data:", err);
    });
