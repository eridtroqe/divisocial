const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const fileupload = require("../middleware/file-upload");

const router = express.Router();

router.post("", checkAuth, fileupload, PostController.createPost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

module.exports = router;
