const express = require("express");
const router = express.Router();

const {
  getUser,
  getHistory
} = require("../controllers/github.controllers");

router.get("/", getHistory);

router.get("/:username", getUser);

module.exports = router;