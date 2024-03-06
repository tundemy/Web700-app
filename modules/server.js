const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const collegeData = require("./collegeData");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Add body-parser middleware

// Routes for API endpoints
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then((students) => {
            // Render student list page
            res.render("students", { students });
        })
        .catch((err) => {
            // Handle error
            console.error("Error getting students:", err);
            res.status(500).send("Internal Server Error");
        });
});

// Routes to serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addStudent.html"));
});

app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => {
            res.redirect("/students");
        })
        .catch((err) => {
            // Handle error
            console.error("Error adding student:", err);
            res.status(500).send("Internal Server Error");
        });
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
