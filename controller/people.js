const mongoose = require("mongoose");
const connectDB = require("../dbConn/connect");
const { People } = require("../models/models");
const createHttpError = require("http-errors");
const ObjectId = require("mongodb").ObjectId;

connectDB();

const getAllPeople = async (req, res, next) => {
  try {
    const people = await mongoose.connection
      .collection("people")
      .find({})
      .toArray();
    if (people.length == 0) {
      throw createHttpError(404, "People not found");
    }
    res.status(200).json(people);
  } catch (error) {
    next(error);
  }
};

const getPersonById = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Must use a valid id" });
  }
  const personId = req.params.id;
  try {
    const person = await mongoose.connection
      .collection("people")
      .findOne({ _id: new mongoose.Types.ObjectId(personId) });

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

const createNewPerson = async (req, res, next) => {
  try {
    const {
      name,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      gender,
    } = req.body;

    const newPerson = await People.create({
      name,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      gender,
    });

    res.status(201).json({
      message: "Person Created Successfully",
      personId: newPerson._id,
    });
  } catch (error) {
    next(error);
  }
};

const updatePerson = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Must use a valid id" });
  }
  const personId = req.params.id;
  try {
    const updatedPerson = await People.findByIdAndUpdate(personId, req.body, {
      new: true,
    });
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const deletePerson = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Must use a valid id" });
  }
  const personId = req.params.id;
  try {
    const deletedPerson = await People.findByIdAndDelete(personId);
    res
      .status(200)
      .json({ deletedPerson, message: "Has been sucessfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPeople,
  createNewPerson,
  updatePerson,
  deletePerson,
  getPersonById,
};
