const express = require("express");

const authorController = require("@controllers/author/author");

const router = express.Router();

router.get("/", authorController.index);

module.exports = router;
