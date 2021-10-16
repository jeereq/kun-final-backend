const Categorie = require("../models/categorie");

//handle errors
const handleErrors = (error) => {
	let errs = {
		categorie: ""
	};

	if (error.message === "incorrecte categorie") {
		errs.categorie = "that categorie is already registered";
		return errs;
	}
	if (error.message.includes("categorie validation failed")) {
		//validation errors
		Object.values(error.errors).forEach(({ properties }) => {
			errs[properties.path] = properties.message;
		});
	}
	return errs;
};

module.exports = {
	categorie_get: async (req, res) => {
		const allCategorie = await Categorie.show();
		res.status(200).json({ categories: allCategorie });
	},
	categorie_post: async (req, res) => {
		const { name } = req.body;
		try {
			const add = await Categorie.add(name);
			if (add) {
				const categorie = new Categorie({
					name
				});
				categorie.save((err, NewCategorie) => {
					if (err) {
						const errors = handleErrors(err);
						return res.status(400).json({ error: errors });
					}
					res.status(201).json({ _id: NewCategorie._id });
				});
			}
		} catch (err) {
			const errors = handleErrors(err);
			return res.status(400).json({ error: errors });
		}
	}
};
