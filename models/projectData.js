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
    createdByUser: {
      type: ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("PROJECT", projectSchema);

module.exports = Project;
