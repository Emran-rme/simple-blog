const express = require("express");

const homeController = require("@controllers/frontend/home");
const commentController = require("@controllers/frontend/comment");

const router = express.Router();

router.get("/", homeController.index);
router.get("/posts/:slug", homeController.showPost);
router.post("/posts/:slug", commentController.store);
router.get("/search", homeController.search);

module.exports = router;
