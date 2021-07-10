const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.userRegister = async (req, res) => {
	try {
		const body = req.body;

		if (!(body.email && body.password)) {
			return res.status(400).send({ error: "Data not formatted properly" });
		}
		// createing a new mongoose doc from user data
		const user = new User(body);
		// generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		// now we set user password to hashed password
		user.password = await bcrypt.hash(user.password, salt);

		user.save();
		res.status(200).json({ message: "success", user });
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.userLogin = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).json("User not found");

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(404).json("wrong password");
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
};
