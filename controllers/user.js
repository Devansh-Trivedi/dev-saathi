const User = require("../models/user");
const path = require("path")

const resumeUpload = async (req, res) => {
  if (req.file === null) {
    return res.json({
      error: true,
      message: "Resume upload failed"
    })
  } else {
    User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { resume: req.file.filename } },
      (err, data) => {
        if (err) {
          return res.status(400).json({
            error: true,
            message: "Something went wrong when updating user resume",
          });
        } else {
          return res.json({
            success: true,
            message: "Resume uploaded successfully",
            fileName: req.file.filename
          })
        }
      }
    );

  }
};

const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const path_resume = user.resume
    if (user.resume !== '' && user.resume !== undefined) {
      res.set({
        'Content-Type': 'application/pdf'
      });
      res.sendFile(path.join(__dirname, '..', 'user-resume', path_resume));
    } else {
      res.status(400).send('User has not uploaded resume.');
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Error while downloading file. Try again later.');
  }
}

const getUserProfile = async (req, res) => {
  if (req.query.userId === null || req.query.userId === undefined) {
    return res.json({
      error: true,
      message: "User Id required"
    })
  } else {
    const user = await User.findById(req.query.userId)
    user.password = undefined
    return res.json({
      success: true,
      userData: user,
      message: "Profile found."
    })
  }
}

module.exports = {
  resumeUpload,
  getResume,
  getUserProfile
};