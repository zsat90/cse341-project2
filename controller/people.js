const mongoose = require("mongoose");
const connectDB = require("../dbConn/connect");
const { People } = require("../models/models");

connectDB();

const getAllPeople = async (req, res) => {
  try {
    const people = await mongoose.connection
      .collection("people")
      .find({})
      .toArray();
    res.json(people);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" || res.error });
  }
};

const getPersonById = async (req, res) => {
  const personId = req.params.id;
  try {
    const person = await mongoose.connection
      .collection("people")
      .findOne({ _id: new mongoose.Types.ObjectId(personId) });

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" || res.error });
  }
};

const createNewPerson = async (req, res) => {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Person not created" });
  }
};

const updatePerson = async (req, res) => {
  const personId = req.params.id;
  try {
    const updatedPerson = await People.findByIdAndUpdate(personId, req.body, {
      new: true,
    });
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Person not updated" || res.error });
  }
};

const deletePerson = async (req, res) => {
  const personId = req.params.id;
  try {
    const deletedPerson = await People.findByIdAndDelete(personId);
    res
      .status(200)
      .json({ deletedPerson, message: "Has been sucessfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Person not updated" || res.error });
  }
};

module.exports = {
  getAllPeople,
  createNewPerson,
  updatePerson,
  deletePerson,
  getPersonById,
};
