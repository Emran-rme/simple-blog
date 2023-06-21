const express = require("express");

const dashboardController = require("@controllers/admin/dashboard");
const postController = require("@controllers/admin/posts");
const commentController = require("@controllers/admin/comments");
const userController = require("@controllers/admin/users");
const settinController = require("@controllers/admin/settings");

const router = express.Router();

router.get("/dashboard", dashboardController.index);

router.get("/posts", postController.index);
router.get("/posts/create-new-post", postController.create);
router.post("/posts/store", postController.store);
router.post("/posts/delete", postController.delete);
router.get("/posts/edit/:id", postController.editForm);
router.post("/posts/update/:id", postController.update);

router.get("/comments", commentController.index);
router.get("/comments/:id", commentController.changeStatus);

router.get("/users", userController.index);
router.get("/users/create-new-user", userController.create);
router.post("/users/store", userController.store);
router.post("/users/delete", userController.delete);
router.get("/users/edit/:id", userController.editForm);
router.post("/users/update/:id", userController.update);

router.get("/settings", settinController.index);
router.post("/settings", settinController.store);

module.exports = router;
