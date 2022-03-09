const Project = require("../models/projectData");

const makeNewProject = async (req, res) => {
  const { nameProj, requirements, repo, url, projDetails, imgURL } = req.body;

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

const imageUpload = async (req, res) => {
  if (req.file === null) {
    return res.json({
      error: true,
      message: "Image upload failed"
    })
  } else {
    return res.json({
      success: true,
      message: "Image uploaded successfully",
      fileName: req.file.filename
    })
  }
};

const listProject = async(req,res)=>{
  try{
    const projects = await Project.find({}).exec()
    return res.json({
      success:true,
      projects
    })
  }catch(err){
return res.json({
  error:true,
})
  }
}

module.exports = {
  makeNewProject,
  imageUpload,
  listProject
}