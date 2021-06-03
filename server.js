const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const path = require('path');
const mongoose= require("mongoose");
const Workout = require("./models")

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGOB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.send("Hello world");
  
});

// app.get("/exercise", (req, res) =>{
//   res.sendFile(path.join(__dirname, "../public/exercise.html"));
// });

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));

  db.workouts.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
// 1: Name: Send JSON response sorted by name in ascending order, e.g. GET "/name"

app.get("/name", (req, res) => {
  db.find().sort({name: 1}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
})


// 2: Weight: Send JSON response sorted by weight in descending order, , e.g. GET "/weight"

app.get("/weight", (req, res) => {
  db.workouts.find().sort({name: -1}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
})

// Set the app to listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});