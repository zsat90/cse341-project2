const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  mass: {
    type: String,
    required: true,
  },
  hair_color: {
    type: String,
    required: true,
  },
  skin_color: {
    type: String,
    required: true,
  },
  eye_color: {
    type: String,
    required: true,
  },
  birth_year: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rotation_period: {
    type: String,
    required: true,
  },
  orbital_period: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
  gravity: {
    type: String,
    required: true,
  },
  terrain: {
    type: String,
    required: true,
  },
  surface_water: {
    type: String,
    required: true,
  },
});

const People = mongoose.model("People", peopleSchema, "people");
const Planets = mongoose.model("Planets", planetSchema, "planets");

(module.exports = People), Planets;
