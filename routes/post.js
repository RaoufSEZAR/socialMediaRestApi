const router = require("express").Router();

const postController = require("../controlers/postController");

router.post("/", postController.createPost);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

// like and dislike posts
router.put("/:id/like", postController.likePost);

router.get("/:id", postController.getSinglePost);

router.get("/timeline/all", postController.getFollowingsUserPosts);
module.exports = router;
