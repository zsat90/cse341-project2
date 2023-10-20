const mongoose = require("mongoose");
const connectDB = require("../dbConn/connect");
const { Planets } = require("../models/models");
const createHttpError = require("http-errors");
const ObjectId = require("mongodb").ObjectId;

connectDB();

const getAllPlanets = async (req, res, next) => {
  try {
    const planets = await mongoose.connection
      .collection("planets")
      .find({})
      .toArray();
    if (planets.length == 0) {
      throw createHttpError(404, "Planets not Found");
    }
    res.status(200).json(planets);
  } catch (error) {
    next(error);
  }
};

const getPlanetById = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Must use a valid id" });
  }
  const planetId = req.params.id;
  try {
    const planet = await mongoose.connection
      .collection("planets")
      .findOne({ _id: new mongoose.Types.ObjectId(planetId) });

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }
    res.status(200).json(planet);
  } catch (error) {
    next(error);
  }
};

const createNewPlanet = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};

const updatePlanet = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Must use a valid id" });
  }
  const planetId = req.params.id;
  try {
    const udpatedPlanet = await Planets.findByIdAndUpdate(planetId, req.body, {
      new: true,
    });
    if (!udpatedPlanet) {
      return res.status(404).json({ error: "Planet not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const deletePlanet = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Must use a valid id" });
  }
  const planetId = req.params.id;
  try {
    const deletedPlanet = await Planets.findByIdAndDelete(planetId);
    res
      .status(200)
      .json({ deletedPlanet, message: "Has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlanets,
  getPlanetById,
  createNewPlanet,
  updatePlanet,
  deletePlanet,
};
