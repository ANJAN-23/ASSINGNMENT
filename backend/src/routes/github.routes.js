const express = require("express");
const router = express.Router();

const {
  getUser,
  getHistory
} = require("../controllers/github.controllers.js");

router.get("/:username", getUser);

router.get("/", getHistory);

module.exports = router;