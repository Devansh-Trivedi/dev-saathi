const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  nameProj: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  projectDetails: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("PROJECT", projectSchema);

module.exports = Project;
