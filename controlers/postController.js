const Post = require("../models/post");

exports.createPost = async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(201).json({ message: "Success", savedPost });
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body });
			res.status(201).json("this post has been updated");
		} else {
			res.status(403).json("You can update only your posts");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.deleteOne();
			res.status(201).json("this post has been deleted");
		} else {
			res.status(403).json("You can delete only your posts");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.likePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.body.userId)) {
			await Post.updateOne({ $push: { likes: req.body.userId } });
			res.status(201).json("this post has been liked");
		} else {
			await Post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(201).json("this post has been disliked");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getSinglePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getFollowingsUserPosts = async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await User.find({ userId: currentUser._id });
		const friendsPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		res.status(200).json(userPosts.concat(...friendsPosts));
	} catch (error) {
		res.status(500).json(error);
	}
};
