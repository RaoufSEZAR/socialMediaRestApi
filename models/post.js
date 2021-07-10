const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		desc: { type: String, max: 500 },
		likes: { type: Array, defalt: [] },
		img: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
