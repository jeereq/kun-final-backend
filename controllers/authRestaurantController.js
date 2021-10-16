const User = require("../models/restaurant");
const jwt = require("jsonwebtoken");

const MaxAge = 1000 * 60 * 60 * 24 * 3650;

const createToken = (id) => {
	return jwt.sign({ id }, "jeereq", {
		expiresIn: MaxAge
	});
};

//handle errors
const handleErrors = (error) => {
	let errs = {
		email: "",
		password: "",
		name: "",
		profileImage: "",
		localisation: ""
	};

	//incorrect email in login
	if (error.message === "incorrecte email") {
		errs.email = "that email is not registered";
	}
	//incorrect password in login
	if (error.message === "incorrecte password") {
		errs.password = "that password is not registered";
	}

	//duplicate errors
	if (error.code === 11000) {
		errs.email = "that email is already registered";
		return errs;
	}

	if (error.message.includes("restaurant validation failed")) {
		//validation errors
		Object.values(error.errors).forEach(({ properties }) => {
			errs[properties.path] = properties.message;
		});
	}
	return errs;
};

module.exports = {
	signup_post: async (req, res) => {
		const { email, password, localisation, name, profileImage } = req.body;
		const user = new User({
			email,
			password,
			localisation,
			name,
			profileImage
		});
		user.save((err, NewUser) => {
			if (err) {
				const errors = handleErrors(err);
				return res.status(400).json({ error: errors });
			}
			const token = createToken(NewUser._id);
			res.cookie("jwt", token, { httpOnly: true, maxAge: MaxAge });
			res.status(201).json({ _id: NewUser._id });
		});
	},
	login_post: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.login(email, password);
			const token = createToken(user._id);
			res.cookie("jwt", token, { httpOnly: true, maxAge: MaxAge });
			res.status(200).json({
				_id: user._id,
				profileImage: user.profileImage,
				localisation: user.localisation
			});
		} catch (err) {
			const errors = handleErrors(err);
			res.status(400).json({ error: errors });
		}
	},
	logout_get: (req, res) => {
		res.cookie("jwt", "", { maxAge: 1 });
		res.json({ message: "user logout" });
	},
	MaxAge
};
