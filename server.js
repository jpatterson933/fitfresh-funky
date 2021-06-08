const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");



const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const URI = process.env.MONGODB_URI || "mongodb://localhost/workout"

mongoose.connect(URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

//Route that creates workouts
app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//route to find all workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.get("/api/workouts/:id", (req, res) => {
//   db.Workout.findById(req.params.id)
//     .then(dbWorkout => {
//       res.json(dbWorkout)
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })
//this allows us to update a workout by its id
app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } }, 
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
      console.log("are we catching an error? Yes if this shows up")
    });
});



app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .sort({
      _id: -1
    })
    .limit(5)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// 1: Name: Send JSON response sorted by name in ascending order, e.g. GET "/name"

// app.get("api/workouts/name", (req, res) => {
//   db.Workout.find({})
//     .sort({ name: 1 }), (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(data);
//       }
//     }
// });

app.delete("/api/workouts", ({ body }, res) => {
  db.Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

// 2: Weight: Send JSON response sorted by weight in descending order, , e.g. GET "/weight"


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