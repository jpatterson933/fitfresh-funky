const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
 
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);

module.exports = Exercises;
