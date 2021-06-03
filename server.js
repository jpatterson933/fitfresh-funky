const express = require("express");
const logger = require("morgan");
const mongoose= require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.get("/exercise", (req, res) => {

  db.Workout.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
// 1: Name: Send JSON response sorted by name in ascending order, e.g. GET "/name"

app.get("/name", (req, res) => {
  db.Workout.find()
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .sort({name: 1}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
  .catch(err => {
    res.json(err);
  });
});


// 2: Weight: Send JSON response sorted by weight in descending order, , e.g. GET "/weight"

app.get("/weight", (req, res) => {
  db.Workout.find().sort({name: -1}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
})

// Set the app to listen on port 3000

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});