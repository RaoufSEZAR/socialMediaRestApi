const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, min: 3, max: 20, unique: true },
		email: { type: String, required: true, max: 50, unique: true },
		password: { type: String, required: true, min: 6 },
		followers: { type: Array, defalt: [] },
		followings: { type: Array, defalt: [] },
		isAdmin: { type: Boolean, defalt: false },
		profilePicture: { type: String, defalt: "" },
		coverPicture: { type: String, defalt: "" },
		desc: { type: String, max: 50 },
		city: { type: String, max: 50 },
		from: { type: String, max: 50 },
		relationship: { type: Number, enum: [1, 2, 3] },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
