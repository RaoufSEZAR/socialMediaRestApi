const router = require("express").Router();

const userController = require("../controlers/userController");

router.put("/:id", userController.updatedUser);

router.delete("/:id", userController.deleteUser);

router.get("/:id", userController.getUser);

// follow and unfollow users

router.put("/:id/follow", userController.followUser);

router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
