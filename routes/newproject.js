const express = require("express");
const router = express.Router();

const Project = require("../models/projectData");

router.post("/projectrequest", async (req, res) => {
  const { nameProj, requirements, repo, url, projDetails, imgURL } = req.body;
  console.log(nameProj, requirements, repo, url, projDetails);

  const project = Project({
    nameProj,
    requirements,
    repo,
    url,
    projectDetails: projDetails,
    imgURL
  });

  const success = await project.save();

  if (success) {
    return res.json({
      success: true,
    });
  } else {
    return res.json({
      error: true,
    });
  }
});

module.exports = router;
