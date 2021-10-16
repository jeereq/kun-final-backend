const Plat = require("../models/plat");

const MaxAge = 1000 * 60 * 60 * 24 * 3650;

const createToken = (id) => {
	return jwt.sign({ id }, "jeereq", {
		expiresIn: MaxAge
	});
};

//handle errors
const handleErrors = (error) => {
	let errs = {
		name: "",
		type: "",
		description: "",
		prix: "",
		devise: "",
		id: ""
	};

	//incorrect email in login

	if (error.message.includes("plat validation failed")) {
		//validation errors
		Object.values(error.errors).forEach(({ properties }) => {
			errs[properties.path] = properties.message;
		});
	}
	return errs;
};

module.exports = {
	plat_post: async (req, res) => {
		const { name, type, description, prix, devise, id } = req.body;
		const plat = new Plat({ name, type, description, prix, devise, id });
		plat.save((err, NewPlat) => {
			if (err) {
				const errors = handleErrors(err);
				return res.status(400).json({ error: errors });
			}
			res.status(201).json({ _id: NewPlat._id });
		});
	},
	plat_post_id: async (req, res) => {
		const { id } = req.body;
		const plats = await Plat.ById(id);
		res.status(200).json({ plats: plats });
	},
	plat_get: async (req, res) => {
		const plats = await Plat.show();
		res.status(200).json({ plats: plats });
	}
};
