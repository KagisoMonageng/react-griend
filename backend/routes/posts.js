const express = require("express");

const posts = require("../controllers/posts");

const router = express.Router();

router.get("/getPosts", posts.getAllPosts);
router.post("/addPost/:gametag", posts.addPost);
router.patch("/delete/:post_id", posts.deletePost);
router.patch("/edit/:post_id", posts.editPost);

module.exports = router;