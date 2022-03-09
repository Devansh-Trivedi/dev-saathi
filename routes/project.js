const express = require("express");
const router = express.Router();
const {
  makeNewProject
} = require("../controllers/project")
const authCheck = require("../middlewares/authCheck");

router.post("/projectrequest", authCheck, makeNewProject);

module.exports = router;
