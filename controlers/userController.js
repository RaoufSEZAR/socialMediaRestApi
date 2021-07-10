const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.updatedUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				res.status(500).json(error);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("account has been updated successfully");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can Only update your account!");
	}
};

exports.deleteUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.deleteOne({ _id: req.params.id });
			res.status(200).json("account has been deleted successfully");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can Only delete your account!");
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.followUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("user has been followed");
			} else {
				res.status(403).json("you allready follow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can't follow yourself!");
	}
};

exports.unfollowUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });
				res.status(200).json("user has been unfollowed");
			} else {
				res.status(403).json("you don't follow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can't unfollow yourself!");
	}
};
