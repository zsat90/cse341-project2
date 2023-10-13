const mongoose = require("mongoose");
const connectDB = require("../dbConn/connect");
const { Planets } = require("../models/models");

connectDB();

const getAllPlanets = async (req, res) => {
  try {
    const planets = await mongoose.connection
      .collection("planets")
      .find({})
      .toArray();
    res.json(planets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" || res.error });
  }
};

const getPlanetById = async (req, res) => {
  const planetId = req.params.id;
  try {
    const planet = await mongoose.connection
      .collection("planets")
      .findOne({ _id: new mongoose.Types.ObjectId(planetId) });

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }
    res.json(planet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Planet not found" });
  }
};

const createNewPlanet = async (req, res) => {
  try {
    const {
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
    } = req.body;

    const newPlanet = await Planets.create({
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
    });

    res.status(201).json({
      message: "Planet Created Successfully",
      personId: newPlanet._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Planet not created" || res.error });
  }
};

const updatePlanet = async (req, res) => {
  const planetId = req.params.id;
  try {
    const udpatedPlanet = await Planets.findByIdAndUpdate(planetId, req.body, {
      new: true,
    });
    if (!udpatedPlanet) {
      return res.status(404).json({ error: "Planet not found" });
    }
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Planet not updated" || res.error });
  }
};

const deletePlanet = async (req, res) => {
  const planetId = req.params.id;
  try {
    const deletedPlanet = await Planets.findByIdAndDelete(planetId);
    res
      .status(200)
      .json({ deletedPlanet, message: "Has been successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Planet not updated" || res.error });
  }
};

module.exports = {
  getAllPlanets,
  getPlanetById,
  createNewPlanet,
  updatePlanet,
  deletePlanet,
};
