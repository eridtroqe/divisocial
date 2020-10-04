const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const fileupload = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, fileupload, PostController.createPost);

router.put("/:id", checkAuth, fileupload, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
