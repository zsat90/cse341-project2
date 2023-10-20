const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  height: {
    type: String,
    trim: true,
    required: [true, "Height is required"],
  },
  mass: {
    type: String,
    trim: true,
    required: [true, "Mass is required"],
  },
  hair_color: {
    type: String,
    trim: true,
    required: [true, "Hair Color is required"],
  },
  skin_color: {
    type: String,
    trim: true,
    required: [true, "Skin Color is required"],
  },
  eye_color: {
    type: String,
    trim: true,
    required: [true, "Eye Color is required"],
  },
  birth_year: {
    type: String,
    trim: true,
    required: [true, "Birth year is required"],
  },
  gender: {
    type: String,
    trim: true,
    required: [true, "Gender is required"],
  },
});

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  rotation_period: {
    type: String,
    trim: true,
    required: [true, "Rotation Period is required"],
  },
  orbital_period: {
    type: String,
    trim: true,
    required: [true, "Orbital Period is required"],
  },
  diameter: {
    type: String,
    trim: true,
    required: [true, "Diameter is required"],
  },
  climate: {
    type: String,
    trim: true,
    required: [true, "Climate is required"],
  },
  gravity: {
    type: String,
    trim: true,
    required: [true, "Gravity is required"],
  },
  terrain: {
    type: String,
    trim: true,
    required: [true, "Terrain is required"],
  },
  surface_water: {
    type: String,
    trim: true,
    required: [true, "Surface Water is required"],
  },
});

const People = mongoose.model("People", peopleSchema, "people");
const Planets = mongoose.model("Planets", planetSchema, "planets");

module.exports = { People, Planets };
