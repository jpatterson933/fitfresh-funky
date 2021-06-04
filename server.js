const express = require("express");
const logger = require("morgan");
const mongoose= require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");



const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
  {   
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });


//this will allow us to look at any of our workouts (seeded data only)
app.get("/api/workouts", (req, res) => {
  db.Workout.find()
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// 1: Name: Send JSON response sorted by name in ascending order, e.g. GET "/name"

app.get("api/workouts/name", (req, res) => {
  db.Workout.find()
  .sort({name: 1}), (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  }
});


// 2: Weight: Send JSON response sorted by weight in descending order, , e.g. GET "/weight"

app.get("api/workouts/weight", (req, res) => {
  db.Workout.find().sort({weight: -1})
})


//our views files
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// Set the app to listen on port 3000

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});