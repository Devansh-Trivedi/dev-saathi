const Project = require("../models/projectData");

const makeNewProject = async (req, res) => {
  const { nameProj, requirements, repo, url, projDetails, imgURL } = req.body;
  console.log(nameProj, requirements, repo, url, projDetails);

  const project = Project({
    nameProj,
    requirements,
    repo,
    url,
    projectDetails: projDetails,
    createdByUser: req.user._id,
    imgURL
  });

  const success = await project.save();

  if (success) {
    return res.json({
      success: true,
      message: "Project created successfully"
    });
  } else {
    return res.json({
      error: true,
      message: "Something went wrong when creating a project"
    });
  }
}

module.exports = {
  makeNewProject
}