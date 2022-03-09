const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
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
    },
    url: {
      type: String,
    },
    projectDetails: {
      type: String,
      required: true,
    },
    createdByUser: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model("PROJECT", projectSchema);

module.exports = Project;
