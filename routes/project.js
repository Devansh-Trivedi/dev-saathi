const express = require("express");
const router = express.Router();
const {
  makeNewProject,
  imageUpload
} = require("../controllers/project")
const authCheck = require("../middlewares/authCheck");

const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "user-project-image/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

router.post("/projectrequest", authCheck, makeNewProject);

router.post("/upload-image", authCheck, uploadStorage.single("projectImage"), imageUpload);

module.exports = router;
