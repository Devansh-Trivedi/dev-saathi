const express = require("express");
const router = express.Router();
const {
  resumeUpload,
  getResume
} = require("../controllers/user");
const authCheck = require("../middlewares/authCheck");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "user-resume/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

router.post("/update-resume", authCheck, uploadStorage.single("resume"), resumeUpload);
router.get("/download-resume/:id", getResume);

module.exports = router;